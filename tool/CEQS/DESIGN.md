---
version: alpha
name: 化学方程式速查-design-analysis
description: "一套为『高密度学术检索工具』设计的中性纸感体系。底色是暖白纸 (#f7f5f0)，卡片为纯白 (#ffffff)，主墨色近黑 (#1a1917)，主色为学术深青 (#1f4e5f)。全局只保留两个色相语义：暖棕 (#a0430b) 表示『氧化 / 失电子』，冷青 (#1d5b79) 表示『还原 / 得电子』——刻意避开红绿对立，红绿色觉障碍者仍可区分。化学式一律用衬线体（Cambria → Times）呈现，正文与界面文字用无衬线体，标题用思源宋体，形成『教材正文 + 软件外框』的双层气质。所有圆角控制在 4–10px，不使用胶囊按钮作为主操作，避免工具被读成消费级 App。"
colors:
  canvas: "#f7f5f0"
  surface: "#ffffff"
  surface-sunken: "#efece4"
  surface-hover: "#faf9f5"
  ink: "#1a1917"
  ink-muted: "#565248"
  ink-subtle: "#7a7568"
  ink-inverse: "#ffffff"
  primary: "#1f4e5f"
  primary-hover: "#163c4a"
  primary-soft: "#e4ecee"
  oxidant: "#a0430b"
  reductant: "#1d5b79"
  oxidant-soft: "#f6ece3"
  reductant-soft: "#e6eef2"
  hairline: "#e2ddd1"
  hairline-strong: "#cac4b4"
  selected: "#1a1917"
typography:
  display-sm:
    fontFamily: Noto Serif SC, Source Han Serif SC, Songti SC, Georgia, serif
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.2px
  title-md:
    fontFamily: Noto Serif SC, Source Han Serif SC, Songti SC, Georgia, serif
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.4
  body-md:
    fontFamily: Inter, Segoe UI, Noto Sans SC, system-ui, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Inter, Segoe UI, Noto Sans SC, system-ui, sans-serif
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Inter, Segoe UI, Noto Sans SC, system-ui, sans-serif
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.9px
  equation-lg:
    fontFamily: Cambria, Times New Roman, Noto Serif SC, serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.5
  equation-sm:
    fontFamily: Cambria, Times New Roman, Noto Serif SC, serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 6px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
---

# 化学方程式速查 — 设计规范

## 一、这个界面是什么

一个桌面优先（≥ 1280px 最佳，≥ 900px 可用）的检索型工具，不是阅读型网站。
用户的核心动作只有三个：**找 → 看 → 对**。所以信息密度优先，装饰让位于可扫读性。

- 左侧 248px 固定筛选栏，右侧结果列表纵向单列排布（一页一项，不做卡片网格）。
- 结果项是一条「横向记录条」，不是卡片：靠 1px 分隔线与留白区分，不用阴影堆叠。
- 方程式是页面主角，字号 20px 衬线，行高 1.5，永远不被次要信息挤压。

## 二、色彩规则（硬性）

| 令牌 | 值 | 用途 | 白底对比度 |
|---|---|---|---|
| canvas | #f7f5f0 | 页面底 | — |
| surface | #ffffff | 记录条底 / 侧栏底 | — |
| ink | #1a1917 | 正文、方程式 | 17.4:1 |
| ink-muted | #565248 | 现象说明、次要信息 | 7.8:1 |
| ink-subtle | #7a7568 | 标签、辅助说明（最小字号 11px 起） | 4.6:1 |
| primary | #1f4e5f | 唯一交互强调色：选中态、链接、主按钮 | 9.1:1 |
| oxidant | #a0430b | 氧化 / 失电子 / 双线桥上行 | 6.0:1 |
| reductant | #1d5b79 | 还原 / 得电子 / 双线桥下行 | 7.4:1 |

