/* ==========================================================================
   Claude Theme — main.js
   覆盖：暗色三档（跟随时间 / 浅色 / 深色）/ 打字机 / 多级菜单 / 页脚导航 /
        全屏搜索（键盘上下 + 高亮）/ 目录 / 阅读进度 / 代码复制 / 上下篇 /
        相关推荐 / 闪念热力图 / 运行天数 / 全站计数 / 随机文章 /
        busuanzi 数据同步 / 图片宫格 / 图片查看器 / 订阅表单校验
   约定：所有选择器以 DESIGN.md 第二节的 DOM 契约为准，
        主题配置从 window.CLAUDE_CONFIG 读（base.html 内联注入）。
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.CLAUDE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var body = document.body;
  var CRITICAL = window.CLAUDE_CRITICAL || {};

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(id, cls) {
    return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }
  function lockScroll(on) {
    if (on) { root.classList.add('no-scroll'); body.style.overflow = 'hidden'; }
    else { root.classList.remove('no-scroll'); body.style.overflow = ''; }
  }

  /* ======================================================================
     1. 主题三档切换（auto / light / dark）+ 切换时的扩散遮罩
     base.html 的首帧内联脚本已经定好了 data-theme，这里只接管后续交互。
     ====================================================================== */
  var THEME_KEY = 'claude-theme';
  var prefMode = 'auto';
  try { prefMode = localStorage.getItem(THEME_KEY) || CFG.defaultTheme || 'auto'; } catch (e) { prefMode = CFG.defaultTheme || 'auto'; }

  function resolveTheme(mode) {
    if (mode === 'auto') {
      var h = new Date().getHours();
      return (h >= 6 && h < 18) ? 'light' : 'dark';
    }
    return mode;
  }
  function paintThemeIcon(resolved) {
    var use = $('#theme-icon use');
    if (!use) { return; }
    var id = resolved === 'dark' ? '#i-sun' : '#i-moon';
    use.setAttribute('href', id);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', id);
  }
  function applyTheme(mode, withAnim, ev) {
    var resolved = resolveTheme(mode);
    if (withAnim && ev) {
      var cover = $('#theme-cover');
      if (cover) {
        cover.style.setProperty('--switch-x', ev.clientX + 'px');
        cover.style.setProperty('--switch-y', ev.clientY + 'px');
        body.classList.add('theme-switching');
        setTimeout(function () { body.classList.remove('theme-switching'); }, 400);
      }
    }
    root.setAttribute('data-theme', resolved);
    root.dataset.themePref = mode;
    paintThemeIcon(resolved);
  }
  applyTheme(prefMode, false);
  if (prefMode === 'auto') {
    setInterval(function () {
      if (root.dataset.themePref === 'auto') { applyTheme('auto', false); }
    }, 60000);
  }
  function cycleTheme(ev) {
    var order = ['auto', 'light', 'dark'];
    var cur = root.dataset.themePref || 'auto';
    var next = order[(order.indexOf(cur) + 1) % order.length];
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyTheme(next, true, ev);
  }
  $$('[data-action="toggle-theme"]').forEach(function (b) {
    b.addEventListener('click', cycleTheme);
  });

  /* ======================================================================
     2. 首帧保护：DOM 就绪后放开过渡
     ====================================================================== */
  function releaseNotLoaded() { root.classList.remove('not-loaded'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(releaseNotLoaded);
    });
  } else {
    requestAnimationFrame(releaseNotLoaded);
  }

  /* ======================================================================
     3. 打字机副标题（subtitleList / subtitleSpeed）
     ====================================================================== */
  (function initTyped() {
    var target = $('#subtitle');
    if (!target) { return; }
    var lines = String(CFG.subtitleList || '').split('\n')
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });
    if (!lines.length) { return; }
    var speed = parseInt(CFG.subtitleSpeed, 10) || 120;
    var idx = 0;
    function play() {
      var text = lines[idx % lines.length];
      var i = 0;
      target.textContent = '';
      var typer = setInterval(function () {
        target.textContent = text.slice(0, ++i);
        if (i >= text.length) {
          clearInterval(typer);
          setTimeout(function () {
            var del = setInterval(function () {
              target.textContent = text.slice(0, --i);
              if (i <= 0) { clearInterval(del); idx++; play(); }
            }, Math.max(30, speed / 2));
          }, 1800);
        }
      }, speed);
    }
    play();
  })();

  /* ======================================================================
     4. 首屏「继续往下」
     ====================================================================== */
  $$('[data-action="scroll-down"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var h = $('#page-header');
      var to = h ? h.offsetHeight : window.innerHeight;
      window.scrollTo({ top: to - 60, behavior: 'smooth' });
    });
  });

  /* ======================================================================
     5. 滚动表现：顶栏描边 / 阅读进度 / 回到顶部按钮
     ====================================================================== */
  var nav = $('#nav');
  var progressBar = $('#reading-progress > span');

  function updateProgress() {
    if (!progressBar) { return; }
    var y = window.pageYOffset;
    var max = (root.scrollHeight - root.clientHeight) || 1;
    var pct = Math.min(100, Math.max(0, (y / max) * 100));
    progressBar.style.width = pct + '%';
  }
  function onScroll() {
    var y = window.pageYOffset;
    if (nav) {
      if (y > 8) { nav.classList.add('is-scrolled'); }
      else { nav.classList.remove('is-scrolled'); }
    }
    if (CFG.readingProgress) { updateProgress(); }
    var top = $('.scroll-to-top');
    if (top) {
      if (y > 240) { top.removeAttribute('hidden'); }
      else { top.setAttribute('hidden', ''); }
    }
    if (window.__claudeTocItems) { updateTocActive(y); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $$('[data-action="scroll-to-top"]').forEach(function (b) {
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  });

  /* ======================================================================
     6. 多级菜单（navMenuJson 非空时重建 .menus_items）
     ====================================================================== */
  (function initMenus() {
    var raw = CFG.navMenuJson;
    if (!raw || raw === '[]' || raw === '') { return; }
    var data;
    try { data = JSON.parse(raw); } catch (e) { return; }
    if (!data || !data.length) { return; }
    var holder = $('.menus_items');
    if (!holder) { return; }

    function linkHtml(item) {
      var ico = (CRITICAL.resolveIcon ? CRITICAL.resolveIcon(item.icon) : 'i-link');
      return icon(ico) + '<span>' + escapeHtml(item.label || '') + '</span>';
    }

    holder.innerHTML = '';
    data.forEach(function (item) {
      var wrap = document.createElement('div');
      wrap.className = 'menus_item';
      if (item.children && item.children.length) {
        wrap.className = 'menus_item nav-drop';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-link';
        /* 分组项不写 data-tip：它悬停时弹的是下拉面板，
           再叠一个文字提示框会和面板头撞在一起（实测黑框压住面板第一行）。 */
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = linkHtml(item) + icon('i-chevron', 'ic-s');
        var panel = document.createElement('div');
        panel.className = 'nav-drop-panel';
        item.children.forEach(function (c) {
          var a = document.createElement('a');
          a.href = c.link || '#';
          a.innerHTML = linkHtml(c);
          panel.appendChild(a);
        });
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var open = !panel.classList.contains('is-open');
          panel.classList.toggle('is-open', open);
          panel.classList.toggle('is-closed', !open);
          wrap.classList.toggle('is-open', open);
          wrap.classList.toggle('is-closed', !open);
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        /* 鼠标离开这一组后清掉「手动关闭」标记，下次悬停照常展开 */
        wrap.addEventListener('mouseleave', function () {
          if (!panel.classList.contains('is-open')) {
            panel.classList.remove('is-closed');
            wrap.classList.remove('is-closed');
          }
        });
        wrap.appendChild(btn);
        wrap.appendChild(panel);
      } else {
        var a2 = document.createElement('a');
        a2.className = 'nav-link';
        a2.href = item.link || '#';
        a2.setAttribute('data-tip', item.label || '');
        a2.innerHTML = linkHtml(item);
        wrap.appendChild(a2);
      }
      holder.appendChild(wrap);
    });

    document.addEventListener('click', function () {
      $$('.nav-drop-panel.is-open').forEach(function (p) {
        p.classList.remove('is-open');
        p.classList.add('is-closed');
        if (p.parentNode) { p.parentNode.classList.add('is-closed'); p.parentNode.classList.remove('is-open'); }
        if (p.previousElementSibling) { p.previousElementSibling.setAttribute('aria-expanded', 'false'); }
      });
    });

    /* 抽屉里的菜单也要跟着这份配置走：模板里那份是站点扁平 menus，
       配了分组后如果不同步，手机上就只剩一层——展开/闭合在移动端等于不存在。 */
    var list = $('.drawer-list');
    if (list) {
      list.innerHTML = '';
      data.forEach(function (item) {
        if (item.children && item.children.length) {
          var g = document.createElement('button');
          g.type = 'button';
          g.className = 'drawer-group';
          g.setAttribute('aria-expanded', 'false');
          g.innerHTML = icon(CRITICAL.resolveIcon ? CRITICAL.resolveIcon(item.icon) : 'i-folder') +
            '<span>' + escapeHtml(item.label || '') + '</span>' +
            icon('i-chevron', 'ic-s drawer-caret');
          var sub = document.createElement('div');
          sub.className = 'drawer-sub';
          var inner = document.createElement('div');
          item.children.forEach(function (c) {
            var ca = document.createElement('a');
            ca.href = c.link || '#';
            ca.innerHTML = icon(CRITICAL.resolveIcon ? CRITICAL.resolveIcon(c.icon) : 'i-link') +
              '<span>' + escapeHtml(c.label || '') + '</span>';
            inner.appendChild(ca);
          });
          sub.appendChild(inner);
          g.addEventListener('click', function () {
            var open = g.getAttribute('aria-expanded') === 'true';
            g.setAttribute('aria-expanded', open ? 'false' : 'true');
          });
          list.appendChild(g);
          list.appendChild(sub);
        } else {
          var a3 = document.createElement('a');
          a3.href = item.link || '#';
          a3.innerHTML = icon(CRITICAL.resolveIcon ? CRITICAL.resolveIcon(item.icon) : 'i-book') +
            '<span>' + escapeHtml(item.label || '') + '</span>';
          list.appendChild(a3);
        }
      });
    }

    if (CRITICAL.applyNavIcons) { CRITICAL.applyNavIcons(); }
  })();

  /* ======================================================================
     7. 页脚导航（footerNavList：标题#%#路径，每行一条）
     ====================================================================== */
  (function initFooterNav() {
    var raw = CFG.footerNavList;
    if (!raw || !String(raw).trim()) { return; }
    var holder = $('#footer-nav');
    if (!holder) { return; }
    var items = [];
    String(raw).split('\n').forEach(function (line) {
      line = line.trim();
      if (!line) { return; }
      var parts = line.split('#%#');
      if (parts.length < 2) { return; }
      var label = parts[0].trim();
      var link = parts.slice(1).join('#%#').trim();
      if (label && link) { items.push({ label: label, link: link }); }
    });
    if (!items.length) { return; }
    holder.innerHTML = items.map(function (it) {
      return '<li><a href="' + escapeHtml(it.link) + '">' + escapeHtml(it.label) + '</a></li>';
    }).join('');
  })();

  /* ======================================================================
     8. 全屏搜索
     ====================================================================== */
  var searchModal = $('#search-modal');
  var searchInput = $('#search-input');
  var searchResults = $('#search-results');
  var searchEmpty = $('#search-empty');
  var searchTip = $('#search-tip');
  var searchData = (function () {
    var node = $('#search-index-data');
    if (!node) { return []; }
    try {
      var parsed = JSON.parse(node.textContent || '{}');
      return (parsed.posts || []).filter(function (p) { return !p.hidden; }).map(function (p) {
        return {
          title: p.title || '',
          link: p.link || p.url || '',
          date: p.date || '',
          tags: p.tags || [],
          excerpt: p.excerpt || p.content || ''
        };
      });
    } catch (e) { return []; }
  })();

  function openSearch() {
    if (!searchModal) { return; }
    searchModal.removeAttribute('hidden');
    searchModal.classList.add('is-open');
    lockScroll(true);
    setTimeout(function () { if (searchInput) { searchInput.focus(); } }, 60);
  }
  function closeSearch() {
    if (!searchModal) { return; }
    searchModal.classList.remove('is-open');
    searchModal.setAttribute('hidden', '');
    lockScroll(false);
  }
  $$('[data-action="open-search"]').forEach(function (b) { b.addEventListener('click', openSearch); });
  $$('[data-action="close-search"]').forEach(function (b) { b.addEventListener('click', closeSearch); });

  function highlight(text, q) {
    var safe = escapeHtml(text);
    if (!q) { return safe; }
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(re, '<mark>$1</mark>');
  }

  var searchHits = [];
  var searchCursor = -1;
  function paintCursor() {
    $$('#search-results a').forEach(function (a, i) {
      a.classList.toggle('is-active', i === searchCursor);
    });
    var active = $('#search-results a.is-active');
    if (active && active.scrollIntoView) { active.scrollIntoView({ block: 'nearest' }); }
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim();
      searchCursor = -1;
      if (!q) {
        searchResults.innerHTML = '';
        searchHits = [];
        if (searchEmpty) { searchEmpty.setAttribute('hidden', ''); }
        if (searchTip) { searchTip.removeAttribute('hidden'); }
        return;
      }
      var ql = q.toLowerCase();
      searchHits = searchData.map(function (p) {
        var score = 0;
        if (p.title.toLowerCase().indexOf(ql) !== -1) { score += 5; }
        if ((p.tags || []).join(' ').toLowerCase().indexOf(ql) !== -1) { score += 3; }
        if ((p.excerpt || '').toLowerCase().indexOf(ql) !== -1) { score += 1; }
        return { p: p, score: score };
      }).filter(function (h) { return h.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 18)
        .map(function (h) { return h.p; });

      if (!searchHits.length) {
        searchResults.innerHTML = '';
        if (searchTip) { searchTip.setAttribute('hidden', ''); }
        if (searchEmpty) { searchEmpty.removeAttribute('hidden'); }
        return;
      }
      if (searchEmpty) { searchEmpty.setAttribute('hidden', ''); }
      if (searchTip) { searchTip.setAttribute('hidden', ''); }
      searchResults.innerHTML = searchHits.map(function (p) {
        return '<li><a href="' + escapeHtml(p.link) + '">' +
          '<div class="st">' + highlight(p.title, q) + '</div>' +
          '<div class="ss">' + highlight(p.excerpt || '', q) + '</div>' +
          '</a></li>';
      }).join('');
    });

    searchInput.addEventListener('keydown', function (e) {
      if (!searchHits.length) { return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        searchCursor = (searchCursor + 1) % searchHits.length;
        paintCursor();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        searchCursor = (searchCursor - 1 + searchHits.length) % searchHits.length;
        paintCursor();
      } else if (e.key === 'Enter') {
        var pick = searchHits[searchCursor >= 0 ? searchCursor : 0];
        if (pick && pick.link) { location.href = pick.link; }
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSearch();
      if (CRITICAL.closeMobile) { CRITICAL.closeMobile(); }
    }
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      openSearch();
    }
  });

  /* ======================================================================
     9. 目录（TOC）
     ====================================================================== */
  var tocItems = [];
  function updateTocActive(y) {
    var current = null;
    for (var i = 0; i < tocItems.length; i++) {
      if (y + 96 >= tocItems[i].top) { current = tocItems[i]; } else { break; }
    }
    tocItems.forEach(function (it) { it.a.classList.remove('is-active'); });
    if (current) { current.a.classList.add('is-active'); }
  }
  (function initTOC() {
    if (!CFG.tocEnable) { return; }
    var article = $('.post-content');
    var list = $('#toc-list');
    var aside = $('#toc-aside');
    if (!article || !list) { return; }
    var heads = $$('h2, h3, h4', article);
    if (!heads.length) { return; }

    heads.forEach(function (h, i) {
      if (!h.id) { h.id = 'claude-h-' + i; }
      var lvl = parseInt(h.tagName.substring(1), 10);
      var li = document.createElement('li');
      li.className = 'toc-level-' + lvl;
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
      tocItems.push({ id: h.id, a: a, top: 0 });
    });
    function refresh() {
      tocItems.forEach(function (it) {
        var el = document.getElementById(it.id);
        it.top = el ? el.getBoundingClientRect().top + window.pageYOffset : 0;
      });
    }
    refresh();
    window.addEventListener('resize', refresh);
    window.__claudeTocItems = tocItems;
    if (aside) { aside.removeAttribute('hidden'); }
    var toggle = $('[data-action="toggle-toc"]');
    var nav = $('#rightside-toc');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var collapsed = nav.hasAttribute('hidden');
        if (collapsed) { nav.removeAttribute('hidden'); } else { nav.setAttribute('hidden', ''); }
        toggle.setAttribute('aria-expanded', collapsed ? 'true' : 'false');
      });
    }
  })();

  /* ======================================================================
     10. 代码块复制
     ====================================================================== */
  (function initCodeCopy() {
    if (!CFG.codeCopy) { return; }
    $$('.post-content pre').forEach(function (pre) {
      if (pre.querySelector('.code-copy')) { return; }
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.innerHTML = icon('i-copy', 'ic-s') + '<span>复制</span>';
      pre.appendChild(btn);
      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        var text = code ? code.innerText : pre.innerText;
        var done = function () {
          btn.querySelector('span').textContent = '已复制';
          setTimeout(function () { btn.querySelector('span').textContent = '复制'; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    });
  })();

  /* ======================================================================
     11. 上下篇 + 相关推荐（用站点搜索索引推断，与 liushen 行为一致）
     ====================================================================== */
  (function initPostNav() {
    if (!body.classList.contains('page-post')) { return; }
    if (!searchData.length) { return; }
    var holder = $('#post-nav');
    var current = holder ? holder.getAttribute('data-current') : '';
    if (!current) { return; }
    var idx = -1;
    for (var i = 0; i < searchData.length; i++) {
      if (searchData[i].link === current) { idx = i; break; }
    }
    if (idx < 0) { return; }

    var newer = idx > 0 ? searchData[idx - 1] : null;
    var older = idx < searchData.length - 1 ? searchData[idx + 1] : null;
    var prevEl = $('.post-nav-item.prev');
    var nextEl = $('.post-nav-item.next');
    if (prevEl && newer) {
      prevEl.href = newer.link;
      prevEl.querySelector('.tt').textContent = newer.title;
      prevEl.removeAttribute('hidden');
    }
    if (nextEl && older) {
      nextEl.href = older.link;
      nextEl.querySelector('.tt').textContent = older.title;
      nextEl.removeAttribute('hidden');
    }

    var related = $('#related-posts');
    var listEl = $('#related-posts-list');
    if (!related || !listEl) { return; }
    var post = searchData[idx];
    var tags = post.tags || [];
    var pool = [];
    if (tags.length) {
      pool = searchData.filter(function (p, k) {
        if (k === idx) { return false; }
        return (p.tags || []).some(function (t) { return tags.indexOf(t) !== -1; });
      }).slice(0, 3);
    }
    if (pool.length < 3) {
      var picked = pool.map(function (p) { return p.link; });
      pool = pool.concat(searchData.filter(function (p, k) {
        return k !== idx && picked.indexOf(p.link) === -1;
      }).slice(0, 3 - pool.length));
    }
    if (pool.length) {
      listEl.innerHTML = pool.map(function (p) {
        return '<a class="related-item" href="' + escapeHtml(p.link) + '">' +
          '<span>' + escapeHtml(p.title) + '</span>' +
          icon('i-right', 'ic-s') + '</a>';
      }).join('');
      related.removeAttribute('hidden');
    }
  })();

  /* ======================================================================
     12. 闪念热力图（周列栅格，列数按容器宽度自适应 4~53）
     ====================================================================== */
  (function initHeatmap() {
    if (!CFG.heatmapEnable) { return; }
    var grid = $('#heatmap-grid');
    var monthsRow = $('#heatmap-months');
    if (!grid || !monthsRow) { return; }

    var counts = {};
    $$('.memo-item').forEach(function (item) {
      var raw = item.getAttribute('data-date-iso') || item.getAttribute('data-date') || '';
      var t = item.querySelector('time');
      if (!raw && t) { raw = t.getAttribute('datetime') || t.textContent || ''; }
      if (!raw) { return; }
      var d = new Date(raw);
      if (isNaN(d.getTime())) {
        var m = String(raw).match(/(\d{4})[-\/年.](\d{1,2})[-\/月.](\d{1,2})/);
        if (m) { d = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10)); }
      }
      if (isNaN(d.getTime())) { return; }
      var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      counts[key] = (counts[key] || 0) + 1;
    });

    var MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var GAP = 3;
    var CELL = 11;

    function render() {
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      var avail = grid.clientWidth || 0;
      var fit = Math.floor((avail + GAP) / (CELL + GAP));
      var weeks = Math.max(4, Math.min(53, fit));
      var totalDays = (weeks - 1) * 7 + today.getDay() + 1;
      var start = new Date(today);
      start.setDate(start.getDate() - totalDays + 1);
      start.setDate(start.getDate() - start.getDay());

      var tpl = 'repeat(' + weeks + ',minmax(0,1fr))';
      grid.style.gridTemplateColumns = tpl;
      monthsRow.style.gridTemplateColumns = tpl;

      var cells = '';
      var months = '';
      var lastMonth = -1;
      for (var w = 0; w < weeks; w++) {
        var col = '';
        var first = new Date(start);
        first.setDate(first.getDate() + w * 7);
        if (first <= today && first.getMonth() !== lastMonth) {
          months += '<span>' + MONTHS[first.getMonth()] + '</span>';
          lastMonth = first.getMonth();
        } else {
          months += '<span></span>';
        }
        for (var d = 0; d < 7; d++) {
          var cell = new Date(start);
          cell.setDate(cell.getDate() + w * 7 + d);
          var key = cell.getFullYear() + '-' + String(cell.getMonth() + 1).padStart(2, '0') + '-' + String(cell.getDate()).padStart(2, '0');
          var n = counts[key] || 0;
          var lvl = n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4;
          if (cell > today) {
            col += '<i class="heatmap-cell" data-level="-1"></i>';
          } else {
            col += '<i class="heatmap-cell" data-level="' + lvl + '" title="' + key + '：' + n + ' 条闪念"></i>';
          }
        }
        cells += '<span class="heatmap-week">' + col + '</span>';
      }
      grid.innerHTML = cells;
      monthsRow.innerHTML = months;
    }
    render();
    var timer;
    window.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(render, 160);
    });
  })();

  /* ======================================================================
     13. 运行天数（#webinfo-runtime / #card-info-runtime / #hero-runtime）
     ====================================================================== */
  (function initRuntime() {
    $$('[data-since]').forEach(function (el) {
      var s = new Date(el.getAttribute('data-since'));
      if (isNaN(s.getTime())) { return; }
      var days = Math.max(0, Math.floor((Date.now() - s.getTime()) / 86400000));
      el.textContent = days;
    });
  })();

  /* ======================================================================
     14. 全站文章总数（/api/search.json 是引擎生成的站级索引）
     模板里已有兜底值，这里只做覆盖；session 内缓存，翻页时数字不跳。
     ====================================================================== */
  (function initPostCount() {
    var els = $$('[data-site-post-count]');
    if (!els.length || !window.fetch) { return; }
    var KEY = 'claude-post-count';
    var paint = function (n) {
      els.forEach(function (el) { el.textContent = n; });
    };
    try {
      var cached = sessionStorage.getItem(KEY);
      if (cached) { paint(cached); }
    } catch (e) {}
    fetch('/api/search.json', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!Array.isArray(d) || !d.length) { return; }
        paint(d.length);
        try { sessionStorage.setItem(KEY, String(d.length)); } catch (e) {}
      })
      .catch(function () {});
  })();

  /* ======================================================================
     15. 随机文章
     ====================================================================== */
  $$('[data-action="random-post"]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!searchData.length) { return; }
      var pick = searchData[Math.floor(Math.random() * searchData.length)];
      if (pick && pick.link) { location.href = pick.link; }
    });
  });

  /* ======================================================================
     16. busuanzi 数据同步（统计脚本由站点的「注入 body」配置提供）
         本主题对接的是 cdn.busuanzi.cc 的 3.6.9 服务：脚本是一次性 IIFE，
         POST {url, referrer} 到 https://cdn.busuanzi.cc/api.php，
         返回 JSON 的 key 即元素 id，脚本按 id 直接覆盖 innerText。
         回填的 id 口径（新版服务，无 value 前缀）：
           busuanzi_site_pv / busuanzi_site_uv   全站访问量 / 访客数
           busuanzi_today_pv / busuanzi_today_uv 今日访问量 / 访客数
           busuanzi_page_pv                      本页阅读量
         旧版 ibruce.info 命名（busuanzi_value_*）一并兼容，换服务不用改这里。
         本节职责：把页脚槽位的数字同步进首页信息带；
         服务超时未回填时把信息带降级成「—」，不停在占位符上。
         ⚠️ 脚本是异步 fetch，且 main.js 先于注入的统计脚本执行，
            必须轮询等待，同步读一次永远读不到值。
     ====================================================================== */
  (function syncBusuanzi() {
    var PAIRS = [
      ['busuanzi', 'busuanzi_site_uv'],
      ['busuanzi-pv', 'busuanzi_site_pv']
    ];
    var LEGACY = {
      'busuanzi': 'busuanzi_value_site_uv',
      'busuanzi-pv': 'busuanzi_value_site_pv'
    };
    /* 占位符一律不算有效值：'--' 是旧版服务的失败标记，'加载中...' 是模板初始文本 */
    var PLACEHOLDERS = ['', '--', '—', '加载中...', '加载中…', '加载失败'];
    var DEADLINE = Date.now() + 8000;
    var timer = setInterval(tick, 300);
    tick();

    function read(id, legacyId) {
      /* 新版命名优先；若它不存在或还停在占位符，回退旧版命名 */
      var candidates = [document.getElementById(id), legacyId && document.getElementById(legacyId)];
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        if (!el) { continue; }
        var v = (el.textContent || '').trim();
        if (v && PLACEHOLDERS.indexOf(v) === -1) { return v; }
      }
      return null;
    }
    function tick() {
      var done = true;
      PAIRS.forEach(function (p) {
        var box = document.getElementById('webinfo-' + p[0]);
        if (!box) { return; }
        var v = read(p[1], LEGACY[p[0]]);
        if (v) {
          box.textContent = v;
        } else if (Date.now() < DEADLINE) {
          done = false;            /* 还没回填，下一轮再读 */
        } else {
          box.textContent = '—';   /* 服务超时：降级，不留在占位符上 */
        }
      });
      if (done) { clearInterval(timer); }
    }
  })();

  /* ======================================================================
     17. {YEAR} 占位替换
     ====================================================================== */
  $$('.footer-copyright').forEach(function (el) {
    el.innerHTML = el.innerHTML.replace(/\{YEAR\}/g, new Date().getFullYear());
  });

  /* ======================================================================
     18. 图片宫格（基于 HTML 注释指令）
       <!-- grid:3 --> 开启一个宫格块（每行 3 张）
       <!-- row:2 -->  切换当前行数量
       <!-- /grid -->  结束
     布局：同一行按图片宽高比等比分配宽度，行高统一 —— 无裁切、不留白边。
     ====================================================================== */
  (function initImageGrid() {
    var article = $('.post-content');
    if (!article) { return; }

    function comments(rootEl) {
      var out = [];
      var walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_COMMENT, null);
      var node;
      while ((node = walker.nextNode())) { out.push(node); }
      return out;
    }
    function parse(text) {
      text = text.trim();
      var g = text.match(/^grid[:：]\s*(\d+)/i);
      if (g) { return { type: 'grid', cols: parseInt(g[1], 10) }; }
      var r = text.match(/^row[:：]\s*(\d+)/i);
      if (r) { return { type: 'row', cols: parseInt(r[1], 10) }; }
      if (/^\/?grid$/i.test(text)) { return { type: 'end' }; }
      return null;
    }
    function imagesBetween(startNode, endNode) {
      var out = [];
      var node = startNode.nextSibling;
      while (node && node !== endNode) {
        if (node.nodeType === 1) {
          if (node.tagName === 'IMG') {
            out.push(node);
          } else {
            $$('img', node).forEach(function (img) {
              if (!img.closest('.tk-avatar') && !img.closest('.tk-head')) { out.push(img); }
            });
          }
        }
        node = node.nextSibling;
      }
      return out;
    }

    var blocks = [];
    var cur = null;
    comments(article).forEach(function (c) {
      var d = parse(c.textContent || '');
      if (!d) { return; }
      if (d.type === 'grid') {
        cur = { start: c, rows: [], row: { cols: d.cols, imgs: [] } };
      } else if (d.type === 'row' && cur) {
        cur.rows.push(cur.row);
        cur.row = { cols: d.cols, imgs: [] };
      } else if (d.type === 'end' && cur) {
        cur.rows.push(cur.row);
        cur.end = c;
        blocks.push(cur);
        cur = null;
      }
    });

    var dynamicRows = [];

    function layoutRow(rowEl, items, width) {
      var gap = 8;
      var n = items.length;
      if (!n) { return; }
      var ratios = items.map(function (it) {
        var img = it.querySelector('img');
        var w = img && img.naturalWidth ? img.naturalWidth : 3;
        var h = img && img.naturalHeight ? img.naturalHeight : 2;
        return Math.max(0.35, Math.min(3.2, w / h));
      });
      var sum = ratios.reduce(function (a, b) { return a + b; }, 0);
      var free = Math.max(0, width - gap * (n - 1));
      var h = free / sum;
      items.forEach(function (it, i) {
        it.style.width = Math.max(40, Math.floor(ratios[i] * h)) + 'px';
        it.style.height = Math.floor(h) + 'px';
      });
    }

    function build() {
      blocks.forEach(function (block) {
        var rows = block.rows.filter(function (r) { return true; });
        var imgs = imagesBetween(block.start, block.end);
        if (!imgs.length) { return; }

        var gridEl = document.createElement('div');
        gridEl.className = 'img-grid';
        var pool = imgs.slice();
        var container = block.start.parentNode;
        container.insertBefore(gridEl, block.start.nextSibling);

        function pushRow(group, cols) {
          if (!group.length) { return; }
          var rowEl = document.createElement('div');
          rowEl.className = 'img-row';
          var items = group.map(function (img) {
            var fig = img.closest('figure');
            var holder = img.parentNode;
            var item = document.createElement('a');
            item.className = 'img-row-item';
            item.href = img.getAttribute('src') || '#';
            item.appendChild(img);              // appendChild 会自动把 img 从原父节点移走
            rowEl.appendChild(item);
            // 清掉搬空后的残留容器（figcaption 要一起带走），否则会留下空白段落。
            // 注意不能用 img.parentNode 判断 —— 此刻它已经是 item 了。
            if (fig && fig.parentNode) { fig.parentNode.removeChild(fig); }
            else if (holder && holder !== item && holder.tagName === 'P' &&
                     !holder.textContent.trim() && !holder.querySelector('img')) {
              if (holder.parentNode) { holder.parentNode.removeChild(holder); }
            }
            return item;
          });
          gridEl.appendChild(rowEl);
          dynamicRows.push({ el: rowEl, items: items });
        }

        rows.forEach(function (r) {
          var cols = Math.max(1, r.cols);
          pushRow(pool.splice(0, cols), cols);
        });
        var lastCols = rows.length ? Math.max(1, rows[rows.length - 1].cols) : 3;
        while (pool.length) {
          pushRow(pool.splice(0, lastCols), lastCols);
        }

        // 清掉指令注释，避免二次渲染
        if (block.start.parentNode) { block.start.parentNode.removeChild(block.start); }
        if (block.end && block.end.parentNode) { block.end.parentNode.removeChild(block.end); }
      });

      function relayout() {
        var w = article.clientWidth || 0;
        if (!w) { return; }
        dynamicRows.forEach(function (r) { layoutRow(r.el, r.items, w); });
      }
      relayout();
      window.addEventListener('load', relayout);
      window.addEventListener('resize', relayout);
      var t;
      window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(relayout, 120);
      });
    }
    build();
  })();

  /* ======================================================================
     19. 图片查看器（点击正文图片放大：左右切换 / 缩放 / 拖拽 / 键盘 / 触屏）
     ====================================================================== */
  (function initViewer() {
    var article = $('.post-content');
    if (!article) { return; }
    var imgs = $$('img', article).filter(function (img) {
      if (img.closest('.tk-avatar') || img.closest('.tk-head')) { return false; }
      return true;
    });
    if (!imgs.length) { return; }

    var view = document.createElement('div');
    view.className = 'viewer';
    view.setAttribute('role', 'dialog');
    view.setAttribute('aria-modal', 'true');
    view.setAttribute('aria-label', '图片预览');
    view.innerHTML =
      '<button type="button" class="icon-btn viewer-close" aria-label="关闭">' + icon('i-close') + '</button>' +
      '<button type="button" class="icon-btn viewer-nav prev" aria-label="上一张">' + icon('i-left') + '</button>' +
      '<button type="button" class="icon-btn viewer-nav next" aria-label="下一张">' + icon('i-right') + '</button>' +
      '<div class="viewer-stage"><img alt=""></div>' +
      '<div class="viewer-bar">' +
        '<button type="button" class="icon-btn" data-zoom="out" aria-label="缩小">' + icon('i-down') + '</button>' +
        '<span class="viewer-count"></span>' +
        '<button type="button" class="icon-btn" data-zoom="in" aria-label="放大">' + icon('i-up') + '</button>' +
      '</div>';
    document.body.appendChild(view);

    var stage = $('.viewer-stage', view);
    var pic = $('.viewer-stage img', view);
    var counter = $('.viewer-count', view);
    var index = 0;
    var scale = 1;
    var tx = 0;
    var ty = 0;
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;

    function paint() {
      pic.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
      counter.textContent = (index + 1) + ' / ' + imgs.length;
    }
    function reset() { scale = 1; tx = 0; ty = 0; paint(); }
    function open(i) {
      index = Math.max(0, Math.min(imgs.length - 1, i));
      pic.src = imgs[index].getAttribute('data-viewer-src') || imgs[index].src;
      pic.alt = imgs[index].getAttribute('alt') || '';
      reset();
      view.classList.add('is-open');
      lockScroll(true);
    }
    function close() {
      view.classList.remove('is-open');
      lockScroll(false);
      reset();
    }
    function step(n) { open((index + n + imgs.length) % imgs.length); }

    article.addEventListener('click', function (e) {
      var img = e.target.closest ? e.target.closest('img') : null;
      if (!img || img.closest('.tk-avatar') || img.closest('.tk-head')) { return; }
      if (img.closest('.img-row-item')) { return; } // 宫格里的图交给下面的委托
      var i = imgs.indexOf(img);
      if (i < 0) { return; }
      e.preventDefault();
      open(i);
    });
    // 宫格里被 JS 搬进 <a> 的图片同样可点开
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('.img-row-item') : null;
      if (!link) { return; }
      e.preventDefault();
      var i = imgs.indexOf(link.querySelector('img'));
      if (i >= 0) { open(i); }
    });

    $('.viewer-close', view).addEventListener('click', close);
    $('.viewer-nav.prev', view).addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    $('.viewer-nav.next', view).addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    view.addEventListener('click', function (e) {
      if (e.target === view || e.target === stage) { close(); }
    });
    $$('[data-zoom]', view).forEach(function (b) {
      b.addEventListener('click', function () {
        scale = b.getAttribute('data-zoom') === 'in'
          ? Math.min(4, scale + 0.4)
          : Math.max(1, scale - 0.4);
        if (scale === 1) { tx = 0; ty = 0; }
        paint();
      });
    });

    pic.addEventListener('mousedown', function (e) {
      if (scale <= 1) { return; }
      dragging = true;
      moved = false;
      startX = e.clientX - tx;
      startY = e.clientY - ty;
      pic.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) { return; }
      tx = e.clientX - startX;
      ty = e.clientY - startY;
      moved = true;
      paint();
    });
    window.addEventListener('mouseup', function () {
      dragging = false;
      if (pic) { pic.style.cursor = 'grab'; }
    });
    pic.addEventListener('dblclick', function () { scale = scale > 1 ? 1 : 2; tx = 0; ty = 0; paint(); });

    var touchX = 0;
    var touchY = 0;
    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { return; }
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      if (scale > 1) { dragging = true; startX = touchX - tx; startY = touchY - ty; }
    }, { passive: true });
    stage.addEventListener('touchmove', function (e) {
      if (!dragging || e.touches.length !== 1) { return; }
      tx = e.touches[0].clientX - startX;
      ty = e.touches[0].clientY - startY;
      paint();
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      dragging = false;
      var dx = e.changedTouches[0].clientX - touchX;
      if (scale === 1 && Math.abs(dx) > 48) { step(dx > 0 ? -1 : 1); }
    });

    document.addEventListener('keydown', function (e) {
      if (!view.classList.contains('is-open')) { return; }
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { step(-1); }
      else if (e.key === 'ArrowRight') { step(1); }
    });
  })();

  /* ======================================================================
     20. 订阅表单
     主题已经渲染了自己的输入框与按钮（.subscribe-form-box > form.sub-form），
     用户粘贴的原始内容放在 .sub-raw 里：
       ① 里面有 <form action> → 把 action/method/target 与隐藏字段搬过来
       ② 只有一行接口地址     → 用它当 action
       ③ 什么都没有           → 保留主题 UI，不做提交（只做校验演示）
     校验提示用 .sub-tip，文案全部来自 data-sub-*，不在 JS 里写死。
     ====================================================================== */
  (function initSubscribe() {
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function applyRaw(box, form) {
      var raw = box.querySelector('.sub-raw');
      if (!raw) { return; }
      // 注意取 innerHTML：用户粘贴的是真实 DOM（<form> / hidden 字段），
      // textContent 只会拿到可见文字，标签会被吃掉。
      var html = (raw.innerHTML || '').trim();
      if (!html) { return; }

      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      var srcForm = tpl.content.querySelector('form');

      if (srcForm) {
        var action = srcForm.getAttribute('action');
        if (action) { form.setAttribute('action', action); }
        var method = (srcForm.getAttribute('method') || 'post').toLowerCase();
        form.setAttribute('method', method);
        form.setAttribute('target', '_blank');
        // 搬隐藏字段：第三方订阅接口常靠这些 hidden 识别表单归属
        Array.prototype.forEach.call(srcForm.querySelectorAll('input[type="hidden"]'), function (h) {
          var clone = document.createElement('input');
          clone.type = 'hidden';
          clone.name = h.name;
          clone.value = h.value;
          form.appendChild(clone);
        });
        return;
      }

      var m = html.match(/https?:\/\/[^\s"'<>]+/i);
      if (m) {
        form.setAttribute('action', m[0]);
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
      }
    }

    function wire(box, form) {
      var tipEmpty = box.getAttribute('data-sub-tip-empty') || '请输入邮箱地址';
      var tipFormat = box.getAttribute('data-sub-tip-format') || '邮箱格式不正确，请检查后重试';
      var input = form.querySelector('input[type="email"], input[type="text"], input:not([type])');
      if (!input) { return; }
      var tip = box.querySelector('.sub-tip');
      if (!tip) {
        tip = document.createElement('p');
        tip.className = 'sub-tip';
        tip.setAttribute('role', 'alert');
        form.appendChild(tip);
      }
      form.setAttribute('novalidate', '');

      function setState(msg) {
        tip.textContent = msg || '';
        if (msg) {
          box.classList.add('is-invalid');
          input.setAttribute('aria-invalid', 'true');
        } else {
          box.classList.remove('is-invalid');
          input.removeAttribute('aria-invalid');
        }
      }
      form.addEventListener('submit', function (ev) {
        var value = String(input.value || '').trim();
        var msg = '';
        if (!value) { msg = tipEmpty; }
        else if (!EMAIL_RE.test(value)) { msg = tipFormat; }
        if (msg) {
          ev.preventDefault();
          setState(msg);
          try { input.focus(); } catch (e) {}
          return;
        }
        setState('');
        // 没有可用 action 时只做前端校验，不发请求
        if (!form.getAttribute('action')) { ev.preventDefault(); }
      });
      input.addEventListener('input', function () {
        if (box.classList.contains('is-invalid')) { setState(''); }
      });
    }

    $$('.subscribe-form-box').forEach(function (box) {
      var form = box.querySelector('.sub-form') || box.querySelector('form:not(.sub-raw form)');
      if (!form) { return; }
      applyRaw(box, form);
      wire(box, form);
    });
  })();

})();
