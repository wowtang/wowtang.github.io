/* ==================================================================
   渲染与交互
   ================================================================== */
(function(){
  'use strict';

  const CAT_NAME = Object.fromEntries(CATS.map(c=>[c.k,c.n]));
  const BOOK = Object.fromEntries(BOOKS.map(b=>[b.k,b]));
  const $  = (s,r)=> (r||document).querySelector(s);
  const $$ = (s,r)=> Array.from((r||document).querySelectorAll(s));

  const state = {
    cat: 'all',
    tags: new Set(),
    book: new Set(),         // 教材出处（书代号）
    species: new Set(),      // 选中物质（化学式 key）
    q: '',
    spQ: '',
    bridgeDefault: 'none',   // none | double | single
    showIon: true
  };

  /* ---------- 物质提取 ---------- */
  const SUB_DIGIT = /<sub>(\d+)<\/sub>/g;
  function plainEq(html){
    return html
      .replace(SUB_DIGIT, '$1')
      .replace(/<sub>.*?<\/sub>/g, '')
      .replace(/<sup>.*?<\/sup>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\{\{.*?\}\}/g, ' ');
  }
  /* 渲染时 <sup> 电荷会被剥离，H⁺ 会退化成 "H"、OH⁻ 会退化成 "OH"。
     这些碎片不是真实存在的物质，直接丢弃，避免污染物质筛选。 */
  const ION_FRAG = new Set([
    'H','Cl','O','I','F',
    'OH','NH4','CO3','SCN','CrO4','CN','MnO4','H2Y',
    'NO3','SO4','HCO3','HSO3','AlO2','Cr2O7','S2O3','ClO',
    'RNa','R2Ca','R-Na','R2-Ca'
  ]);
  function normSpecies(raw){
    let s = raw.trim();
    s = s.replace(/^n\s+/, '');
    s = s.replace(/[↑↓]/g, '');
    s = s.replace(/\((浓|稀|过量|少量|足量|熔融|水溶液|醇|g|l|s|aq)\)/g, '');
    s = s.replace(/^\d+(?=[A-Z(\[])/, '');
    if (!s) return null;
    if (/[\u4e00-\u9fa5]/.test(s)) return null;
    if (/^[a-z]$/.test(s)) return null;          // 聚合度 n 等小写单字母
    if (s.length > 24) return null;
    if (ION_FRAG.has(s)) return null;            // 电荷碎片
    return SPECIES_ALIAS[s] || s;
  }
  function extractSpecies(eqHtml){
    const out = [];
    const seen = new Set();
    plainEq(eqHtml).split(/\s(?:\+|=(?!=)|⇌|→)\s/).forEach(part=>{
      part.split(/\s+/).forEach(w=>{
        const n = normSpecies(w);
        if (n && !seen.has(n)) { seen.add(n); out.push(n); }
      });
    });
    return out;
  }

  /* ---------- 预处理 ---------- */
  const stripTags = h => h.replace(/<[^>]+>/g,'');
  const ARW = c => `<span class="arw"><span class="arw-top">${c}</span><span class="arw-line">=</span></span>`;
  EQ.forEach((it, i) => {
    it.e = it.e.replace(/\{\{(.+?)\}\}/g, (_, c) => ARW(c));
    it.idx = i;
    it.no = String(i+1).padStart(3,'0');
    it.catName = CAT_NAME[it.c] || it.c;
    it.tags = it.t || [];
    it.bridge = null;                 // 当前单条桥模式
    it.sp = extractSpecies(it.e);     // 涉及物质
    it.bk = (EQ_BOOK[i] || [])
      .filter(([k]) => BOOK[k])
      .map(([k,pg]) => ({ k, pg, name: BOOK[k].n, short: BOOK[k].short }));
    it._hay = [
      stripTags(it.e), it.ion||'', it.p||'', it.n||'', it.catName, it.tags.join(' '),
      it.bk.map(b=> `${b.name} ${b.short} 第${b.pg}页 P${b.pg}`).join(' '),
      it.sp.map(k=> (SPECIES[k] ? SPECIES[k][0] + ' ' + k : k)).join(' ')
    ].join(' ').toLowerCase();
  });

  /* ---------- 物质索引 ---------- */
  const spIndex = new Map();
  EQ.forEach(it=>{
    it.sp.forEach(k=>{
      if(!spIndex.has(k)){
        const meta = SPECIES[k];
        spIndex.set(k, { key:k, name: meta ? meta[0] : k, group: meta ? meta[1] : '其他', count: 0 });
      }
      spIndex.get(k).count++;
    });
  });
  const SP_ALL = Array.from(spIndex.values());
  const SP_LIST = SP_ALL.filter(s=>s.count>=2);

  /* ---------- 标签统计 ---------- */
  const TAG_ORDER = ['氧化还原','沉淀','气体','加热','催化剂','放热','可逆','电解','有机','歧化','置换','化合','分解','复分解','显色'];
  const tagCount = {};
  EQ.forEach(it=> it.tags.forEach(t=> tagCount[t]=(tagCount[t]||0)+1));
  const TAGS = TAG_ORDER.filter(t=>tagCount[t]).concat(Object.keys(tagCount).filter(t=>!TAG_ORDER.includes(t)));

  /* ---------- 侧栏：分类 ---------- */
  const catCount = {};
  EQ.forEach(it=> catCount[it.c]=(catCount[it.c]||0)+1);

  function buildCats(){
    const box = $('#catList');
    const rows = [{k:'all', n:'全部反应', c:EQ.length}]
      .concat(CATS.filter(c=>catCount[c.k]).map(c=>({k:c.k,n:c.n,c:catCount[c.k]})));
    box.innerHTML = rows.map(r=>`
      <button class="catitem" data-cat="${r.k}" aria-current="${state.cat===r.k}">
        <span class="dot"></span>
        <span class="nm">${r.n}</span>
        <span class="ct">${r.c}</span>
      </button>`).join('');
    $('#catTotal').textContent = EQ.length + ' 条';
    $$('.catitem', box).forEach(b=>b.addEventListener('click',()=>{
      state.cat = b.dataset.cat;
      $$('.catitem', box).forEach(x=>x.setAttribute('aria-current', x===b));
      render();
    }));
  }

  /* ---------- 侧栏：标签 ---------- */
  function buildTags(){
    const box = $('#tagList');
    box.innerHTML = TAGS.map(t=>`
      <button class="tagchip" data-tag="${t}" aria-pressed="false">${t}<span class="n">${tagCount[t]}</span></button>
    `).join('');
    $$('.tagchip', box).forEach(b=>b.addEventListener('click',()=>{
      const t = b.dataset.tag;
      if(state.tags.has(t)) state.tags.delete(t); else state.tags.add(t);
      b.setAttribute('aria-pressed', state.tags.has(t));
      render();
    }));
  }

  /* ---------- 侧栏：教材出处 ---------- */
  const bookCount = {};
  EQ.forEach(it=> it.bk.forEach(b=> bookCount[b.k] = (bookCount[b.k]||0)+1));
  const BOOK_WITH = BOOKS.filter(b=> bookCount[b.k]);
  const booklessCount = EQ.filter(it=> !it.bk.length).length;

  function buildBooks(){
    const box = $('#bookList');
    if(!box) return;
    const rows = BOOK_WITH.map(b=>({k:b.k, n:b.short, full:b.n, c:bookCount[b.k]}))
      .concat([{k:'__none', n:'未标注', full:'教材中未检到该反应', c:booklessCount}]);
    box.innerHTML = rows.map(r=>`
      <button class="tagchip bookchip" data-book="${r.k}" title="${r.full}"
              aria-pressed="${state.book.has(r.k)}">${r.n}<span class="n">${r.c}</span></button>
    `).join('');
    $$('.bookchip', box).forEach(b=>b.addEventListener('click',()=>{
      const k = b.dataset.book;
      if(state.book.has(k)) state.book.delete(k); else state.book.add(k);
      b.setAttribute('aria-pressed', state.book.has(k));
      render();
    }));
  }

  /* ---------- 侧栏：涉及物质 ---------- */
  const SP_OPEN = { '金属单质':true, '非金属单质':true, '氧化物':true, '酸':true, '碱':true, '盐':true, '有机物':true, '其他化合物':true };
  const spLimit = {};
  const SP_STEP = 10;

  function buildSpecies(){
    const box = $('#speciesList');
    const kw = state.spQ.trim().toLowerCase();
    const pool = kw ? SP_ALL : SP_LIST;
    const known = new Set(SPECIES_GROUPS);
    const extra = Array.from(new Set(pool.map(s=>s.group))).filter(g=>!known.has(g));
    const groups = SPECIES_GROUPS.concat(extra);

    let html = '', shown = 0;
    groups.forEach(g=>{
      let items = pool.filter(s=>s.group===g);
      if(kw) items = items.filter(s=> s.name.toLowerCase().includes(kw) || s.key.toLowerCase().includes(kw));
      if(!items.length) return;
      items.sort((a,b)=> b.count-a.count || a.name.localeCompare(b.name,'zh'));
      const limit = spLimit[g] || SP_STEP;
      const visible = items.slice(0, limit);
      const open = kw ? true : (SP_OPEN[g] !== false);
      html += `<div class="spgroup" data-g="${g}" data-open="${open}">
        <button class="spgroup-head" data-g="${g}">${g}<span class="cnt">${items.length}</span><span class="arw">▾</span></button>
        <div class="spchips">
          ${visible.map(s=>`<button class="spchip" data-sp="${s.key}" aria-pressed="${state.species.has(s.key)}" title="${s.key}">${s.name}<span class="n">${s.count}</span></button>`).join('')}
          ${items.length>limit?`<button class="spmore" data-more="${g}">还有 ${items.length-limit} 个</button>`:''}
        </div>
      </div>`;
      shown += items.length;
    });
    box.innerHTML = shown ? html : `<div class="sp-empty">没有匹配的物质</div>`;

    $$('.spgroup-head', box).forEach(b=>b.addEventListener('click',()=>{
      const g = b.dataset.g;
      SP_OPEN[g] = !(SP_OPEN[g] !== false);
      b.parentElement.dataset.open = SP_OPEN[g];
    }));
    $$('.spmore', box).forEach(b=>b.addEventListener('click',()=>{
      const g = b.dataset.more;
      spLimit[g] = 999;
      buildSpecies();
    }));
    $$('.spchip', box).forEach(b=>b.addEventListener('click',()=>{
      const k = b.dataset.sp;
      if(state.species.has(k)) state.species.delete(k); else state.species.add(k);
      b.setAttribute('aria-pressed', state.species.has(k));
      render();
    }));
  }

  /* ---------- 筛选 ---------- */
  function match(it){
    if(state.cat!=='all' && it.c!==state.cat) return false;
    if(state.tags.size){
      for(const t of state.tags) if(!it.tags.includes(t)) return false;
    }
    if(state.book.size){
      let ok = false;
      for(const k of state.book){
        if(k==='__none' ? !it.bk.length : it.bk.some(b=>b.k===k)) { ok = true; break; }
      }
      if(!ok) return false;
    }
    if(state.species.size){
      for(const k of state.species) if(!it.sp.includes(k)) return false;
    }
    if(state.q){
      const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      for(const t of terms) if(!it._hay.includes(t)) return false;
    }
    return true;
  }

  /* ---------- 高亮 ---------- */
  function esc(s){ return s.replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function hl(html, terms){
    if(!terms.length) return html;
    // 只在文本节点上高亮，避免破坏标签
    let out = '', i = 0;
    const re = /<[^>]+>/g; let m;
    while((m = re.exec(html))){
      out += markText(html.slice(i, m.index), terms) + m[0];
      i = m.index + m[0].length;
    }
    out += markText(html.slice(i), terms);
    return out;
  }
  function markText(txt, terms){
    if(!txt) return txt;
    let html = esc(txt);
    terms.forEach(t=>{
      if(!t) return;
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')','gi');
      html = html.replace(re, '<mark>$1</mark>');
    });
    return html;
  }

  /* ---------- 桥 SVG ---------- */
  const NS = 'http://www.w3.org/2000/svg';

  function clearBridge(rec){
    const svg = $('.bridge', rec);
    if(svg) svg.innerHTML = '';
    const wrap = $('.eq-wrap', rec);
    wrap.classList.remove('bridged','mode-single');
  }

  function drawBridge(rec){
    clearBridge(rec);
    const mode = rec.dataset.bridge;
    if(!mode) return;
    const it = EQ[+rec.dataset.idx];
    if(!it.o) return;

    const wrap = $('.eq-wrap', rec);
    const svg  = $('.bridge', rec);
    const eqEl = $('.eq', rec);

    wrap.classList.add('bridged');
    if(mode==='single') wrap.classList.add('mode-single');

    // 强制布局，读取新尺寸（不能依赖 transition，否则读到的是过渡前的值）
    void wrap.offsetHeight;
    const wr = wrap.getBoundingClientRect();
    const er = eqEl.getBoundingClientRect();
    const W = Math.round(wr.width), H = Math.round(wr.height);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);

    const box = el => {
      const r = el.getBoundingClientRect();
      return { cx: r.left - wr.left + r.width/2, top: r.top - wr.top, bot: r.bottom - wr.top };
    };

    const ox   = eqEl.querySelector('[data-s~="ox"]');
    const red  = eqEl.querySelector('[data-s~="red"]');
    const oxp  = eqEl.querySelector('[data-s~="oxp"]');
    const redp = eqEl.querySelector('[data-s~="redp"]');
    if(!ox || !red) return;

    const uid = 'b' + rec.dataset.idx;
    const defs = `<defs>
      <marker id="${uid}-aox" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--oxidant)"/></marker>
      <marker id="${uid}-ared" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--reductant)"/></marker>
      <marker id="${uid}-aink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--ink)"/></marker>
    </defs>`;
    let inner = defs;

    const RISE = 18;    // 折线横段离元素的高度
    const GAP  = 3;     // 起止点离元素的距离
    const eTxt = n => (n > 1 ? `${n}×e⁻` : 'e⁻');

    /* 课本式直角折线桥：竖直起 → 水平跨过 → 竖直落到目标元素，箭头朝元素 */
    function bracket(a, b, dir, color, marker){
      let x1 = a.cx, x2 = b.cx;
      if(Math.abs(x2 - x1) < 24) x2 = x1 + (x2 >= x1 ? 24 : -24);
      const y1 = dir === 'up' ? a.top - GAP : a.bot + GAP;
      const y2 = dir === 'up' ? b.top - GAP : b.bot + GAP;
      const s  = dir === 'up' ? -1 : 1;
      const yBar = (dir === 'up' ? Math.min(y1, y2) : Math.max(y1, y2)) + s * RISE;
      const d = `M${x1},${y1} L${x1},${yBar} L${x2},${yBar} L${x2},${y2}`;
      return {
        mx: (x1 + x2) / 2, bar: yBar, x1, x2,
        ytag: Math.max(a.bot, b.bot) + 12,
        path: `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.3"
                 marker-end="url(#${uid}-${marker})" stroke-linejoin="round" stroke-linecap="round"/>`
      };
    }

    /* 单行标注贴在横段外侧 */
    function label(g, dir, cls, text){
      const y = dir === 'up' ? g.bar - 9 : g.bar + 16;
      const half = text.length * 5.2;
      const x = Math.min(Math.max(g.mx, half), W - half);
      return `<text class="bridge-label main ${cls}" x="${x}" y="${y}" text-anchor="middle">${text}</text>`;
    }

    if(mode === 'double'){
      const x = it.o.x, r = it.o.r;
      if(oxp){
        const A = bracket(box(ox), box(oxp), 'up', 'var(--oxidant)', 'aox');
        inner += A.path + label(A, 'up', 'ox', `失去 ${eTxt(x)}`);
      }
      if(redp){
        const B = bracket(box(red), box(redp), 'down', 'var(--reductant)', 'ared');
        inner += B.path + label(B, 'down', 'red', `得到 ${eTxt(r)}`);
      }
    } else {
      const A = bracket(box(ox), box(red), 'up', 'var(--ink)', 'aink');
      inner += A.path
        + `<text class="bridge-label main single" x="${A.mx}" y="${A.bar - 6}" text-anchor="middle">${eTxt(it.o.x)}</text>`
        + `<text class="bridge-tag" x="${A.x1}" y="${A.ytag}" text-anchor="middle">还原剂</text>`
        + `<text class="bridge-tag" x="${A.x2}" y="${A.ytag}" text-anchor="middle">氧化剂</text>`;
    }

    svg.innerHTML = inner;
  }

  function drawAll(){
    $$('.rec').forEach(r=>{ if(r.dataset.bridge) drawBridge(r); });
  }

  /* ---------- 渲染 ---------- */
  let renderTimer = null;
  function render(){
    const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = EQ.filter(match);

    // 计数
    $('#count').innerHTML = `共 <b>${hits.length}</b> 条${hits.length!==EQ.length?` <span style="opacity:.7">/ 全部 ${EQ.length}</span>`:''}`;

    // chips
    const chips = [];
    if(state.cat!=='all') chips.push({label:'分类：'+CAT_NAME[state.cat], kind:'cat'});
    state.tags.forEach(t=>chips.push({label:t, kind:'tag', v:t}));
    state.book.forEach(k=>chips.push({label:'教材：'+(k==='__none' ? '未标注' : BOOK[k].short), kind:'book', v:k}));
    state.species.forEach(k=>chips.push({label:'物质：'+(spIndex.get(k)?spIndex.get(k).name:k), kind:'sp', v:k}));
    if(state.q) chips.push({label:'关键词：'+state.q, kind:'q'});
    $('#activeChips').innerHTML = chips.map(c=>
      `<span class="chip">${esc(c.label)}<button data-kind="${c.kind}" data-v="${c.v||''}" aria-label="移除">×</button></span>`
    ).join('');
    $$('#activeChips .chip button').forEach(b=>b.addEventListener('click',()=>{
      if(b.dataset.kind==='cat'){ state.cat='all'; $$('.catitem').forEach(x=>x.setAttribute('aria-current', x.dataset.cat==='all')); }
      if(b.dataset.kind==='tag'){ state.tags.delete(b.dataset.v); $$('.tagchip').forEach(x=>x.setAttribute('aria-pressed', state.tags.has(x.dataset.tag))); }
      if(b.dataset.kind==='book'){ state.book.delete(b.dataset.v); $$('.bookchip').forEach(x=>x.setAttribute('aria-pressed', state.book.has(x.dataset.book))); }
      if(b.dataset.kind==='sp'){ state.species.delete(b.dataset.v); $$('.spchip').forEach(x=>x.setAttribute('aria-pressed', state.species.has(x.dataset.sp))); }
      if(b.dataset.kind==='q'){ state.q=''; $('#q').value=''; }
      render();
    }));

    const list = $('#list');
    if(!hits.length){
      list.innerHTML = `<div class="empty">
        <h3>没有匹配的方程式</h3>
        <p>试试减少关键词，或换用化学式（如 Fe₂O₃、Cl₂）搜索。</p>
        <button id="emptyClear">清除全部筛选</button>
      </div>`;
      $('#emptyClear').addEventListener('click', resetAll);
      return;
    }

    // 分组
    const groups = [];
    const gmap = new Map();
    hits.forEach(it=>{
      if(!gmap.has(it.c)){ gmap.set(it.c, {k:it.c, n:it.catName, items:[]}); groups.push(gmap.get(it.c)); }
      gmap.get(it.c).items.push(it);
    });
    // 保持 CATS 顺序
    groups.sort((a,b)=> CATS.findIndex(c=>c.k===a.k) - CATS.findIndex(c=>c.k===b.k));

    let html = '';
    groups.forEach(g=>{
      html += `<div class="group-head"><h3>${g.n}</h3><span class="line"></span><span class="n">${g.items.length}</span></div>`;
      g.items.forEach(it=>{
        const hasRedox = !!it.o;
        const btnState = it.bridge || (state.bridgeDefault==='none' ? '' : state.bridgeDefault);
        html += `<article class="rec" data-idx="${it.idx}" data-bridge="${state.bridgeDefault==='none'?'':state.bridgeDefault}">
          <div class="rec-idx">${it.no}</div>
          <div class="rec-body">
            <div class="rec-meta">
              <span class="meta-cat">${it.catName}</span>
              ${it.tags.map(t=>`<span class="meta-tag ${t==='氧化还原'?'redox':(t==='沉淀'?'precip':'')}">${t}</span>`).join('')}
              ${it.bk.map(b=>`<button class="meta-book" data-book="${b.k}" title="只看 ${b.name}｜第 ${b.pg} 页">${b.short} P${b.pg}</button>`).join('')}
            </div>
            <div class="eq-wrap">
              <div class="eq">${hl(it.e, terms)}</div>
              <svg class="bridge" aria-hidden="true"></svg>
            </div>
            <div class="ion ${it.ion?'':'none'}">
              <span class="ion-label">离子方程式</span>
              <span class="eq">${it.ion ? hl(it.ion, terms) : '非离子反应 / 不写离子方程式'}</span>
            </div>
            <p class="phen"><span class="phen-label">现象</span><span>${hl(it.p, terms)}</span></p>
            ${it.n ? `<p class="note"><span class="note-label">要点</span><span>${hl(it.n, terms)}</span></p>` : ''}
          </div>
          <div class="rec-tools">
            <div class="seg small" role="group" aria-label="桥显示">
              <button data-bridge="double" aria-pressed="false" ${hasRedox?'':'disabled title="该反应无电子转移"'}>双线桥</button>
              <button data-bridge="single" aria-pressed="false" ${hasRedox?'':'disabled title="该反应无电子转移"'}>单线桥</button>
            </div>
            <span class="hint">${hasRedox ? '电子转移 '+it.o.x+'e⁻' : '非氧化还原'}</span>
          </div>
        </article>`;
      });
    });
    list.innerHTML = html;

    // 应用初始桥模式
    $$('.rec', list).forEach(rec=>{
      const mode = rec.dataset.bridge;
      if(mode){
        const it = EQ[+rec.dataset.idx];
        if(it.o){
          $$('[data-bridge]', rec).forEach(b=>b.setAttribute('aria-pressed', b.dataset.bridge===mode));
          drawBridge(rec);
        } else {
          rec.dataset.bridge = '';
        }
      }
    });

    // 点教材徽标 → 按该书筛选
    $$('.meta-book', list).forEach(btn=>btn.addEventListener('click',()=>{
      state.book.add(btn.dataset.book);
      $$('.bookchip').forEach(x=>x.setAttribute('aria-pressed', state.book.has(x.dataset.book)));
      render();
    }));

    // 单条按钮
    $$('.rec [data-bridge]', list).forEach(btn=>btn.addEventListener('click',()=>{
      const rec = btn.closest('.rec');
      const mode = btn.dataset.bridge;
      const now = rec.dataset.bridge === mode ? '' : mode;
      rec.dataset.bridge = now;
      $$('[data-bridge]', rec).forEach(b=>b.setAttribute('aria-pressed', b.dataset.bridge===now));
      drawBridge(rec);
    }));
  }

  function resetAll(){
    state.cat='all'; state.tags.clear(); state.book.clear(); state.species.clear();
    state.q=''; state.spQ='';
    $('#q').value=''; $('#spQ').value='';
    $$('.catitem').forEach(x=>x.setAttribute('aria-current', x.dataset.cat==='all'));
    $$('.tagchip').forEach(x=>x.setAttribute('aria-pressed', false));
    buildSpecies();
    render();
  }

  /* ---------- 顶栏控制 ---------- */
  $$('#globalBridge button').forEach(b=>b.addEventListener('click',()=>{
    state.bridgeDefault = b.dataset.global;
    $$('#globalBridge button').forEach(x=>x.setAttribute('aria-pressed', x===b));
    $$('.rec').forEach(rec=>{
      const it = EQ[+rec.dataset.idx];
      const mode = it.o ? (state.bridgeDefault==='none'?'':state.bridgeDefault) : '';
      rec.dataset.bridge = mode;
      $$('[data-bridge]', rec).forEach(x=>x.setAttribute('aria-pressed', x.dataset.bridge===mode));
      drawBridge(rec);
    });
  }));

  $$('#ionSwitch button').forEach(b=>b.addEventListener('click',()=>{
    state.showIon = b.dataset.ion==='show';
    $$('#ionSwitch button').forEach(x=>x.setAttribute('aria-pressed', x===b));
    document.body.classList.toggle('hide-ion', !state.showIon);
  }));

  /* ---------- 搜索 ---------- */
  let qTimer;
  $('#q').addEventListener('input', e=>{
    clearTimeout(qTimer);
    const v = e.target.value.trim();
    qTimer = setTimeout(()=>{ state.q = v; render(); }, 120);
  });
  document.addEventListener('keydown', e=>{
    if(e.key==='/' && document.activeElement!==$('#q')){ e.preventDefault(); $('#q').focus(); $('#q').select(); }
    if(e.key==='Escape' && document.activeElement===$('#q')){ $('#q').value=''; state.q=''; render(); $('#q').blur(); }
  });

  $('#clearAll').addEventListener('click', resetAll);

  /* 物质搜索 */
  let spTimer;
  $('#spQ').addEventListener('input', e=>{
    clearTimeout(spTimer);
    const v = e.target.value.trim();
    spTimer = setTimeout(()=>{
      state.spQ = v;
      Object.keys(spLimit).forEach(k=> delete spLimit[k]);
      buildSpecies();
    }, 120);
  });

  /* ---------- 回到顶部 ---------- */
  const totop = $('#totop');
  addEventListener('scroll', ()=>{ totop.classList.toggle('on', scrollY>500); }, {passive:true});
  totop.addEventListener('click', ()=> scrollTo({top:0, behavior:'smooth'}));

  /* ---------- 尺寸变化重绘 ---------- */
  let rz;
  addEventListener('resize', ()=>{
    clearTimeout(rz);
    rz = setTimeout(()=>{ drawAll(); }, 160);
  });

  /* ---------- 启动 ---------- */
  buildCats(); buildTags(); buildBooks(); buildSpecies(); render();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(drawAll);
})();