**禁止事项**
1. 不新造色相。需要浅底时用 `color-mix(in srgb, var(--x) 8%, #fff)`，不写 `rgba()` 字面量。
2. 不用红/绿表达「氧化/还原」或「对/错」——两色相是暖棕 + 冷青。
3. 氧化与还原的区分必须**颜色 + 线型/位置**双通道：双线桥统一实线，但**方向与位置不同**，且标签文字写明「失去 / 得到」。
4. 任何文字与背景对比度不得低于 4.5:1；11px 级小字必须 ≥ 4.5:1。

## 三、排版规则

- 化学式中的数字一律用 `<sub>`（下标），电荷用 `<sup>`（上标）。禁止用普通数字代替。
- 反应条件写在等号正上方，字号为方程式的 0.6 倍，颜色 `ink-subtle`。
- 沉淀 `↓` / 气体 `↑` 符号紧跟化学式，不加大间距。
- 化学式内不换行（`white-space: nowrap` 作用于单个化学式片段），长方程式允许整体换行。

## 四、双线桥 / 单线桥

- 桥画在 SVG 图层，绝对定位覆盖方程式行，`pointer-events: none`。

**几何：直角折线，不用弧线**（对齐人教版必修一 P23 的课本画法）。一条桥由三段组成——从元素正上方竖直起、水平跨过等号、再竖直落到目标元素，箭头**垂直于元素**落下（上桥向下、下桥向上）。横段离元素 `RISE = 18px`，起止点离元素 `GAP = 3px`，拐角 `stroke-linejoin: round`，线宽 1.3px。两端水平距离小于 24px 时按 24px 外扩，否则折线会退化成一条竖线。

- **双线桥**：上桥「还原剂中被氧化的元素」→「氧化产物中的该元素」，横段上方标 `失去 n×e⁻`；下桥「氧化剂中被还原的元素」→「还原产物中的该元素」，横段下方标 `得到 n×e⁻`。**只标电子转移，不标「化合价升高/降低」「被氧化/被还原」**。上行暖棕，下行冷青。
- **单线桥**：只在反应物之间画一条上折线，从还原剂写到氧化剂，横段上方标 `n×e⁻`（不带「失去/得到」字样），颜色用 `ink`；两端元素下方以小字标「还原剂」「氧化剂」。
- 电子数为 1 时写 `e⁻`，其余写 `n×e⁻`（课本写法）。
- 桥出现时，方程式容器上下各预留 44px / 42px（单线桥底部 22px），桥隐藏时收回，避免永久留白。
- 非氧化还原反应点击桥按钮时，按钮显示为不可用，并提示「该反应无电子转移」。

## 五、筛选器

- 分类为单选（含「全部」），标签为多选且**同一组内为 OR、跨组为 AND**。
- 已生效的筛选必须可见为可删除的 chip，不允许「隐形筛选」。
- 结果计数实时更新，格式「共 N 条 / 全部 M 条」，N 与 M 用 `tabular-nums`。
- 空结果必须有引导文案 + 一键清除筛选，不能只留白。
- 侧栏分组顺序固定为：反应分类 → 反应特征 → 教材出处 → 涉及物质。前者决定「是什么反应」，后者决定「含什么物质」，教材出处居中做粗筛。

## 六、教材出处（来源标注）

数据侧：`data.js` 中的 `BOOKS` 定义五本人教 2019 版教材，`EQ_BOOK` 以「EQ 下标 → [[书代号, 正文页码], …]」的映射表附带出处，不往每条记录里塞字段（避免 388 条记录的尾部字段膨胀）。

界面侧：

- 出处以**描边小徽标**呈现（`primary` 细边 + 极浅 `primary-soft` 底 + `primary` 字），与「实底灰标签」形成材质区分：标签是性质，徽标是出处。
- 徽标文案为「书简称 + 页码」，如 `必修一 P37`；`title` 补全书名与「第 N 页」。数字用 `tabular-nums`。
- 徽标本身是按钮，点击即按该书筛选——出处不是装饰，是可用的检索维度。
- 未收录于教材的条目不显示任何占位徽标，宁缺勿假。
- 侧栏「教材出处」组末尾固定给一个「未标注」项，让「教材里没有」也可被主动筛出来。
