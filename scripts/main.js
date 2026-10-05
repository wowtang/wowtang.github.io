/* ==========================================================
   Liushen Theme — main.js
   覆盖：暗色三档 / 打字机 / 全屏搜索 / TOC / 阅读进度 /
   代码复制 / 回到顶部 / 闪念热力图 / 上下篇 /
   随机文章 / 多级菜单 / 移动抽屉 / 运行天数 / sun-moon 切换
   ========================================================== */
(function () {
  'use strict';

  var CFG = window.LIUSHEN_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var body = document.body;

  /* ------ 1. 暗色三档切换 + sun-moon 动画 ------ */
  var THEME_KEY = 'liushen-theme';
  var prefRaw = (function () {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  })();
  var prefMode = prefRaw || CFG.defaultTheme || 'auto';

  function resolveTheme(mode) {
    if (mode === 'auto') {
      var h = new Date().getHours();
      return (h >= 6 && h < 18) ? 'light' : 'dark';
    }
    return mode;
  }
  function applyTheme(mode, withAnim, ev) {
    var resolved = resolveTheme(mode);
    if (withAnim && ev) {
      var sm = $('#sun-moon-cover');
      if (sm) {
        sm.style.setProperty('--switch-x', ev.clientX + 'px');
        sm.style.setProperty('--switch-y', ev.clientY + 'px');
        body.classList.add('sun-moon-active');
        setTimeout(function () { body.classList.remove('sun-moon-active'); }, 360);
      }
    }
    html.setAttribute('data-theme', resolved);
    html.dataset.themePref = mode;
    // ============== 主题切换时同步更新导航文字颜色 ==============
    var navEl = document.getElementById('nav');
    if (navEl) {
      var y = window.pageYOffset;
      var isBannerTransparent = body.classList.contains('page-index') && y < 80;
      if (resolved === 'dark' && !isBannerTransparent) {
        navEl.classList.add('nav-text-dark');
      } else {
        navEl.classList.remove('nav-text-dark');
      }
    }
  }
  applyTheme(prefMode, false);

  // auto 模式下，每分钟检查时间换主题
  if (prefMode === 'auto') {
    setInterval(function () {
      if (html.dataset.themePref === 'auto') applyTheme('auto', false);
    }, 60 * 1000);
  }

  function cycleTheme(ev) {
    var current = html.dataset.themePref || 'auto';
    var order = ['auto', 'light', 'dark'];
    var next = order[(order.indexOf(current) + 1) % order.length];
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyTheme(next, true, ev);
  }

  $$('[data-action="toggle-theme"]').forEach(function (btn) {
    btn.addEventListener('click', cycleTheme);
  });

  /* ------ 2. 移除 not-loaded 标记，启用动画 ------ */
  window.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () { html.classList.remove('not-loaded'); });
  });

  /* ------ 3. 打字机副标题 ------ */
  function initTyped() {
    var target = $('#subtitle');
    if (!target) return;
    var raw = (CFG.subtitleList || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!raw.length) return;
    var speed = parseInt(CFG.subtitleSpeed, 10) || 120;
    var idx = 0;
    function play() {
      var text = raw[idx % raw.length];
      var i = 0; target.textContent = '';
      var typer = setInterval(function () {
        target.textContent = text.slice(0, ++i);
        if (i >= text.length) {
          clearInterval(typer);
          setTimeout(function () {
            var del = setInterval(function () {
              target.textContent = text.slice(0, --i);
              if (i <= 0) { clearInterval(del); idx++; play(); }
            }, Math.max(40, speed / 2));
          }, 1800);
        }
      }, speed);
    }
    play();
  }
  initTyped();

  /* ------ 4. 首页向下滚动按钮 ------ */
  $$('[data-action="scroll-down"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var h = $('#page-header');
      var to = h ? h.offsetHeight : window.innerHeight;
      window.scrollTo({ top: to - 60, behavior: 'smooth' });
    });
  });

  /* ------ 5. nav 滚动表现：透明 / 隐藏 / 阴影 ------ */
  var nav = $('#nav');
  var lastScroll = 0;
  function onScroll() {
    var y = window.pageYOffset;
    if (nav) {
      // 首页 banner 区透明
      var isBannerTransparent = false;
      if (body.classList.contains('page-index')) {
        if (y < 80) { nav.classList.add('nav-transparent'); isBannerTransparent = true; }
        else { nav.classList.remove('nav-transparent'); isBannerTransparent = false; }
      }
      // 滚动方向隐藏（仅大屏 + 远离顶部）
      if (window.innerWidth > 992 && y > 240) {
        if (y > lastScroll + 4) nav.classList.add('nav-hidden');
        else if (y < lastScroll - 4) nav.classList.remove('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
      // 远离顶部时增加阴影
      if (y > 80) nav.classList.add('nav-shrink'); else nav.classList.remove('nav-shrink');
      // ============== 问题3修复：dark模式下，非Banner透明阶段的导航 强制用浅色文字 ==============
      var isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark && !isBannerTransparent) {
        nav.classList.add('nav-text-dark');
      } else {
        nav.classList.remove('nav-text-dark');
      }
    }

    // 阅读进度
    if (CFG.readingProgress) updateProgress(y);

    // 回到顶部按钮显隐
    var scrollBtn = $('.scroll-to-top');
    if (scrollBtn) {
      if (y > 240) scrollBtn.removeAttribute('hidden');
      else scrollBtn.setAttribute('hidden', '');
    }

    // TOC 滚动激活
    if (window._liushenTocItems) updateTocActive(y);

    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------ 6. 阅读进度条 ------ */
  var progressBar = $('#reading-progress > span');
  function updateProgress(y) {
    if (!progressBar) return;
    var doc = document.documentElement;
    var max = (doc.scrollHeight - doc.clientHeight) || 1;
    var pct = Math.min(100, Math.max(0, (y / max) * 100));
    progressBar.style.width = pct + '%';
  }

  /* ------ 7. 回到顶部 ------ */
  $$('[data-action="scroll-to-top"]').forEach(function (b) {
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  });

  /* ------ 8. 移动菜单 / 抽屉 ------ */
  var mobile = $('#mobile-sidebar');
  function openMobile() { if (mobile) { mobile.removeAttribute('hidden'); body.style.overflow = 'hidden'; } }
  function closeMobile() { if (mobile) { mobile.setAttribute('hidden', ''); body.style.overflow = ''; } }
  $$('[data-action="toggle-mobile-menu"]').forEach(function (b) { b.addEventListener('click', openMobile); });
  $$('[data-action="close-mobile-menu"]').forEach(function (b) { b.addEventListener('click', closeMobile); });

  /* ------ 9. 多级 dropdown 菜单（navMenuJson 非空时动态渲染） ------
     注意：叶子项要写 data-tip，与 header.html 里静态菜单保持同一套「折叠态悬浮提示」。
     带 children 的分组项不写 —— 它 hover 时弹的是下拉子菜单，再叠一个提示框就是打架。 */
  function renderMultiLevelMenus() {
    var raw = CFG.navMenuJson || '[]';
    if (!raw || raw === '[]') return;
    var data;
    try { data = JSON.parse(raw); } catch (e) { return; }
    if (!Array.isArray(data) || !data.length) return;
    var holder = $('.menus_items');
    if (!holder) return;
    holder.innerHTML = '';
    data.forEach(function (item) {
      var wrap = document.createElement('div');
      wrap.className = 'menus_item';
      if (item.children && item.children.length) {
        var trigger = document.createElement('span');
        trigger.className = 'site-page group';
        trigger.innerHTML = '<i class="fa-fw ' + (item.icon || 'fa-solid fa-bookmark') + '"></i><span> ' + escapeHtml(item.label) + '</span><i class="fas fa-chevron-down"></i>';
        wrap.appendChild(trigger);
        var ul = document.createElement('ul');
        ul.className = 'menus_item_child';
        item.children.forEach(function (c) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.className = 'site-page child';
          a.href = c.link || '#';
          a.innerHTML = '<i class="fa-fw ' + (c.icon || 'fa-solid fa-circle') + '"></i><span> ' + escapeHtml(c.label) + '</span>';
          li.appendChild(a); ul.appendChild(li);
        });
        wrap.appendChild(ul);
      } else {
        var a = document.createElement('a');
        a.className = 'site-page';
        a.href = item.link || '#';
        a.innerHTML = '<i class="fa-fw ' + (item.icon || 'fa-solid fa-bookmark') + '"></i><span> ' + escapeHtml(item.label) + '</span>';
        if (item.label) wrap.setAttribute('data-tip', item.label);
        wrap.appendChild(a);
      }
      holder.appendChild(wrap);
    });
  }
  function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  renderMultiLevelMenus();

  /* ------ 9b. 顶栏菜单图标匹配（navMenuIcons 规则 + 内置路径规则） ------
     背景：站点菜单项渲染时图标一律回落 fa-bookmark，于是顶栏会排出一模一样的书签。
     这里按「用户表 → 内置精确路径 → 末段路径 → 精确名称」依次匹配后替换图标。
     两个约束：
       1. 只替换仍然是兜底 fa-bookmark 的项 —— 不覆盖 navMenuJson 里显式写好的 icon；
       2. 内置规则必须精确匹配：本站有 /post、/post/bigthings、/post/feedback 三项，
          若用「包含匹配」后两项会先撞上 /post 拿到博客图标。
     纯一次性初始化，不依赖视口/resize → 无竞态。
     配置形态：原本是 array 表（两列），2026-10-05 改成 textarea 多行文本 ——
     GP 后台的 array 增删入口是「行右上角 hover 才浮出的 ＋/－」，
     列表非空时底部的「添加项目」按钮还会整体隐藏，实测用户找不到入口。
     文本形态每行一条、直接换行即增删，无隐藏交互。旧的 array 值仍然兼容。
     --------------------------------------------------------------- */
  var NAV_ICON_RULES = {
    '':           'fa-solid fa-house',
    'index':      'fa-solid fa-house',
    'post':       'fa-solid fa-newspaper',
    'archives':   'fa-solid fa-archive',
    'tags':       'fa-solid fa-tags',
    'categories': 'fa-solid fa-folder-open',
    'memos':      'fa-solid fa-comment-dots',
    'links':      'fa-solid fa-link',
    'about':      'fa-solid fa-address-card',
    'search':     'fa-solid fa-magnifying-glass',
    'message':    'fa-solid fa-comment',
    'guestbook':  'fa-solid fa-comment'
  };
  var NAV_ICON_BY_NAME = {
    '首页': 'fa-solid fa-house',
    '博客': 'fa-solid fa-newspaper',
    '文章': 'fa-solid fa-newspaper',
    '归档': 'fa-solid fa-archive',
    '标签': 'fa-solid fa-tags',
    '分类': 'fa-solid fa-folder-open',
    '闪念': 'fa-solid fa-comment-dots',
    '友链': 'fa-solid fa-link',
    '关于': 'fa-solid fa-address-card',
    '留言': 'fa-solid fa-comment',
    '搜索': 'fa-solid fa-magnifying-glass'
  };
  var NAV_ICON_FALLBACK = 'fa-bookmark';
  var FA_STYLE_PREFIX = /(^|\s)fa-(solid|regular|brands|light|thin|duotone)(\s|$)/;

  /* 补全图标类名：
       写全了（fa-solid fa-x / fa-brands fa-x）→ 原样保留
       少风格前缀（fa-clock）              → 补 fa-solid
       少 fa- 前缀（pen）                  → 补成 fa-pen，再补 fa-solid
     用户表里填什么都不至于渲染成空图标。 */
  function navIconNormalize(raw) {
    var s = String(raw == null ? '' : raw).trim().replace(/\s+/g, ' ');
    if (!s) return '';
    var parts = s.split(' ');
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var t = parts[i];
      if (!t) continue;
      if (!/^fa-/.test(t)) t = 'fa-' + t;
      out.push(t);
    }
    s = out.join(' ');
    if (!FA_STYLE_PREFIX.test(s)) s = 'fa-solid ' + s;
    return s;
  }
  /* 把 href 归一化成一个不含首尾斜杠的路径：/post/about/ → post/about */
  function navIconPath(href) {
    var s = String(href == null ? '' : href).trim();
    if (!s || s === '#' || s.indexOf('javascript:') === 0) return '';
    s = s.split('#')[0].split('?')[0];
    var abs = s.match(/^[a-zA-Z][\w+.-]*:\/\/[^/]*(\/.*)?$/);
    if (abs) s = abs[1] || '/';
    s = s.replace(/\/index\.html?$/i, '/').replace(/\.html?$/i, '');
    return s.replace(/^\/+|\/+$/g, '').toLowerCase();
  }
  /* 用户表的「匹配」列同样要去掉首尾斜杠，否则填 /archives 永远匹配不上
     （归一化后的路径是 archives，没有前导斜杠）。 */
  function navIconKey(raw) {
    return String(raw == null ? '' : raw).trim().split('#')[0].split('?')[0]
      .replace(/^\/+|\/+$/g, '').toLowerCase();
  }
  function navIconLookup(link, name, table) {
    var path = navIconPath(link);
    var label = String(name == null ? '' : name).trim().toLowerCase();
    var i, rule, rawKey, key, icon;
    // 1) 用户表：路径或名称任一处「包含」即命中（顺序即优先级）
    for (i = 0; i < table.length; i++) {
      rule = table[i] || {};
      rawKey = String(rule.match == null ? '' : rule.match).trim();
      if (!rawKey) continue;
      icon = navIconNormalize(rule.icon);
      if (!icon) continue;
      key = navIconKey(rawKey);
      // 只写了「/」这类：只对首页生效
      if (!key) { if (!path) return icon; continue; }
      if (path.indexOf(key) !== -1 || label.indexOf(key) !== -1) return icon;
    }
    // 2) 内置：精确路径
    if (Object.prototype.hasOwnProperty.call(NAV_ICON_RULES, path)) return NAV_ICON_RULES[path];
    // 3) 内置：末段路径（post/about → about）
    var seg = path ? path.split('/').pop() : '';
    if (seg && seg !== path && Object.prototype.hasOwnProperty.call(NAV_ICON_RULES, seg)) return NAV_ICON_RULES[seg];
    // 4) 内置：精确名称（link 是外链时兜底）
    if (Object.prototype.hasOwnProperty.call(NAV_ICON_BY_NAME, label)) return NAV_ICON_BY_NAME[label];
    return '';
  }
  /* 配置值吃两种形态：
       ① textarea 字符串 —— 每行一条「匹配, 图标」，空行与 # 开头的注释行跳过；
       ② 旧 array 表（{match,icon} 两列）—— 老站点配置继续可用，不必手动迁移。
     分隔符取行内**最先出现**的一个：, ， | = 或 Tab。
     整行没有任何分隔符时，退化成「第一个图标类名之前」切分，
     于是「/post/bigthings fa-solid fa-timeline」这种只留一个空格的写法也能用。 */
  var NAV_ICON_SEPS = [',', '，', '|', '=', '\t'];
  var NAV_ICON_ICON_AT = /\s+(?=(?:fa[srb]?|fa-(?:solid|regular|brands|light|thin|duotone))\b)/;
  function navIconSplitRule(line) {
    var cut = -1, skip = 1, i, p;
    for (i = 0; i < NAV_ICON_SEPS.length; i++) {
      p = line.indexOf(NAV_ICON_SEPS[i]);
      if (p >= 0 && (cut < 0 || p < cut)) { cut = p; skip = NAV_ICON_SEPS[i].length; }
    }
    if (cut >= 0) return [line.slice(0, cut), line.slice(cut + skip)];
    var m = line.match(NAV_ICON_ICON_AT);
    if (m) return [line.slice(0, m.index), line.slice(m.index + m[0].length)];
    return [line, ''];
  }
  function navIconTable(raw) {
    var out = [], i, j, line, pair;
    if (Array.isArray(raw)) {                    // 旧 array 形态
      for (i = 0; i < raw.length; i++) {
        if (raw[i] && raw[i].match) out.push({ match: raw[i].match, icon: raw[i].icon });
      }
      return out;
    }
    if (typeof raw !== 'string') return out;
    var lines = raw.split(/\r?\n/);
    for (j = 0; j < lines.length; j++) {
      line = lines[j].trim();
      if (!line || line.charAt(0) === '#') continue;
      pair = navIconSplitRule(line);
      if (!pair[0].trim()) continue;
      out.push({ match: pair[0].trim(), icon: pair[1].trim() });
    }
    return out;
  }
  function applyNavMenuIcons() {
    var table = navIconTable(CFG.navMenuIcons);
    // 顶栏菜单与移动抽屉是同一批 menus，模板里各自硬编码了一遍图标 → 一处逻辑管两处
    $$('#menus .menus_item > .site-page, #mobile-nav-list .mobile-nav-item').forEach(function (el) {
      var icon = el.querySelector('i');
      if (!icon || icon.className.indexOf(NAV_ICON_FALLBACK) === -1) return;
      var span = el.querySelector('span');
      var hit = navIconLookup(el.getAttribute('href'), span ? span.textContent : '', table);
      if (hit) icon.className = 'fa-fw ' + hit;
    });
  }
  applyNavMenuIcons();

  /* ------ 9a. 顶栏菜单图标 / 窄屏形态（纯 CSS，无 JS） ------
   两个维度都由模板类 + CSS 静态决定，首帧即正确：
     nav-icon-off            ← navIconShow=false
     nav-shape-full/compact/icon ← navMenuShape（仅 992–1280px 生效）
   旧实现在这里跑过一套 max-width 过渡状态机（measureSpanWidth /
   bindTransitionEnds / setMenuNarrow / initNavIcon + 固定 setTimeout(400)），
   它带来的收益只是 0.35s 的展开动画，代价却是一个真缺陷：
   快速跨 1280 断点时，过期的计时器会清掉新一轮的类与内联样式，
   宽屏下永久停在「一字」态。动画收益 << 状态机风险，故整体移除。
   --------------------------------------------------------------- */


  /* ------ 9c. 页脚导航（footerNavList 非空时动态渲染） ------ */
  function renderFooterNav() {
    var raw = CFG.footerNavList;
    if (!raw || !raw.trim()) return;
    var holder = $('#footer-nav');
    if (!holder) return;
    var lines = raw.split('\n');
    var items = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var parts = line.split('#%#');
      if (parts.length < 2) continue;
      var label = parts[0].trim();
      var link = parts.slice(1).join('#%#').trim();
      if (!label || !link) continue;
      items.push({ label: label, link: link });
    }
    if (!items.length) return;
    holder.innerHTML = '';
    items.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.link;
      a.textContent = item.label;
      holder.appendChild(a);
    });
  }
  renderFooterNav();

  /* ------ 10. 全屏搜索 ------ */
  var searchModal = $('#search-modal');
  var searchInput = $('#search-input');
  var searchResults = $('#search-results');
  var searchEmpty = $('#search-empty');
  var searchTip = $('#search-tip');
  var searchData = (function () {
    var node = $('#search-index-data');
    if (!node) return [];
    try { return JSON.parse(node.textContent || '{}').posts || []; } catch (e) { return []; }
  })();

  function openSearch() {
    if (!searchModal) return;
    searchModal.removeAttribute('hidden');
    body.style.overflow = 'hidden';
    setTimeout(function () { if (searchInput) searchInput.focus(); }, 50);
  }
  function closeSearch() {
    if (!searchModal) return;
    searchModal.setAttribute('hidden', '');
    body.style.overflow = '';
  }
  $$('[data-action="open-search"]').forEach(function (b) { b.addEventListener('click', openSearch); });
  $$('[data-action="close-search"]').forEach(function (b) { b.addEventListener('click', closeSearch); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeMobile(); }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); openSearch();
    }
  });

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    var safe = escapeHtml(text);
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(re, '<em>$1</em>');
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim();
      if (!q) {
        searchResults.innerHTML = '';
        if (searchEmpty) searchEmpty.setAttribute('hidden', '');
        if (searchTip) searchTip.removeAttribute('hidden');
        return;
      }
      var qLower = q.toLowerCase();
      var hits = searchData
        .map(function (p) {
          var score = 0;
          var inTitle = p.title.toLowerCase().indexOf(qLower) !== -1;
          var inExcerpt = (p.excerpt || '').toLowerCase().indexOf(qLower) !== -1;
          var inTags = (p.tags || []).join(' ').toLowerCase().indexOf(qLower) !== -1;
          if (inTitle) score += 5;
          if (inTags) score += 3;
          if (inExcerpt) score += 1;
          return { p: p, score: score };
        })
        .filter(function (h) { return h.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 18);

      if (!hits.length) {
        searchResults.innerHTML = '';
        if (searchTip) searchTip.setAttribute('hidden', '');
        if (searchEmpty) searchEmpty.removeAttribute('hidden');
        return;
      }
      if (searchEmpty) searchEmpty.setAttribute('hidden', '');
      if (searchTip) searchTip.setAttribute('hidden', '');
      searchResults.innerHTML = hits.map(function (h) {
        return '<li data-link="' + escapeHtml(h.p.link) + '"><div class="title">' + highlight(h.p.title, q) + '</div><div class="excerpt">' + highlight(h.p.excerpt || '', q) + '</div></li>';
      }).join('');
    });
    searchResults.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (li && li.dataset.link) location.href = li.dataset.link;
    });
  }

  /* ------ 11. 客户端 TOC（仅 post 页） ------ */
  function initTOC() {
    if (!CFG.tocEnable) return;
    var article = $('.article-container.post-content');
    var aside = $('#toc-aside');
    var list = $('#toc-list');
    var asideToggleBtn = $('#rightside-toc');
    if (!article || !list) return;
    var heads = $$('h2, h3, h4', article);
    if (!heads.length) return;
    var items = [];
    heads.forEach(function (h, i) {
      var id = h.id || 'liushen-h-' + i;
      h.id = id;
      var lvl = parseInt(h.tagName.substring(1), 10);
      var li = document.createElement('li');
      li.className = 'toc-level-' + lvl;
      li.innerHTML = '<a href="#' + id + '">' + escapeHtml(h.textContent) + '</a>';
      list.appendChild(li);
      items.push({ id: id, top: 0, li: li });
    });
    function refresh() {
      items.forEach(function (it) {
        var el = document.getElementById(it.id);
        it.top = el ? el.getBoundingClientRect().top + window.pageYOffset : 0;
      });
    }
    refresh();
    window.addEventListener('resize', refresh);
    if (aside) aside.removeAttribute('hidden');
    if (asideToggleBtn) {
      asideToggleBtn.removeAttribute('hidden');
      asideToggleBtn.addEventListener('click', function () {
        if (aside) aside.toggleAttribute('hidden');
      });
    }
    window._liushenTocItems = items;
  }
  function updateTocActive(y) {
    var items = window._liushenTocItems || [];
    var current = null;
    for (var i = 0; i < items.length; i++) {
      if (y + 90 >= items[i].top) current = items[i]; else break;
    }
    items.forEach(function (it) { it.li.classList.remove('toc-active'); });
    if (current) current.li.classList.add('toc-active');
  }
  initTOC();

  /* ------ 12. 代码块复制按钮 ------ */
  function initCodeCopy() {
    if (!CFG.codeCopy) return;
    $$('article .post-content pre').forEach(function (pre) {
      if (pre.querySelector('.code-copy')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.textContent = '复制';
      pre.appendChild(btn);
      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        var text = code ? code.innerText : pre.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { btn.textContent = '已复制'; setTimeout(function () { btn.textContent = '复制'; }, 1500); });
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); btn.textContent = '已复制'; setTimeout(function () { btn.textContent = '复制'; }, 1500); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    });
  }
  initCodeCopy();

  /* ------ 13. 文章详情上下篇 + 相关推荐（用 search-index 推断） ------ */
  function initPostNav() {
    if (!body.classList.contains('page-post')) return;
    if (!searchData.length) return;
    var current = $('.post-detail') ? $('.post-detail').dataset.link : (CFG.currentLink || '');
    if (!current) return;
    var idx = -1;
    for (var i = 0; i < searchData.length; i++) {
      if (searchData[i].link === current) { idx = i; break; }
    }
    if (idx < 0) return;
    // 注意：search-index 是按 posts 数组顺序（默认日期降序），所以 next = idx + 1，prev = idx - 1
    var newer = idx > 0 ? searchData[idx - 1] : null;  // 更新的（"上一篇"）
    var older = idx < searchData.length - 1 ? searchData[idx + 1] : null; // 更老的（"下一篇"）
    var prevEl = $('.post-nav-item.prev');
    var nextEl = $('.post-nav-item.next');
    if (prevEl && newer) {
      prevEl.href = newer.link;
      prevEl.querySelector('.title').textContent = newer.title;
      prevEl.removeAttribute('hidden');
    }
    if (nextEl && older) {
      nextEl.href = older.link;
      nextEl.querySelector('.title').textContent = older.title;
      nextEl.removeAttribute('hidden');
    }

    // 相关推荐：同标签优先，最多 4 条
    var post = searchData[idx];
    var related = $('#related-posts');
    var listEl = $('#related-posts-list');
    if (!related || !listEl) return;
    var hasTags = (post.tags || []).length > 0;
    var pool = [];
    if (hasTags) {
      var ts = post.tags;
      pool = searchData
        .filter(function (p, i2) { return i2 !== idx && (p.tags || []).some(function (t) { return ts.indexOf(t) !== -1; }); })
        .slice(0, 4);
    }
    if (pool.length < 4) {
      var fillNeed = 4 - pool.length;
      var pickedLinks = pool.map(function (p) { return p.link; });
      var rest = searchData.filter(function (p, i2) { return i2 !== idx && pickedLinks.indexOf(p.link) === -1; });
      pool = pool.concat(rest.slice(0, fillNeed));
    }
    if (pool.length) {
      listEl.innerHTML = pool.map(function (p) {
        return '<a href="' + escapeHtml(p.link) + '"><strong>' + escapeHtml(p.title) + '</strong><br><small>' + escapeHtml(p.date) + '</small></a>';
      }).join('');
      related.removeAttribute('hidden');
    }
  }
  initPostNav();

  /* ------ 14. 闪念热力图（完全照搬 chatgpt 主题实现：嵌套 grid + 动态周数，方块不溢出） ------ */
  function initHeatmap() {
    if (!CFG.heatmapEnable) return;
    var grid = $('#heatmap-grid');
    var monthsRow = $('#heatmap-months');
    if (!grid) return;

    // 收集 memo 日期（优先 data-date-iso，回退 data-date，最后回退 memo-date 元素文本）
    var items = $$('.memo-item');
    var counts = {};
    items.forEach(function (item) {
      var raw = item.getAttribute('data-date-iso') || item.getAttribute('data-date') || '';
      if (!raw) {
        var t = item.querySelector('time.memo-date');
        if (t) raw = t.textContent || '';
      }
      if (!raw) return;
      var d = new Date(raw);
      if (isNaN(d.getTime())) {
        var match = String(raw).match(/(\d{4})[-\/年.](\d{1,2})[-\/月.](\d{1,2})/);
        if (match) d = new Date(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10));
      }
      if (isNaN(d.getTime())) return;
      var y = d.getFullYear();
      var mo = String(d.getMonth() + 1).padStart(2, '0');
      var da = String(d.getDate()).padStart(2, '0');
      var key = y + '-' + mo + '-' + da;
      counts[key] = (counts[key] || 0) + 1;
    });

    var MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var GAP = 3;
    var CELL_MIN = 7; // 照搬 chatgpt：格子最小可读宽度

    function render() {
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      // ---------- 照搬 chatgpt：容器能放下几周就显示最近几周，上限 53、下限 4 ----------
      var avail = grid.clientWidth || 0;
      var fitWeeks = Math.floor((avail + GAP) / (CELL_MIN + GAP));
      var totalWeeks = Math.max(4, Math.min(53, fitWeeks));
      // ---------- 照搬 chatgpt：总天数、起始日期对齐（对齐到周日） ----------
      var totalDays = (totalWeeks - 1) * 7 + today.getDay() + 1;
      var startDate = new Date(today);
      startDate.setDate(startDate.getDate() - totalDays + 1);
      startDate.setDate(startDate.getDate() - startDate.getDay()); // 对齐到周日

      // ---------- 照搬 chatgpt：两列 grid 模板完全一致 ----------
      grid.style.gridTemplateColumns = 'repeat(' + totalWeeks + ', minmax(0, 1fr))';
      monthsRow.style.gridTemplateColumns = 'repeat(' + totalWeeks + ', minmax(0, 1fr))';

      var gridHtml = '';
      var monthHtml = '';
      var lastMonth = -1;

      // ---------- 照搬 chatgpt：外层按「周」循环，每一列用 <span class="heatmap-week"> 包裹 7 个 cell ----------
      for (var w = 0; w < totalWeeks; w++) {
        var colHtml = '';
        var firstOfWeek = new Date(startDate);
        firstOfWeek.setDate(firstOfWeek.getDate() + w * 7);
        if (firstOfWeek <= today && firstOfWeek.getMonth() !== lastMonth) {
          monthHtml += '<span class="heatmap-month">' + MONTHS[firstOfWeek.getMonth()] + '</span>';
          lastMonth = firstOfWeek.getMonth();
        } else {
          monthHtml += '<span></span>';
        }
        for (var d = 0; d < 7; d++) {
          var cellDate = new Date(startDate);
          cellDate.setDate(cellDate.getDate() + w * 7 + d);
          var y = cellDate.getFullYear();
          var mo = String(cellDate.getMonth() + 1).padStart(2, '0');
          var da = String(cellDate.getDate()).padStart(2, '0');
          var key = y + '-' + mo + '-' + da;
          var count = counts[key] || 0;
          var level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;
          if (cellDate > today) {
            colHtml += '<i class="heatmap-cell" data-level="-1"></i>';
          } else {
            colHtml += '<i class="heatmap-cell" data-level="' + level + '" title="' + key + '：' + count + ' 条闪念"></i>';
          }
        }
        gridHtml += '<span class="heatmap-week">' + colHtml + '</span>';
      }

      grid.innerHTML = gridHtml;
      monthsRow.innerHTML = monthHtml;
    }
    render();

    // ---------- 照搬 chatgpt：resize 防抖 ----------
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });
  }
  initHeatmap();

  /* ------ 15. 网站统计 - 运行天数 ------ */
  function initRuntime() {
    var since = $('#webinfo-runtime');
    if (!since) return;
    var s = new Date(since.dataset.since || '2024-01-01');
    if (isNaN(s.getTime())) return;
    var diff = Math.max(0, Math.floor((Date.now() - s.getTime()) / 86400000));
    since.textContent = diff;
    var aside = $('#card-info-runtime');
    if (aside) aside.textContent = diff;
  }
  initRuntime();

  /* ------ 15b. 网站统计 - 全站文章总数（跨页一致） ------
     模板层拿到的 posts 只是「当前页面」的：首页第 1 页 10 篇、第 2 页 3 篇、
     标签页只有该标签的 1 篇 —— 所以侧栏那个「文章」会随手翻页 / 落地页变来变去。
     做法借鉴 weibo 主题：数字交给客户端，用引擎构建时生成的站级索引
     /api/search.json（内容 = 全站可见文章，条数与归档页一致）算总数。
     模板仍渲染一个兜底值（partials/site-post-count.html），
     所以禁 JS / 请求失败时不会掉成 "--"；session 内再缓存一次，翻页时数字不跳动。 */
  function initPostCount() {
    var els = $$('[data-site-post-count]');
    if (!els.length) return;
    var KEY = 'liushen-post-count';
    var paint = function (n) {
      els.forEach(function (el) { el.textContent = n; });
    };
    var cached = null;
    try { cached = sessionStorage.getItem(KEY); } catch (e) {}
    if (cached) paint(cached);            // 同一次会话里翻页：直接上缓存，先渲染为快

    if (!window.fetch) return;            // 老浏览器：保留模板兜底值
    fetch('/api/search.json', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!Array.isArray(d) || !d.length) return;
        paint(d.length);
        try { sessionStorage.setItem(KEY, String(d.length)); } catch (e) {}
      })
      .catch(function () {});
  }
  initPostCount();

  /* ------ 16. 随机文章 ------ */
  $$('[data-action="random-post"]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!searchData.length) { alert('暂无文章可跳转'); return; }
      var pick = searchData[Math.floor(Math.random() * searchData.length)];
      if (pick && pick.link) location.href = pick.link;
    });
  });

  /* ------ 17. busuanzi 容器自动显示 ------ */
  function pollBusuanzi() {
    var uv = $('#busuanzi_value_site_uv');
    var pv = $('#busuanzi_value_site_pv');
    if (uv && uv.textContent && uv.textContent !== '--') {
      var w1 = $('#webinfo-busuanzi'); if (w1) w1.removeAttribute('hidden');
    }
    if (pv && pv.textContent && pv.textContent !== '--') {
      var w2 = $('#webinfo-busuanzi-pv'); if (w2) w2.removeAttribute('hidden');
    }
  }
  setTimeout(pollBusuanzi, 1500);
  setTimeout(pollBusuanzi, 4000);

  /* ------ 18. {YEAR} 占位替换（footerCopyright） ------ */
  $$('.footer-copyright').forEach(function (el) {
    el.innerHTML = el.innerHTML.replace(/\{YEAR\}/g, new Date().getFullYear());
  });

  /* ------ 21. 文章图片宫格布局（基于 HTML 注释标记） ------ */
  function initImageGrid() {
    var article = $('.article-container.post-content');
    if (!article) return;

    // 扫描所有 HTML 注释节点
    function findComments(root) {
      var comments = [];
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null);
      var node;
      while ((node = walker.nextNode())) {
        comments.push(node);
      }
      return comments;
    }

    // 获取注释内容并解析
    function parseDirective(text) {
      text = text.trim();
      // <!-- grid:3 --> => { type: 'grid', cols: 3 }
      var gridMatch = text.match(/^grid[:：]\s*(\d+)/i);
      if (gridMatch) return { type: 'grid', cols: parseInt(gridMatch[1], 10) };
      // <!-- row:2 --> => { type: 'row', cols: 2 }
      var rowMatch = text.match(/^row[:：]\s*(\d+)/i);
      if (rowMatch) return { type: 'row', cols: parseInt(rowMatch[1], 10) };
      // <!-- /grid --> => { type: 'end' }
      if (/^\/?grid$/i.test(text)) return { type: 'end' };
      return null;
    }

    // 找到所有 grid 块
    function findGridBlocks() {
      var comments = findComments(article);
      var blocks = [];
      var currentBlock = null;

      comments.forEach(function (comment) {
        var directive = parseDirective(comment.textContent);
        if (!directive) return;

        if (directive.type === 'grid') {
          currentBlock = {
            startMarker: comment,
            rows: [],
            currentRow: { cols: directive.cols, images: [] }
          };
        } else if (directive.type === 'row' && currentBlock) {
          // 直接添加当前行到 rows（图片收集在 processGrids 中进行）
          currentBlock.rows.push(currentBlock.currentRow);
          currentBlock.currentRow = { cols: directive.cols, images: [] };
        } else if (directive.type === 'end' && currentBlock) {
          // 添加最后一行
          currentBlock.rows.push(currentBlock.currentRow);
          currentBlock.endMarker = comment;
          blocks.push(currentBlock);
          currentBlock = null;
        }
      });

      return blocks;
    }

    // 收集两个节点之间的所有 <img> 标签（包括子元素中的）
    function collectImagesBetween(startNode, endNode) {
      var images = [];
      var node = startNode.nextSibling;
      // 收集范围：startNode 之后到 endNode 之前的所有节点
      var rangeNodes = [];
      
      // 先收集范围内的所有节点
      while (node) {
        if (node === endNode) break;
        if (node.nodeType === Node.ELEMENT_NODE) {
          rangeNodes.push(node);
        }
        node = node.nextSibling;
      }
      
      // 从范围内的所有元素中提取 img
      rangeNodes.forEach(function (el) {
        // 排除评论头像
        if (el.closest && (el.closest('.tk-avatar') || el.closest('.tk-head'))) return;
        
        if (el.tagName === 'IMG') {
          images.push(el);
        } else {
          // 递归查找内部的 img
          var imgs = el.querySelectorAll('img');
          imgs.forEach(function (img) {
            if (!img.closest('.tk-avatar') && !img.closest('.tk-head')) {
              images.push(img);
            }
          });
        }
      });
      
      return images;
    }

    // 存储所有需要动态布局的行（用于 resize 时重新计算）
    var allDynamicRows = [];
    var resizeTimer = null;
    var resizeObserver = null;

    // 窗口大小变化时重新计算所有行（带节流）
    function handleResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (allDynamicRows.length > 0) {
          var articleContainer = document.querySelector('.article-container.post-content');
          var containerWidth = articleContainer ? articleContainer.clientWidth : 0;
          if (containerWidth > 0) {
            allDynamicRows.forEach(function (rowInfo) {
              layoutRow(rowInfo.rowContainer, rowInfo.items, containerWidth);
            });
          }
        }
      }, 100); // 100ms 节流
    }

    window.addEventListener('resize', handleResize);

    // 使用 ResizeObserver 监听容器尺寸变化（更精确）
    function setupResizeObserver() {
      var articleContainer = document.querySelector('.article-container.post-content');
      if (!articleContainer) return;
      
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(function () {
          handleResize();
        });
        resizeObserver.observe(articleContainer);
      }
    }

    // 动态缩放算法：统一高度 + 等比例放大填满整行
    function layoutRow(rowContainer, items, containerWidth) {
      if (items.length === 0 || containerWidth <= 0) return;
      
      var gap = 8; // 与 CSS 保持一致
      var numImages = items.length;
      
      // 1. 获取每张图片的宽高比
      var aspectRatios = [];
      var allLoaded = true;
      var hasOrigRatio = false;
      
      items.forEach(function (itemInfo) {
        var img = itemInfo.img;
        var isOrigRatio = itemInfo.isOrigRatio;
        
        if (isOrigRatio) hasOrigRatio = true;
        
        if (img.complete && img.naturalWidth > 0) {
          if (isOrigRatio) {
            // ~ 图片：使用原始宽高比
            aspectRatios.push(img.naturalWidth / img.naturalHeight);
          } else {
            // 普通图片：1:1
            aspectRatios.push(1);
          }
        } else {
          allLoaded = false;
          aspectRatios.push(1); // 临时值
        }
      });
      
      // 如果还有图片未加载，延迟重试
      if (!allLoaded) {
        return false;
      }
      
      // 特殊情况：单张无~图片，直接占满整行
      if (numImages === 1 && !hasOrigRatio) {
        var size = containerWidth;
        var itemEls = rowContainer.querySelectorAll('.image-grid-item');
        if (itemEls.length > 0) {
          itemEls[0].style.width = size + 'px';
          itemEls[0].style.height = size + 'px';
        }
        rowContainer.style.height = size + 'px';
        return true;
      }
      
      // 2. 假设基准高度 H
      var H = 200; // 任意起始值
      
      // 3. 计算每张图片在基准高度下的宽度
      var widths = aspectRatios.map(function (ar) { return H * ar; });
      
      // 4. 计算总宽度（包含 gap）
      var totalWidth = widths.reduce(function (a, b) { return a + b; }, 0) + gap * (numImages - 1);
      
      // 5. 计算缩放系数
      var scale = containerWidth / totalWidth;
      
      // 6. 应用缩放
      var finalHeight = H * scale;
      var minHeight = 60; // 最小高度限制
      var maxHeight = 500; // 最大高度限制
      
      // 限制高度范围后重新计算
      if (finalHeight < minHeight) {
        finalHeight = minHeight;
        scale = finalHeight / H;
      }
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        scale = finalHeight / H;
      }
      
      // 7. 应用最终尺寸到每个容器
      var itemEls = rowContainer.querySelectorAll('.image-grid-item');
      itemEls.forEach(function (el, idx) {
        if (idx < items.length) {
          var finalWidth = widths[idx] * scale;
          el.style.width = finalWidth + 'px';
          el.style.height = finalHeight + 'px';
        }
      });
      
      // 设置行容器高度
      rowContainer.style.height = finalHeight + 'px';
      
      return true;
    }

    // 处理需要动态缩放的行
    function processDynamicRows(rowsToSync) {
      var articleContainer = document.querySelector('.article-container.post-content');
      var containerWidth = articleContainer ? articleContainer.clientWidth : 0;
      
      if (containerWidth === 0) {
        // 容器还没准备好，延迟重试
        setTimeout(function () { processDynamicRows(rowsToSync); }, 100);
        return;
      }
      
      rowsToSync.forEach(function (rowInfo) {
        layoutRow(rowInfo.rowContainer, rowInfo.items, containerWidth);
      });
      
      // 累加保存引用用于 resize（而不是覆盖）
      rowsToSync.forEach(function (rowInfo) {
        if (allDynamicRows.indexOf(rowInfo) === -1) {
          allDynamicRows.push(rowInfo);
        }
      });
      
      // 设置容器尺寸监听
      setupResizeObserver();
    }

    // 处理所有 grid 块
    function processGrids() {
      var blocks = findGridBlocks();
      if (!blocks.length) return;

      blocks.forEach(function (block, blockIdx) {
        var startMarker = block.startMarker;
        var endMarker = block.endMarker;
        if (!endMarker) {
          console.log('[ImageGrid] Block ' + blockIdx + ': no endMarker, skipping');
          return;
        }

        // 收集 startMarker 到 endMarker 之间的所有图片
        var allImages = collectImagesBetween(startMarker, endMarker);
        console.log('[ImageGrid] Block ' + blockIdx + ': collected', allImages.length, 'images');
        console.log('[ImageGrid] Block ' + blockIdx + ': rows config', block.rows.map(function(r){return r.cols + ' cols'}));

        // 清空并重新分配图片到各行
        block.rows.forEach(function (row) { row.images = []; });
        var imgIndex = 0;

        block.rows.forEach(function (row) {
          for (var i = 0; i < row.cols && imgIndex < allImages.length; i++) {
            row.images.push(allImages[imgIndex]);
            imgIndex++;
          }
        });

        // 如果还有剩余图片，自动补齐到最后一行
        if (imgIndex < allImages.length && block.rows.length > 0) {
          var lastRow = block.rows[block.rows.length - 1];
          while (imgIndex < allImages.length) {
            lastRow.images.push(allImages[imgIndex]);
            imgIndex++;
          }
        }

        console.log('[ImageGrid] Block ' + blockIdx + ': final row counts', block.rows.map(function(r){return r.images.length + ' images in ' + r.cols + ' cols'}));

        // 创建网格容器
        var gridContainer = document.createElement('div');
        gridContainer.className = 'image-grid-container';

        // 存储所有行的信息（用于动态缩放）
        var rowsToSync = [];

        block.rows.forEach(function (row) {
          if (row.images.length === 0) return;
          var rowContainer = document.createElement('div');
          rowContainer.className = 'image-grid-row';

          // 收集这一行的所有图片信息
          var rowItems = [];
          
          row.images.forEach(function (img) {
            var wrapper = document.createElement('div');
            wrapper.className = 'image-grid-item';
            
            // 检测 alt 属性中的 ~ 标记
            var altText = img.getAttribute('alt') || '';
            var isOrigRatio = false;
            
            if (altText.indexOf('~') !== -1) {
              isOrigRatio = true;
              wrapper.classList.add('orig-ratio');
              // 清除 alt 中的标记
              img.setAttribute('alt', altText.replace(/~/g, '').trim());
            }
            
            rowItems.push({ img: img, isOrigRatio: isOrigRatio });
            
            if (img.parentNode) {
              img.parentNode.removeChild(img);
            }
            wrapper.appendChild(img);
            rowContainer.appendChild(wrapper);
          });

          gridContainer.appendChild(rowContainer);
          
          // 记录行信息用于动态布局
          rowsToSync.push({
            rowContainer: rowContainer,
            items: rowItems
          });
        });

        // 图片加载完成后执行动态缩放
        if (rowsToSync.length > 0) {
          // 先插入 DOM，再计算尺寸
          startMarker.parentNode.insertBefore(gridContainer, startMarker);
          
          // 等待图片加载完成
          var allImages = [];
          rowsToSync.forEach(function (rowInfo) {
            rowInfo.items.forEach(function (item) {
              allImages.push(item.img);
            });
          });
          
          var loadCheck = function () {
            var allLoaded = allImages.every(function (img) { return img.complete; });
            if (allLoaded) {
              processDynamicRows(rowsToSync);
            } else {
              setTimeout(loadCheck, 100);
            }
          };
          
          // 开始检查
          loadCheck();
          
          // 兜底：500ms 后强制执行
          setTimeout(function () {
            processDynamicRows(rowsToSync);
          }, 500);
        } else {
          startMarker.parentNode.insertBefore(gridContainer, startMarker);
        }

        console.log('[ImageGrid] Block ' + blockIdx + ': gridContainer created with', gridContainer.children.length, 'rows');

        // 收集需要删除的节点
        var nodesToCheck = [];
        var node = startMarker;
        
        while (node) {
          nodesToCheck.push(node);
          if (node === endMarker) break;
          node = node.nextSibling;
        }

        // 先把 gridContainer 插入到 startMarker 位置
        startMarker.parentNode.insertBefore(gridContainer, startMarker);
        console.log('[ImageGrid] Block ' + blockIdx + ': gridContainer inserted');

        // 然后删除原节点
        nodesToCheck.forEach(function (n) {
          if (n === gridContainer) return;
          if (gridContainer.contains(n)) return;
          if (n.nodeType === Node.ELEMENT_NODE && n !== gridContainer) {
            if (n.parentNode) n.parentNode.removeChild(n);
          } else if (n.nodeType === Node.COMMENT_NODE) {
            if (n.parentNode) n.parentNode.removeChild(n);
          } else if (n.nodeType === Node.TEXT_NODE) {
            if (!n.textContent.trim() && n.parentNode) {
              n.parentNode.removeChild(n);
            }
          }
        });

        console.log('[ImageGrid] Block ' + blockIdx + ': cleaned up, gridContainer exists:', !!document.querySelector('.image-grid-container'));
      });
    }

    // 在 DOMContentLoaded 之前或之后执行
    function startProcessing() {
      console.log('[ImageGrid] Starting grid processing...');
      var blocks = findGridBlocks();
      console.log('[ImageGrid] Found blocks:', blocks.length);
      if (blocks.length > 0) {
        blocks.forEach(function (b, i) {
          console.log('[ImageGrid] Block ' + i + ':', { rows: b.rows.length, cols: b.rows.map(function(r){return r.cols;}) });
        });
      }
      processGrids();
      console.log('[ImageGrid] Processing complete.');
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startProcessing);
    } else {
      startProcessing();
    }
    
    // 延迟重试一次（确保所有内容都已渲染）
    setTimeout(function() {
      if (!document.querySelector('.image-grid-container')) {
        console.log('[ImageGrid] Retrying after delay...');
        processGrids();
      }
    }, 500);
  }
  initImageGrid();

  /* ------ 20. 文章图片点击放大预览 ------ */
  function initImageViewer() {
    var article = $('.article-container.post-content');
    if (!article) return;

    var viewer = null;
    var viewerImg = null;
    var images = [];
    var currentIndex = 0;
    var scale = 1;
    var translateX = 0;
    var translateY = 0;
    var isDragging = false;
    var startX = 0;
    var startY = 0;
    var startTranslateX = 0;
    var startTranslateY = 0;

    function collectImages() {
      images = $$('img', article).filter(function (img) {
        // 排除表情、头像等非正文图片
        return !img.closest('.tk-avatar') && 
               !img.closest('.tk-head') && 
               !img.closest('pre') &&
               img.src && !img.src.endsWith('.svg') || img.getAttribute('src');
      });
    }

    function createViewer() {
      viewer = document.createElement('div');
      viewer.className = 'image-viewer';
      viewer.innerHTML = 
        '<img class="image-viewer-img" alt="">' +
        '<button class="image-viewer-close" aria-label="关闭">&times;</button>' +
        '<button class="image-viewer-nav image-viewer-prev" aria-label="上一张">&#10094;</button>' +
        '<button class="image-viewer-nav image-viewer-next" aria-label="下一张">&#10095;</button>' +
        '<div class="image-viewer-info">' +
          '<span class="counter"></span>' +
          '<span class="caption"></span>' +
        '</div>' +
        '<div class="image-viewer-hint">ESC 关闭 · ← → 切换 · 滚轮缩放 · 拖拽移动</div>';
      document.body.appendChild(viewer);

      viewerImg = viewer.querySelector('.image-viewer-img');
      
      // 关闭按钮
      viewer.querySelector('.image-viewer-close').addEventListener('click', closeViewer);
      
      // 点击背景关闭
      viewer.addEventListener('click', function (e) {
        if (e.target === viewer) closeViewer();
      });

      // 左右切换
      viewer.querySelector('.image-viewer-prev').addEventListener('click', function (e) {
        e.stopPropagation();
        prevImage();
      });
      viewer.querySelector('.image-viewer-next').addEventListener('click', function (e) {
        e.stopPropagation();
        nextImage();
      });

      // 鼠标滚轮缩放
      viewer.addEventListener('wheel', function (e) {
        e.preventDefault();
        var delta = e.deltaY > 0 ? -0.1 : 0.1;
        var newScale = Math.min(Math.max(scale + delta, 0.5), 5);
        zoomTo(newScale);
      }, { passive: false });

      // 双击切换缩放
      viewerImg.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        if (scale === 1) {
          zoomTo(2);
        } else {
          resetZoom();
        }
      });

      // 拖拽移动（放大状态下）
      viewerImg.addEventListener('mousedown', function (e) {
        if (scale <= 1) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startTranslateX = translateX;
        startTranslateY = translateY;
        viewerImg.classList.add('dragging');
        e.preventDefault();
      });

      document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        translateX = startTranslateX + (e.clientX - startX);
        translateY = startTranslateY + (e.clientY - startY);
        updateTransform();
      });

      document.addEventListener('mouseup', function () {
        if (isDragging) {
          isDragging = false;
          viewerImg.classList.remove('dragging');
        }
      });

      // 图片点击切换缩放
      viewerImg.addEventListener('click', function (e) {
        e.stopPropagation();
        if (scale === 1) {
          zoomTo(2);
        } else {
          resetZoom();
        }
      });

      // 触摸支持
      var touchStartX = 0;
      var touchStartY = 0;
      var touchStartScale = 1;
      var lastTouchDist = 0;

      viewer.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          startTranslateX = translateX;
          startTranslateY = translateY;
        } else if (e.touches.length === 2) {
          e.preventDefault();
          lastTouchDist = getTouchDistance(e.touches);
          touchStartScale = scale;
        }
      }, { passive: false });

      viewer.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1 && scale > 1) {
          e.preventDefault();
          translateX = startTranslateX + (e.touches[0].clientX - touchStartX);
          translateY = startTranslateY + (e.touches[0].clientY - touchStartY);
          updateTransform();
        } else if (e.touches.length === 2) {
          e.preventDefault();
          var dist = getTouchDistance(e.touches);
          var newScale = Math.min(Math.max(touchStartScale * (dist / lastTouchDist), 0.5), 5);
          zoomTo(newScale);
        }
      }, { passive: false });

      viewer.addEventListener('touchend', function (e) {
        if (e.changedTouches.length === 1 && e.touches.length === 0) {
          // 单击关闭
          var dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
          var dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
          if (dx < 10 && dy < 10 && scale === 1) {
            // 只是单击，不关闭
          }
        }
      });

      function getTouchDistance(touches) {
        var dx = touches[0].clientX - touches[1].clientX;
        var dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }

    function openViewer(index) {
      collectImages();
      if (!images.length) return;
      
      currentIndex = Math.max(0, Math.min(index || 0, images.length - 1));
      
      if (!viewer) createViewer();
      
      var img = images[currentIndex];
      viewerImg.src = img.src;
      viewerImg.alt = img.alt || '';
      
      viewer.classList.add('active');
      body.style.overflow = 'hidden';
      
      resetZoom();
      updateInfo();
    }

    function closeViewer() {
      if (!viewer) return;
      viewer.classList.remove('active');
      body.style.overflow = '';
      
      setTimeout(function () {
        if (viewer && !viewer.classList.contains('active')) {
          viewerImg.src = '';
        }
      }, 300);
    }

    function prevImage() {
      if (currentIndex > 0) {
        currentIndex--;
        openViewer(currentIndex);
      }
    }

    function nextImage() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        openViewer(currentIndex);
      }
    }

    function zoomTo(newScale) {
      scale = newScale;
      if (scale > 1) {
        viewerImg.classList.add('zoomed');
      } else {
        viewerImg.classList.remove('zoomed');
        translateX = 0;
        translateY = 0;
      }
      updateTransform();
    }

    function resetZoom() {
      scale = 1;
      translateX = 0;
      translateY = 0;
      viewerImg.classList.remove('zoomed');
      updateTransform();
    }

    function updateTransform() {
      if (viewerImg) {
        viewerImg.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scale + ')';
      }
    }

    function updateInfo() {
      var info = viewer.querySelector('.image-viewer-info');
      var counter = viewer.querySelector('.counter');
      var caption = viewer.querySelector('.caption');
      
      counter.textContent = (currentIndex + 1) + ' / ' + images.length;
      
      var img = images[currentIndex];
      caption.textContent = img.alt || '';
      caption.style.display = img.alt ? 'block' : 'none';
      
      // 更新导航按钮状态
      viewer.querySelector('.image-viewer-prev').disabled = currentIndex === 0;
      viewer.querySelector('.image-viewer-next').disabled = currentIndex === images.length - 1;
    }

    // 事件委托：监听文章中的图片点击
    article.addEventListener('click', function (e) {
      var img = e.target.closest('img');
      if (!img) return;
      
      // 排除头像、表情等
      if (img.closest('.tk-avatar') || img.closest('.tk-head')) return;
      
      var index = images.indexOf(img);
      if (index === -1) {
        // 重新收集图片并查找
        collectImages();
        index = images.indexOf(img);
      }
      
      if (index !== -1) {
        openViewer(index);
      }
    });

    // 键盘事件
    document.addEventListener('keydown', function (e) {
      if (!viewer || !viewer.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeViewer();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === '+' || e.key === '=') {
        zoomTo(Math.min(scale + 0.2, 5));
      } else if (e.key === '-' || e.key === '_') {
        zoomTo(Math.max(scale - 0.2, 0.5));
      } else if (e.key === '0') {
        resetZoom();
      }
    });
  }
  initImageViewer();

  /* ------ 19. 外链跳转风险提示（模态框） ------ */
  function initLinkOut() {
    if (!CFG.linkOutEnable) return;
    var siteDomain = window.location.hostname;
    var modal = null;
    var targetUrl = null;
    var lastFocused = null;   // 关闭弹窗后把焦点还给触发它的链接
    
    // 解析白名单（支持换行符和逗号分隔）
    // 条目兼容两种写法：裸域名（github.com）与完整网址（https://qr.alipay.com/xxx?y=1）
    // 后者必须先收敛成 hostname，否则 hostname 比对永远不相等 → 白名单形同虚设。
    var whitelist = [];
    if (CFG.linkOutWhitelist) {
      whitelist = String(CFG.linkOutWhitelist).split(/[\n,]+/).map(function (d) {
        return d.trim().toLowerCase()
          .replace(/^[a-z][a-z0-9+.-]*:\/\//, '') // 去掉协议头
          .split('/')[0]                          // 去掉路径与查询串
          .split(':')[0]                          // 去掉端口
          .replace(/^\.+/, '');                   // 去掉前导点
      }).filter(Boolean);
    }
    
    // 检查域名是否在白名单中
    function isWhitelisted(hostname) {
      hostname = hostname.toLowerCase();
      for (var i = 0; i < whitelist.length; i++) {
        var domain = whitelist[i];
        // 支持子域名匹配：github.com 匹配 xxx.github.com
        if (hostname === domain || hostname.endsWith('.' + domain)) {
          return true;
        }
      }
      return false;
    }
    
    /* 弹窗结构：左对齐的「图标 + 标题 + 副题」头 / 正文说明 / 目标地址 / 按钮组。
       标题行沿用 .item-headline 的视觉语言，按钮沿用站内 999px 胶囊 +
       --primary 实心主按钮；文案取官方书面语，站点名读 CFG.siteName。 */
    function createModal() {
      modal = document.createElement('div');
      modal.className = 'link-out-overlay';
      var site = escapeHtml(CFG.siteName || '本站');
      modal.innerHTML =
        '<div class="link-out-modal" role="dialog" aria-modal="true"' +
             ' aria-labelledby="link-out-title" aria-describedby="link-out-desc">' +
          '<div class="link-out-head">' +
            '<span class="link-out-icon"><i class="fa-solid fa-triangle-exclamation"></i></span>' +
            '<div class="link-out-heading">' +
              '<h2 class="link-out-title" id="link-out-title">即将离开本站</h2>' +
              '<p class="link-out-kicker">外部链接安全提示</p>' +
            '</div>' +
          '</div>' +
          '<p class="link-out-desc" id="link-out-desc">' +
            '您即将离开「' + site + '」，前往本站之外的第三方网站。' +
            '该网站不受本站控制，本站无法核实其内容的真实性与安全性，' +
            '亦不对其隐私政策及后续行为承担责任。请您谨慎辨别，注意保护个人账号与财产安全。' +
          '</p>' +
          '<div class="link-out-url">' +
            '<span class="url-label"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>目标地址</span>' +
            '<span class="url-domain" id="link-out-url-domain"></span>' +
            '<span class="url-value" id="link-out-url-value"></span>' +
          '</div>' +
          '<div class="link-out-actions">' +
            '<button type="button" class="btn btn-cancel" id="link-out-cancel">返回本站</button>' +
            '<button type="button" class="btn btn-confirm" id="link-out-confirm">继续访问</button>' +
          '</div>' +
        '</div>';
      
      document.body.appendChild(modal);
      
      modal.querySelector('#link-out-cancel').addEventListener('click', closeModal);
      modal.querySelector('#link-out-confirm').addEventListener('click', function() {
        if (targetUrl) {
          window.open(targetUrl, '_blank', 'noopener');
          closeModal();
        }
      });
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', onEsc);
        }
      });
    }
    
    function openModal(url) {
      targetUrl = url;
      if (!modal) createModal();
      var host = '';
      try { host = new URL(url).hostname; } catch (err) { host = ''; }
      var domainEl = modal.querySelector('#link-out-url-domain');
      domainEl.textContent = host;
      domainEl.hidden = !host;   // 解析不出域名时不留空行
      modal.querySelector('#link-out-url-value').textContent = url;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      lastFocused = document.activeElement;
      var cancelBtn = modal.querySelector('#link-out-cancel');
      if (cancelBtn) cancelBtn.focus();   // 默认焦点落在安全选项上
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
      targetUrl = null;
      if (lastFocused && lastFocused.isConnected !== false &&
          typeof lastFocused.focus === 'function') {
        try { lastFocused.focus(); } catch (err) {}
      }
      // 兜底：焦点仍留在弹窗内的按钮上（触发元素已移除 / 不接受 focus）时交还文档
      if (modal.contains(document.activeElement) &&
          typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
      lastFocused = null;
    }
    
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.href;
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      
      try {
        var url = new URL(href);
        if (url.hostname && url.hostname !== siteDomain) {
          // 检查白名单
          if (isWhitelisted(url.hostname)) {
            return; // 白名单域名，不提示
          }
          e.preventDefault();
          openModal(href);
        }
      } catch (err) {
        // 不是有效 URL，可能是相对路径，忽略
      }
    });
  }
  initLinkOut();

  /* ------ 22. 邮箱订阅表单补全（侧栏订阅卡） ------
     第三方（follow.it 等）真正专有的只有「接口地址」——follow.it 官方文档明确写着
     邮箱输入框的 name 必须是 email，也就是说输入框和按钮本就该由主题提供。
     三种贴法统一在这里收口：
       ① 完整表单（邮箱框 + 提交钮都自带）→ 一律不动，尊重第三方原样
       ② 只有 <form …> 壳（缺输入框或缺按钮）→ 补 method/target，再注入缺的那部分
       ③ 只贴了 action 地址（纯文本）→ 用主题控件生成整张表单
     判据取「有没有可填控件 / 提交钮」而不是「有没有 form」：粘贴的裸 <form> 会被浏览器
     自动闭合，DOM 里 form 存在但为空，只看 form 会误判成"已完整"而补不上东西。
     ②③ 这两种「主题动过控件」的情况还会顺手接管校验（novalidate + 卡片内提示），
     把浏览器原生的「请填写此字段。」浮层换掉；① 的原样表单不动它。 */
  function initSubscribeForm() {
    var FIELD_SEL = 'input[type="email"], input[type="text"], input[type="tel"], input[type="url"], input[type="search"], input:not([type]), textarea';
    var SUBMIT_SEL = 'button:not([type="button"]), input[type="submit"], input[type="image"]';
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var msgSeq = 0;

    /* 校验提示换成站内 UI：给 form 加 novalidate 关掉浏览器那个"请填写此字段。"浮层，
       required / type=email 照旧保留（语义与无障碍提示都还在），改由这里自己校验、
       在卡片里画自己的提示 —— 提示文案同样从 data-sub-* 读，不在 JS 里硬编码。
       只在「主题动过这张表单」时接管；用户贴的完整第三方表单不碰。 */
    function useOwnUi(box, form) {
      var tipEmpty = box.getAttribute('data-sub-tip-empty') || '请输入邮箱地址';
      var tipFormat = box.getAttribute('data-sub-tip-format') || '邮箱格式不正确，请检查后重试';
      var input = null;
      Array.prototype.some.call(form.elements, function (el) {
        if (el.tagName === 'INPUT' && ['email', 'text', 'tel', 'url', 'search'].indexOf(el.type) !== -1) {
          input = el;
          return true;
        }
        return false;
      });
      if (!input) return;

      form.setAttribute('novalidate', '');
      msgSeq += 1;
      var msgId = 'subscribe-msg-' + msgSeq;
      box.insertAdjacentHTML('beforeend',
        '<p class="subscribe-msg" id="' + msgId + '" role="alert" hidden>' +
        '<i class="fa-solid fa-circle-exclamation"></i><span></span></p>');
      var msg = box.lastElementChild;
      var msgText = msg.querySelector('span');
      var described = input.getAttribute('aria-describedby');
      input.setAttribute('aria-describedby', described ? described + ' ' + msgId : msgId);

      function setState(tip) {
        msgText.textContent = tip || '';
        msg.hidden = !tip;
        if (tip) {
          box.classList.add('is-invalid');
          input.setAttribute('aria-invalid', 'true');
        } else {
          box.classList.remove('is-invalid');
          input.removeAttribute('aria-invalid');
        }
      }

      form.addEventListener('submit', function (ev) {
        var value = String(input.value || '').trim();
        var tip = '';
        if (!value) tip = tipEmpty;
        else if ((input.type === 'email' || /email/i.test(input.getAttribute('name') || '')) && !EMAIL_RE.test(value)) tip = tipFormat;
        if (tip) {
          ev.preventDefault();
          setState(tip);
          try { input.focus(); } catch (e) {}
          return;
        }
        setState('');
      });
      input.addEventListener('input', function () {
        if (box.classList.contains('is-invalid')) setState('');
      });
    }

    function fieldHtml(field, ph) {
      return '<input type="email" name="' + escapeHtml(field) + '" placeholder="' + escapeHtml(ph) +
        '" autocomplete="email" spellcheck="false" required>';
    }
    function buttonHtml(btn) {
      return '<button type="submit">' + escapeHtml(btn) + '</button>';
    }

    $$('.subscribe-form-box').forEach(function (box) {
      var field = box.getAttribute('data-sub-field') || 'email';
      var ph = box.getAttribute('data-sub-placeholder') || '你的邮箱地址';
      var btn = box.getAttribute('data-sub-button') || '订阅';
      var form = box.querySelector('form');

      if (form) {
        var hasField = !!form.querySelector(FIELD_SEL);
        var hasSubmit = !!form.querySelector(SUBMIT_SEL);
        if (hasField && hasSubmit) return;                       // ① 第三方完整表单，不碰
        if (!form.getAttribute('method')) form.setAttribute('method', 'post');
        if (!form.getAttribute('target')) form.setAttribute('target', '_blank');
        form.insertAdjacentHTML('beforeend',                     // ② 只补缺的那部分
          (hasField ? '' : fieldHtml(field, ph)) + (hasSubmit ? '' : buttonHtml(btn)));
        useOwnUi(box, form);
        return;
      }

      /* ③ 只贴了地址。要求是纯文本（不含任何标签）且能抠出 http(s) 链接才接手，
         否则用户粘贴的「无 form 的自定义 embed」（纯 div / iframe 结构）会被误改。 */
      var raw = box.innerHTML.trim();
      if (raw.indexOf('<') !== -1) return;
      var m = raw.match(/https?:\/\/[^\s"'<>]+/i);
      if (!m) return;
      box.innerHTML = '<form action="' + escapeHtml(m[0]) + '" method="post" target="_blank">' +
        fieldHtml(field, ph) + buttonHtml(btn) + '</form>';
      useOwnUi(box, box.querySelector('form'));
    });
  }
  initSubscribeForm();

})();
