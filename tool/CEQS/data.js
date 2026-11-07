/* ==================================================================
   数据区
   字段：c=分类  e=化学方程式  ion=离子方程式  p=现象
        o={x,r}=失/得电子数（存在即氧化还原）  t=标签  n=备注
   标记语法：
     {{条件}}            等号上方条件
     <b data-s="ox"> … </b>   还原剂中被氧化的元素（单线桥起点）
     <b data-s="red">…</b>   氧化剂中被还原的元素
     <b data-s="oxp">…</b>  氧化产物中的对应元素
     <b data-s="redp">…</b> 还原产物中的对应元素
   ================================================================== */
const CATS = [
  { k:'metal',    n:'金属与单质' },
  { k:'nonmetal', n:'非金属与卤素' },
  { k:'oxide',    n:'氧化物与酸碱' },
  { k:'salt',     n:'复分解与沉淀' },
  { k:'gas',      n:'气体制备与检验' },
  { k:'decomp',   n:'热分解与不稳定性' },
  { k:'disprop',  n:'歧化与归中' },
  { k:'industry', n:'工业制备与冶金' },
  { k:'electro',  n:'电解与原电池' },
  { k:'complex',  n:'配位与显色' },
  { k:'organic',  n:'有机反应' }
];

const EQ = [
/* @DATA_START */

/* ---------- 金属与单质 ---------- */
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Na</b> + 2<b data-s="red">H</b><sub>2</sub>O = 2<b data-s="oxp">Na</b>OH + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'2Na + 2H<sub>2</sub>O = 2Na<sup>+</sup> + 2OH<sup>−</sup> + H<sub>2</sub>↑',
  p:'钠<em>浮</em>在水面上、<em>熔</em>成小球、<em>游</em>动并发出嘶嘶声，很快消失；滴入酚酞的溶液变<em>红</em>。',
  o:{x:2,r:2}, n:'“浮熔游响红”五字口诀；钠的密度小于水、熔点低、反应放热。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'4<b data-s="ox">Na</b> + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">Na</b><sub>2</sub><b data-s="redp">O</b>',
  p:'切开的光亮钠表面迅速<em>变暗</em>，失去金属光泽，生成白色固体。',
  o:{x:4,r:4}, n:'常温缓慢氧化；因此金属钠必须保存在煤油中。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Na</b> + <b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">Na</b><sub>2</sub><b data-s="redp">O</b><sub>2</sub>',
  p:'剧烈燃烧，发出<em>黄色火焰</em>，生成<em>淡黄色</em>固体过氧化钠。',
  o:{x:2,r:2}, n:'条件不同产物不同：常温得 Na₂O，点燃得 Na₂O₂。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Na</b> + <b data-s="red">Cl</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">Na</b><b data-s="redp">Cl</b>',
  p:'剧烈燃烧，黄色火焰，产生大量<em>白烟</em>（NaCl 小颗粒）。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Na</b> + 2<b data-s="red">H</b>Cl = 2<b data-s="oxp">Na</b>Cl + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'2Na + 2H<sup>+</sup> = 2Na<sup>+</sup> + H<sub>2</sub>↑',
  p:'比与水反应更剧烈，可能燃烧甚至爆炸，产生大量气泡。',
  o:{x:2,r:2}, n:'钠与酸反应时先与酸中的 H⁺ 反应，酸耗尽后才与水反应。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">K</b> + 2<b data-s="red">H</b><sub>2</sub>O = 2<b data-s="oxp">K</b>OH + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'比钠更剧烈，钾块<em>燃烧</em>并发生轻微爆炸，火焰呈紫色（需透过蓝色钴玻璃观察）。',
  o:{x:2,r:2}, n:'碱金属活泼性：Li < Na < K < Rb < Cs。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Li</b> + 2<b data-s="red">H</b><sub>2</sub>O = 2<b data-s="oxp">Li</b>OH + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'锂<em>浮</em>在水面上缓慢反应，气泡平稳产生，溶液碱性增强。',
  o:{x:2,r:2}, n:'Li 密度最小（比煤油还小），不能保存在煤油中。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Ba</b> + 2<b data-s="red">H</b><sub>2</sub>O = <b data-s="oxp">Ba</b>(OH)<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'钡粒沉入水中并剧烈反应，产生大量气泡，溶液呈强碱性。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Ca</b> + 2<b data-s="red">H</b><sub>2</sub>O = <b data-s="oxp">Ca</b>(OH)<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'钙粒下沉，剧烈放出气泡，溶液<em>变浑浊</em>（Ca(OH)₂ 微溶）。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Mg</b> + <b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">Mg</b><b data-s="redp">O</b>',
  p:'发出<em>耀眼白光</em>，放出大量热，生成白色固体。',
  o:{x:4,r:4}, n:'镁燃烧可用于照明弹、闪光粉。'
},
{
  c:'metal', t:['氧化还原','置换','加热'],
  e:'2<b data-s="ox">Mg</b> + <b data-s="red">C</b>O<sub>2</sub> {{点燃}} 2<b data-s="oxp">Mg</b>O + <b data-s="redp">C</b>',
  p:'镁条在二氧化碳中<em>继续燃烧</em>，发出耀眼白光，瓶壁出现<em>黑色</em>碳粒和白色固体。',
  o:{x:4,r:4}, n:'Mg 能在 CO₂ 中燃烧，故镁着火不能用 CO₂ 灭火器。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Mg</b> + <b data-s="red">Cl</b><sub>2</sub> {{点燃}} <b data-s="oxp">Mg</b><b data-s="redp">Cl</b><sub>2</sub>',
  p:'剧烈燃烧，产生大量白烟，生成白色固体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Mg</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Mg</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Mg + 2H<sup>+</sup> = Mg<sup>2+</sup> + H<sub>2</sub>↑',
  p:'剧烈反应，产生大量气泡，镁条逐渐溶解，试管外壁<em>发热</em>。',
  o:{x:2,r:2}, n:'等质量金属与足量酸反应，相对原子质量越小产生 H₂ 越多。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'4<b data-s="ox">Al</b> + 3<b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">Al</b><sub>2</sub><b data-s="redp">O</b><sub>3</sub>',
  p:'打磨过的铝箔在氧气中燃烧发出<em>耀眼白光</em>；常温下铝表面立即生成<em>致密氧化膜</em>而失去光泽。',
  o:{x:12,r:12}, n:'氧化膜使铝具有抗腐蚀性，也是铝在浓硝酸、浓硫酸中“钝化”的原因。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Al</b> + 3<b data-s="red">Cl</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">Al</b><b data-s="redp">Cl</b><sub>3</sub>',
  p:'铝箔在氯气中燃烧，产生<em>白烟</em>并伴随淡蓝色火焰。',
  o:{x:6,r:6}
},
{
  c:'metal', t:['氧化还原','置换','加热'],
  e:'2<b data-s="ox">Al</b> + <b data-s="red">Fe</b><sub>2</sub>O<sub>3</sub> {{高温}} <b data-s="oxp">Al</b><sub>2</sub>O<sub>3</sub> + 2<b data-s="redp">Fe</b>',
  p:'<em>铝热反应</em>：剧烈放热，发出强光，纸漏斗底部熔融物落下，冷却后得到铁珠。',
  o:{x:6,r:6}, n:'铝热反应用于焊接钢轨、冶炼高熔点金属（V、Cr、Mn 等）。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Al</b> + 2NaOH + 2<b data-s="red">H</b><sub>2</sub>O = 2Na<b data-s="oxp">Al</b>O<sub>2</sub> + 3<b data-s="redp">H</b><sub>2</sub>↑',
  ion:'2Al + 2OH<sup>−</sup> + 2H<sub>2</sub>O = 2AlO<sub>2</sub><sup>−</sup> + 3H<sub>2</sub>↑',
  p:'铝片逐渐溶解，表面产生大量气泡，溶液温度明显升高。',
  o:{x:6,r:6}, n:'铝、锌等两性金属能与强碱溶液反应放出氢气，这是 Al 与 NaOH 的离子方程式易错点（水必须写进离子式）。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Al</b> + 6<b data-s="red">H</b>Cl = 2<b data-s="oxp">Al</b>Cl<sub>3</sub> + 3<b data-s="redp">H</b><sub>2</sub>↑',
  ion:'2Al + 6H<sup>+</sup> = 2Al<sup>3+</sup> + 3H<sub>2</sub>↑',
  p:'铝片表面产生气泡并逐渐溶解，溶液无色。',
  o:{x:6,r:6}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Al</b> + 3<b data-s="red">Cu</b>SO<sub>4</sub> = <b data-s="oxp">Al</b><sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3<b data-s="redp">Cu</b>',
  ion:'2Al + 3Cu<sup>2+</sup> = 2Al<sup>3+</sup> + 3Cu',
  p:'铝片表面析出<em>红色</em>铜，蓝色溶液逐渐褪色。',
  o:{x:6,r:6}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'3<b data-s="ox">Fe</b> + 2<b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">Fe</b><sub>3</sub><b data-s="redp">O</b><sub>4</sub>',
  p:'剧烈燃烧，<em>火星四射</em>，放出大量热，生成<em>黑色</em>固体。',
  o:{x:8,r:8}, n:'集气瓶底要留少量水或细沙，防止熔落物炸裂瓶底。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Fe</b> + 3<b data-s="red">Cl</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">Fe</b><b data-s="redp">Cl</b><sub>3</sub>',
  p:'铁丝在氯气中剧烈燃烧，产生<em>棕黄色烟</em>，生成棕褐色固体。',
  o:{x:6,r:6}, n:'与盐酸不同：Cl₂ 氧化性强，把 Fe 直接氧化为 +3 价。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Fe</b> + <b data-s="red">S</b> {{Δ}} <b data-s="oxp">Fe</b><b data-s="redp">S</b>',
  p:'加热后混合物<em>红热</em>，生成黑色固体硫化亚铁。',
  o:{x:2,r:2}, n:'S 氧化性弱，只能把 Fe 氧化到 +2 价。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Fe</b> + <b data-s="red">I</b><sub>2</sub> {{Δ}} <b data-s="oxp">Fe</b><b data-s="redp">I</b><sub>2</sub>',
  p:'加热时化合，生成红棕色固体。',
  o:{x:2,r:2}, n:'I₂ 氧化性更弱，产物只能是 FeI₂，得不到 FeI₃。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Fe</b> + 3<b data-s="red">Br</b><sub>2</sub> = 2<b data-s="oxp">Fe</b><b data-s="redp">Br</b><sub>3</sub>',
  p:'铁在溴中燃烧，产生红棕色烟。',
  o:{x:6,r:6}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Fe</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Fe</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Fe + 2H<sup>+</sup> = Fe<sup>2+</sup> + H<sub>2</sub>↑',
  p:'铁钉表面产生气泡，逐渐溶解，溶液由无色变为<em>浅绿色</em>。',
  o:{x:2,r:2}, n:'非氧化性酸与铁反应只生成 Fe²⁺。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Fe</b> + <b data-s="red">H</b><sub>2</sub>SO<sub>4</sub>(稀) = <b data-s="oxp">Fe</b>SO<sub>4</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Fe + 2H<sup>+</sup> = Fe<sup>2+</sup> + H<sub>2</sub>↑',
  p:'铁片溶解并产生气泡，溶液变浅绿色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Fe</b> + <b data-s="red">Cu</b>SO<sub>4</sub> = <b data-s="oxp">Fe</b>SO<sub>4</sub> + <b data-s="redp">Cu</b>',
  ion:'Fe + Cu<sup>2+</sup> = Fe<sup>2+</sup> + Cu',
  p:'铁片表面覆盖一层<em>红色</em>物质，蓝色溶液逐渐变为浅绿色。',
  o:{x:2,r:2}, n:'湿法炼铜的原理，也是“曾青得铁则化为铜”的化学解释。'
},
{
  c:'metal', t:['氧化还原','置换','加热'],
  e:'3<b data-s="ox">Fe</b> + 4<b data-s="red">H</b><sub>2</sub>O(g) {{高温}} <b data-s="oxp">Fe</b><sub>3</sub>O<sub>4</sub> + 4<b data-s="redp">H</b><sub>2</sub>',
  p:'灼热铁粉与水蒸气反应，生成<em>黑色</em>固体，收集到可点燃的气体。',
  o:{x:8,r:8}, n:'注意产物是 Fe₃O₄ 而不是 Fe₂O₃；水必须写气态 (g)。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Fe</b>Cl<sub>3</sub> + <b data-s="red">Fe</b> = 3<b data-s="oxp redp">Fe</b>Cl<sub>2</sub>',
  ion:'2Fe<sup>3+</sup> + Fe = 3Fe<sup>2+</sup>',
  p:'铁粉溶解，黄色溶液逐渐变为<em>浅绿色</em>。',
  o:{x:2,r:2}, n:'除去 FeCl₂ 中混有的 FeCl₃ 的常用方法。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'<b data-s="ox">Cu</b> + 2<b data-s="red">Fe</b>Cl<sub>3</sub> = <b data-s="oxp">Cu</b>Cl<sub>2</sub> + 2<b data-s="redp">Fe</b>Cl<sub>2</sub>',
  ion:'Cu + 2Fe<sup>3+</sup> = Cu<sup>2+</sup> + 2Fe<sup>2+</sup>',
  p:'铜片溶解，黄色溶液变为<em>蓝绿色</em>。',
  o:{x:2,r:2}, n:'说明氧化性 Fe³⁺ > Cu²⁺，腐蚀铜板制印刷电路板的原理。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Cu</b> + <b data-s="red">Cl</b><sub>2</sub> {{点燃}} <b data-s="oxp">Cu</b><b data-s="redp">Cl</b><sub>2</sub>',
  p:'铜丝在氯气中燃烧，产生<em>棕黄色烟</em>，加水后溶液呈蓝绿色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Cu</b> + <b data-s="red">O</b><sub>2</sub> {{Δ}} 2<b data-s="oxp">Cu</b><b data-s="redp">O</b>',
  p:'红色铜丝表面<em>变黑</em>，生成黑色氧化铜。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','加热'],
  e:'<b data-s="ox">Cu</b> + 2H<sub>2</sub><b data-s="red">S</b>O<sub>4</sub>(浓) {{Δ}} <b data-s="oxp">Cu</b>SO<sub>4</sub> + <b data-s="redp">S</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'铜片溶解，溶液变<em>蓝</em>，产生有<em>刺激性气味</em>的气体，能使品红溶液褪色。',
  o:{x:2,r:2}, n:'浓硫酸的强氧化性由 +6 价 S 体现；随反应进行硫酸变稀，反应会停止。'
},
{
  c:'metal', t:['氧化还原'],
  e:'3<b data-s="ox">Cu</b> + 8H<b data-s="red">N</b>O<sub>3</sub>(稀) = 3<b data-s="oxp">Cu</b>(NO<sub>3</sub>)<sub>2</sub> + 2<b data-s="redp">N</b>O↑ + 4H<sub>2</sub>O',
  ion:'3Cu + 8H<sup>+</sup> + 2NO<sub>3</sub><sup>−</sup> = 3Cu<sup>2+</sup> + 2NO↑ + 4H<sub>2</sub>O',
  p:'铜片溶解，溶液变<em>蓝</em>，产生<em>无色</em>气体，遇空气立即变为红棕色。',
  o:{x:6,r:6}, n:'稀硝酸被还原为 NO；离子式中不能拆开 HNO₃，要写成 H⁺ 与 NO₃⁻。'
},
{
  c:'metal', t:['氧化还原'],
  e:'<b data-s="ox">Cu</b> + 4H<b data-s="red">N</b>O<sub>3</sub>(浓) = <b data-s="oxp">Cu</b>(NO<sub>3</sub>)<sub>2</sub> + 2<b data-s="redp">N</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  ion:'Cu + 4H<sup>+</sup> + 2NO<sub>3</sub><sup>−</sup> = Cu<sup>2+</sup> + 2NO<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'反应剧烈，溶液变蓝绿色，产生大量<em>红棕色</em>有刺激性气味的气体。',
  o:{x:2,r:2}, n:'浓硝酸被还原为 NO₂；浓硝酸需保存在棕色瓶中避光。'
},
{
  c:'metal', t:['氧化还原'],
  e:'<b data-s="ox">Fe</b> + 4H<b data-s="red">N</b>O<sub>3</sub>(稀，过量) = <b data-s="oxp">Fe</b>(NO<sub>3</sub>)<sub>3</sub> + <b data-s="redp">N</b>O↑ + 2H<sub>2</sub>O',
  p:'铁粉溶解，溶液变<em>黄色</em>，产生无色气体。',
  o:{x:3,r:3}, n:'硝酸过量时生成 Fe³⁺；铁过量时最终生成 Fe²⁺，需分情况讨论。'
},
{
  c:'metal', t:['氧化还原'],
  e:'3<b data-s="ox">Ag</b> + 4H<b data-s="red">N</b>O<sub>3</sub>(稀) = 3<b data-s="oxp">Ag</b>NO<sub>3</sub> + <b data-s="redp">N</b>O↑ + 2H<sub>2</sub>O',
  p:'银逐渐溶解，溶液无色，产生无色气体，遇空气变红棕色。',
  o:{x:3,r:3}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Zn</b> + <b data-s="red">H</b><sub>2</sub>SO<sub>4</sub> = <b data-s="oxp">Zn</b>SO<sub>4</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Zn + 2H<sup>+</sup> = Zn<sup>2+</sup> + H<sub>2</sub>↑',
  p:'锌粒表面产生气泡，逐渐溶解，试管发热。',
  o:{x:2,r:2}, n:'实验室制氢气常用锌粒与稀硫酸（不用硝酸、不用浓硫酸）。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Zn</b> + 2NaOH + 2<b data-s="red">H</b><sub>2</sub>O = Na<sub>2</sub>[<b data-s="oxp">Zn</b>(OH)<sub>4</sub>] + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Zn + 2OH<sup>−</sup> + 2H<sub>2</sub>O = [Zn(OH)<sub>4</sub>]<sup>2−</sup> + H<sub>2</sub>↑',
  p:'锌粒溶解，持续产生气泡，溶液保持澄清。',
  o:{x:2,r:2}, n:'锌也是两性金属；旧教材常写成 ZnO₂²⁻，新教材统一为 [Zn(OH)₄]²⁻。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Zn</b> + <b data-s="red">Cu</b>SO<sub>4</sub> = <b data-s="oxp">Zn</b>SO<sub>4</sub> + <b data-s="redp">Cu</b>',
  ion:'Zn + Cu<sup>2+</sup> = Zn<sup>2+</sup> + Cu',
  p:'锌粒表面析出<em>红色</em>铜，蓝色溶液褪色。',
  o:{x:2,r:2}, n:'构成原电池时，锌为负极被氧化，铜为正极析出。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Na</b> + CuSO<sub>4</sub> + 2<b data-s="red">H</b><sub>2</sub>O = Cu(OH)<sub>2</sub>↓ + <b data-s="oxp">Na</b><sub>2</sub>SO<sub>4</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'钠熔成小球在水面游动并产生气泡，同时出现<em>蓝色絮状沉淀</em>。',
  o:{x:2,r:2}, n:'钠先与水反应生成 NaOH，NaOH 再与 CuSO₄ 生成沉淀——钠不能从盐溶液中置换出金属。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'<b data-s="ox">Hg</b> + <b data-s="red">S</b> = <b data-s="oxp">Hg</b><b data-s="redp">S</b>',
  p:'常温下即可化合，银白色汞珠变成<em>黑色</em>硫化汞。',
  o:{x:2,r:2}, n:'这是“硫磺撒在汞上处理汞泄漏”的原理；HgS 是朱砂的主要成分。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Cu</b> + <b data-s="red">O</b><sub>2</sub> + CO<sub>2</sub> + H<sub>2</sub>O = <b data-s="oxp">Cu</b><sub>2</sub>(<b data-s="redp">O</b>H)<sub>2</sub>CO<sub>3</sub>',
  p:'铜器在潮湿空气中久置，表面出现<em>绿色</em>铜锈（铜绿）。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'4<b data-s="ox">Ag</b> + 2H<sub>2</sub>S + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">Ag</b><sub>2</sub>S + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'银器在含硫化氢的空气中逐渐<em>变黑</em>。',
  o:{x:4,r:4}, n:'也可写作 4Ag + 2H₂S + O₂ = 2Ag₂S + 2H₂O；银器变黑并非生成氧化银。'
},
/* ---------- 非金属与卤素 ---------- */
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">H</b><sub>2</sub><b data-s="redp">O</b>',
  p:'纯净的氢气在空气中安静燃烧，发出<em>淡蓝色火焰</em>，管壁出现水雾，放出大量热。',
  o:{x:4,r:4}, n:'点燃前必须验纯，否则可能发生爆鸣。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">Cl</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">H</b><b data-s="redp">Cl</b>',
  p:'安静燃烧，发出<em>苍白色火焰</em>，瓶口出现<em>白雾</em>。',
  o:{x:2,r:2}, n:'H₂ 与 Cl₂ 混合后光照会剧烈爆炸；白雾是盐酸小液滴，不是白烟。'
},
{
  c:'nonmetal', t:['氧化还原','置换','加热'],
  e:'<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">Cu</b>O {{Δ}} <b data-s="redp">Cu</b> + <b data-s="oxp">H</b><sub>2</sub>O',
  p:'黑色粉末逐渐变为<em>红色</em>，试管口有<em>水珠</em>生成。',
  o:{x:2,r:2}, n:'H₂ 还原金属氧化物，体现还原性；先通氢气排尽空气再加热。'
},
{
  c:'nonmetal', t:['氧化还原','置换','高温'],
  e:'3<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">Fe</b><sub>2</sub>O<sub>3</sub> {{高温}} 2<b data-s="redp">Fe</b> + 3<b data-s="oxp">H</b><sub>2</sub><b data-s="redp">O</b>',
  p:'红棕色粉末逐渐变黑，管口有水珠。',
  o:{x:6,r:6}
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">C</b> + <b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">C</b><b data-s="redp">O</b><sub>2</sub>',
  p:'木炭在氧气中剧烈燃烧，发出<em>白光</em>，放出大量热，生成能使石灰水变浑浊的气体。',
  o:{x:4,r:4}, n:'氧气充足时产物为 CO₂。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">C</b> + <b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">C</b><b data-s="redp">O</b>',
  p:'氧气不足时燃烧不充分，产生<em>有毒</em>的一氧化碳。',
  o:{x:4,r:4}, n:'CO 与血红蛋白结合能力强，是煤气中毒的原因。'
},
{
  c:'nonmetal', t:['氧化还原','化合','高温'],
  e:'<b data-s="ox">C</b> + <b data-s="red">C</b>O<sub>2</sub> {{高温}} 2<b data-s="oxp redp">C</b>O',
  p:'高温下黑色炭粉与二氧化碳反应，生成可燃气体。',
  o:{x:2,r:2}, n:'此反应吸收大量热，是吸热反应；C 既是氧化剂又是还原剂中的一种情形。'
},
{
  c:'nonmetal', t:['氧化还原','置换','高温'],
  e:'<b data-s="ox">C</b> + <b data-s="red">H</b><sub>2</sub>O(g) {{高温}} <b data-s="oxp">C</b>O + <b data-s="redp">H</b><sub>2</sub>',
  p:'高温下生成可燃性的<em>水煤气</em>（CO 与 H₂ 的混合气）。',
  o:{x:2,r:2}, n:'工业制水煤气的反应，产物既是燃料又是化工原料。'
},
{
  c:'nonmetal', t:['氧化还原','置换','高温'],
  e:'<b data-s="ox">C</b> + 2<b data-s="red">Cu</b>O {{高温}} 2<b data-s="redp">Cu</b> + <b data-s="oxp">C</b>O<sub>2</sub>↑',
  p:'黑色混合物逐渐出现<em>红色</em>固体，产生能使石灰水变浑浊的气体。',
  o:{x:4,r:4}, n:'碳作还原剂，体现还原性，用于冶炼金属。'
},
{
  c:'nonmetal', t:['氧化还原','置换','高温'],
  e:'2<b data-s="ox">C</b> + <b data-s="red">Si</b>O<sub>2</sub> {{高温}} <b data-s="redp">Si</b> + 2<b data-s="oxp">C</b>O↑',
  p:'高温下生成粗硅，同时产生可燃气体。',
  o:{x:4,r:4}, n:'工业制粗硅的第一步；产物是 CO 而不是 CO₂。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">C</b>O + <b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">C</b><b data-s="redp">O</b><sub>2</sub>',
  p:'一氧化碳在空气中燃烧，发出<em>蓝色火焰</em>，放出大量热。',
  o:{x:4,r:4}, n:'CO 燃烧火焰呈蓝色，是煤气主要成分之一。'
},
{
  c:'nonmetal', t:['氧化还原','置换','加热'],
  e:'<b data-s="ox">C</b>O + <b data-s="red">Cu</b>O {{Δ}} <b data-s="redp">Cu</b> + <b data-s="oxp">C</b>O<sub>2</sub>',
  p:'黑色粉末变<em>红</em>，生成的气体使澄清石灰水变<em>浑浊</em>。',
  o:{x:2,r:2}, n:'CO 作还原剂，本身被氧化为 CO₂。'
},
{
  c:'nonmetal', t:['氧化还原','高温'],
  e:'3<b data-s="ox">C</b>O + <b data-s="red">Fe</b><sub>2</sub>O<sub>3</sub> {{高温}} 2<b data-s="redp">Fe</b> + 3<b data-s="oxp">C</b>O<sub>2</sub>',
  p:'红棕色粉末逐渐变黑，尾气中 CO₂ 使石灰水变浑浊。',
  o:{x:6,r:6}, n:'高炉炼铁的核心反应；尾气需处理，防止 CO 污染。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">S</b> + <b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">S</b><b data-s="redp">O</b><sub>2</sub>',
  p:'硫在氧气中燃烧发出<em>明亮的蓝紫色火焰</em>，生成有<em>刺激性气味</em>的气体。',
  o:{x:4,r:4}, n:'在空气中燃烧呈淡蓝色火焰，在纯氧中才是蓝紫色。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">S</b> {{Δ}} <b data-s="oxp">H</b><sub>2</sub><b data-s="redp">S</b>',
  p:'加热时化合，生成有<em>臭鸡蛋气味</em>的气体。',
  o:{x:2,r:2}, n:'H₂S 有毒，具有还原性，能使湿润的醋酸铅试纸变黑。'
},
{
  c:'nonmetal', t:['氧化还原','化合','催化剂','加热','可逆'],
  e:'2<b data-s="ox">S</b>O<sub>2</sub> + <b data-s="red">O</b><sub>2</sub> {{催化剂, Δ}} 2<b data-s="oxp">S</b><b data-s="redp">O</b><sub>3</sub>',
  p:'在催化剂作用下化合，生成白色固体（遇水剧烈反应生成酸雾）。',
  o:{x:4,r:4}, n:'接触法制硫酸的关键一步，正反应放热、体积缩小。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'<b data-s="red">S</b>O<sub>2</sub> + 2H<sub>2</sub><b data-s="ox">S</b> = 3<b data-s="oxp redp">S</b>↓ + 2H<sub>2</sub>O',
  p:'两种气体混合后析出<em>淡黄色</em>固体硫。',
  o:{x:4,r:4}, n:'归中反应：+4 价 S 与 −2 价 S 归中为 0 价，产物只有一种价态。'
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">Cl</b><sub>2</sub> + 2Na<b data-s="ox">Br</b> = 2Na<b data-s="redp">Cl</b> + <b data-s="oxp">Br</b><sub>2</sub>',
  ion:'Cl<sub>2</sub> + 2Br<sup>−</sup> = 2Cl<sup>−</sup> + Br<sub>2</sub>',
  p:'无色溶液逐渐变为<em>橙黄色</em>。',
  o:{x:2,r:2}, n:'氧化性 Cl₂ > Br₂ > I₂，活泼非金属置换不活泼非金属。'
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">Cl</b><sub>2</sub> + 2K<b data-s="ox">I</b> = 2K<b data-s="redp">Cl</b> + <b data-s="oxp">I</b><sub>2</sub>',
  ion:'Cl<sub>2</sub> + 2I<sup>−</sup> = 2Cl<sup>−</sup> + I<sub>2</sub>',
  p:'溶液变为<em>棕黄色</em>；滴加淀粉溶液后变<em>蓝</em>。',
  o:{x:2,r:2}, n:'碘遇淀粉变蓝是检验 I₂ 的经典方法。'
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">Br</b><sub>2</sub> + 2K<b data-s="ox">I</b> = 2K<b data-s="redp">Br</b> + <b data-s="oxp">I</b><sub>2</sub>',
  ion:'Br<sub>2</sub> + 2I<sup>−</sup> = 2Br<sup>−</sup> + I<sub>2</sub>',
  p:'橙色溶液颜色加深并转为棕黄色，加淀粉变蓝。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'3<b data-s="red">Cl</b><sub>2</sub> + 2<b data-s="ox">Fe</b>Br<sub>2</sub> = 2<b data-s="oxp">Fe</b><b data-s="redp">Cl</b><sub>3</sub> + 2<b data-s="oxp">Br</b><sub>2</sub>',
  ion:'3Cl<sub>2</sub> + 2Fe<sup>2+</sup> + 4Br<sup>−</sup> = 6Cl<sup>−</sup> + 2Fe<sup>3+</sup> + 2Br<sub>2</sub>',
  p:'溶液由浅绿色变为棕黄色。',
  o:{x:6,r:6}, n:'还原性 Fe²⁺ > Br⁻，氯气先氧化 Fe²⁺；此式对应氯气足量的情形。'
},
{
  c:'nonmetal', t:['氧化还原','化合','催化剂','可逆','放热'],
  e:'<b data-s="red">N</b><sub>2</sub> + 3<b data-s="ox">H</b><sub>2</sub> ⇌ 2<b data-s="redp">N</b><b data-s="oxp">H</b><sub>3</sub>',
  p:'工业合成氨，生成有<em>刺激性气味</em>的气体，能使湿润的红色石蕊试纸变蓝。',
  o:{x:6,r:6}, n:'条件为高温、高压、催化剂；这是可逆反应，转化率不能达到 100%。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'<b data-s="ox">N</b><sub>2</sub> + <b data-s="red">O</b><sub>2</sub> {{放电}} 2<b data-s="oxp">N</b><b data-s="redp">O</b>',
  p:'雷电时空气中产生<em>无色</em>的一氧化氮。',
  o:{x:4,r:4}, n:'“雷雨发庄稼”：N₂ → NO → NO₂ → HNO₃ → 硝酸盐。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">N</b>O + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">N</b><b data-s="redp">O</b><sub>2</sub>',
  p:'无色气体迅速变为<em>红棕色</em>。',
  o:{x:4,r:4}, n:'NO 只能用排水法收集，不能用排空气法。'
},
{
  c:'nonmetal', t:['氧化还原','催化剂','加热'],
  e:'4<b data-s="ox">N</b>H<sub>3</sub> + 5<b data-s="red">O</b><sub>2</sub> {{催化剂, Δ}} 4<b data-s="oxp">N</b>O + 6H<sub>2</sub><b data-s="redp">O</b>',
  p:'氨在催化剂表面燃烧，生成无色气体，铂丝保持红热。',
  o:{x:20,r:20}, n:'氨的催化氧化是工业制硝酸的基础，属于放热反应。'
},
{
  c:'nonmetal', t:['化合'],
  e:'NH<sub>3</sub> + HCl = NH<sub>4</sub>Cl',
  p:'两瓶气体接近时产生<em>大量白烟</em>。',
  n:'白烟是 NH₄Cl 固体小颗粒，可用于检验氨气或氯化氢。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'4<b data-s="ox">P</b> + 5<b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">P</b><sub>2</sub><b data-s="redp">O</b><sub>5</sub>',
  p:'剧烈燃烧，产生<em>大量白烟</em>，放出大量热。',
  o:{x:20,r:20}, n:'白烟是 P₂O₅ 固体，可用于制造烟幕。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Si</b> + <b data-s="red">O</b><sub>2</sub> {{高温}} <b data-s="oxp">Si</b><b data-s="redp">O</b><sub>2</sub>',
  p:'高温下生成白色固体二氧化硅。',
  o:{x:4,r:4}
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'<b data-s="ox">Si</b> + 2NaOH + <b data-s="red">H</b><sub>2</sub>O = Na<sub>2</sub><b data-s="oxp">Si</b>O<sub>3</sub> + 2<b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Si + 2OH<sup>−</sup> + H<sub>2</sub>O = SiO<sub>3</sub><sup>2−</sup> + 2H<sub>2</sub>↑',
  p:'硅粉逐渐溶解，产生气泡。',
  o:{x:4,r:4}, n:'硅能与强碱反应，故试剂瓶不能用玻璃塞盛放碱液（SiO₂ 也会被腐蚀）。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'2H<sub>2</sub><b data-s="ox">S</b> + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">S</b>↓ + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'氧气不足时析出<em>淡黄色</em>固体。',
  o:{x:4,r:4}
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'2H<sub>2</sub><b data-s="ox">S</b> + 3<b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">S</b>O<sub>2</sub> + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'充分燃烧发出<em>淡蓝色火焰</em>，生成有刺激性气味的气体。',
  o:{x:12,r:12}, n:'氧气充足程度决定产物是 S 还是 SO₂。'
},

/* ---------- 氧化物与酸碱 ---------- */
{
  c:'oxide', t:['化合','放热'],
  e:'CaO + H<sub>2</sub>O = Ca(OH)<sub>2</sub>',
  p:'块状生石灰<em>剧烈</em>与水反应，放出大量热，体积膨胀并<em>裂成粉末</em>。',
  n:'生石灰常作干燥剂；反应放热足以煮熟鸡蛋。'
},
{
  c:'oxide', t:[],
  e:'CaO + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O',
  ion:'CaO + 2H<sup>+</sup> = Ca<sup>2+</sup> + H<sub>2</sub>O',
  p:'白色固体溶解，溶液无色，试管发热。',
  n:'碱性氧化物与酸反应生成盐和水。'
},
{
  c:'oxide', t:[],
  e:'CuO + 2HCl = CuCl<sub>2</sub> + H<sub>2</sub>O',
  ion:'CuO + 2H<sup>+</sup> = Cu<sup>2+</sup> + H<sub>2</sub>O',
  p:'<em>黑色</em>粉末逐渐溶解，溶液变为<em>蓝绿色</em>。'
},
{
  c:'oxide', t:[],
  e:'CuO + H<sub>2</sub>SO<sub>4</sub> = CuSO<sub>4</sub> + H<sub>2</sub>O',
  ion:'CuO + 2H<sup>+</sup> = Cu<sup>2+</sup> + H<sub>2</sub>O',
  p:'黑色粉末溶解，溶液变为<em>蓝色</em>。'
},
{
  c:'oxide', t:[],
  e:'Fe<sub>2</sub>O<sub>3</sub> + 6HCl = 2FeCl<sub>3</sub> + 3H<sub>2</sub>O',
  ion:'Fe<sub>2</sub>O<sub>3</sub> + 6H<sup>+</sup> = 2Fe<sup>3+</sup> + 3H<sub>2</sub>O',
  p:'<em>红棕色</em>粉末溶解，溶液变为<em>黄色</em>。',
  n:'铁锈的主要成分是 Fe₂O₃·xH₂O，可用盐酸除锈（不能长时间浸泡）。'
},
{
  c:'oxide', t:[],
  e:'FeO + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>O',
  ion:'FeO + 2H<sup>+</sup> = Fe<sup>2+</sup> + H<sub>2</sub>O',
  p:'黑色粉末溶解，溶液呈浅绿色。'
},
{
  c:'oxide', t:[],
  e:'Fe<sub>3</sub>O<sub>4</sub> + 8HCl = FeCl<sub>2</sub> + 2FeCl<sub>3</sub> + 4H<sub>2</sub>O',
  p:'黑色固体溶解，溶液呈黄绿色（含 Fe²⁺ 与 Fe³⁺）。',
  n:'Fe₃O₄ 可看作 FeO·Fe₂O₃，其中 1/3 的铁为 +2 价、2/3 为 +3 价。'
},
{
  c:'oxide', t:[],
  e:'MgO + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>O',
  ion:'MgO + 2H<sup>+</sup> = Mg<sup>2+</sup> + H<sub>2</sub>O',
  p:'白色粉末溶解，溶液无色。'
},
{
  c:'oxide', t:[],
  e:'Al<sub>2</sub>O<sub>3</sub> + 6HCl = 2AlCl<sub>3</sub> + 3H<sub>2</sub>O',
  ion:'Al<sub>2</sub>O<sub>3</sub> + 6H<sup>+</sup> = 2Al<sup>3+</sup> + 3H<sub>2</sub>O',
  p:'白色固体溶解，溶液无色。',
  n:'氧化铝是两性氧化物，既能溶于强酸又能溶于强碱。'
},
{
  c:'oxide', t:[],
  e:'Al<sub>2</sub>O<sub>3</sub> + 2NaOH = 2NaAlO<sub>2</sub> + H<sub>2</sub>O',
  ion:'Al<sub>2</sub>O<sub>3</sub> + 2OH<sup>−</sup> = 2AlO<sub>2</sub><sup>−</sup> + H<sub>2</sub>O',
  p:'白色固体逐渐溶解，溶液澄清。',
  n:'因此铝制器皿不能长时间盛放强碱溶液；氧化铝是工业电解炼铝的原料。'
},
{
  c:'oxide', t:[],
  e:'ZnO + 2HCl = ZnCl<sub>2</sub> + H<sub>2</sub>O',
  ion:'ZnO + 2H<sup>+</sup> = Zn<sup>2+</sup> + H<sub>2</sub>O',
  p:'白色粉末溶解，溶液无色。'
},
{
  c:'oxide', t:[],
  e:'ZnO + 2NaOH = Na<sub>2</sub>ZnO<sub>2</sub> + H<sub>2</sub>O',
  ion:'ZnO + 2OH<sup>−</sup> = ZnO<sub>2</sub><sup>2−</sup> + H<sub>2</sub>O',
  p:'白色粉末溶于强碱，溶液澄清。',
  n:'ZnO 也是两性氧化物。'
},
{
  c:'oxide', t:[],
  e:'SO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O',
  ion:'SO<sub>2</sub> + 2OH<sup>−</sup> = SO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O',
  p:'有刺激性气味的气体被吸收，溶液无色。',
  n:'SO₂ 过量时生成酸式盐 NaHSO₃，离子式为 SO₂ + OH⁻ = HSO₃⁻。'
},
{
  c:'oxide', t:[],
  e:'SO<sub>2</sub> + CaO = CaSO<sub>3</sub>',
  p:'白色固体吸收气体，可用于燃煤脱硫的简化表示。',
  n:'实际工业脱硫常用石灰石—石膏法：CaCO₃ + SO₂ + 1/2O₂ + 2H₂O = CaSO₄·2H₂O + CO₂。'
},
{
  c:'oxide', t:['化合','放热'],
  e:'SO<sub>3</sub> + H<sub>2</sub>O = H<sub>2</sub>SO<sub>4</sub>',
  p:'白色固体遇水<em>剧烈</em>反应并放出大量热，产生<em>酸雾</em>。',
  n:'工业上不用水直接吸收 SO₃（易形成酸雾、吸收率低），而用浓硫酸吸收。'
},
{
  c:'oxide', t:[],
  e:'CO<sub>2</sub> + 2NaOH = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O',
  ion:'CO<sub>2</sub> + 2OH<sup>−</sup> = CO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O',
  p:'无色气体被吸收，溶液无明显现象。',
  n:'NaOH 溶液必须密封保存，否则吸收空气中的 CO₂ 变质。'
},
{
  c:'oxide', t:[],
  e:'CO<sub>2</sub> + NaOH = NaHCO<sub>3</sub>',
  ion:'CO<sub>2</sub> + OH<sup>−</sup> = HCO<sub>3</sub><sup>−</sup>',
  p:'CO₂ 过量时生成可溶的碳酸氢钠。',
  n:'与少量 CO₂ 的产物不同，是“量不同产物不同”的典型例子。'
},
{
  c:'oxide', t:['沉淀'],
  e:'CO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O',
  ion:'CO<sub>2</sub> + Ca<sup>2+</sup> + 2OH<sup>−</sup> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O',
  p:'澄清石灰水<em>变浑浊</em>，是检验 CO₂ 的经典方法。',
  n:'CO₂ 过量时沉淀溶解：CaCO₃ + CO₂ + H₂O = Ca(HCO₃)₂。'
},
{
  c:'oxide', t:[],
  e:'CO<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O = 2NaHCO<sub>3</sub>',
  ion:'CO<sub>2</sub> + CO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O = 2HCO<sub>3</sub><sup>−</sup>',
  p:'碳酸钠溶液中通入 CO₂，因 NaHCO₃ 溶解度较小而析出晶体。',
  n:'侯氏制碱法中“吸氨、碳酸化”步骤的本质。'
},
{
  c:'oxide', t:[],
  e:'SiO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SiO<sub>3</sub> + H<sub>2</sub>O',
  ion:'SiO<sub>2</sub> + 2OH<sup>−</sup> = SiO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O',
  p:'二氧化硅缓慢溶解，生成黏稠的硅酸钠溶液。',
  n:'盛放 NaOH 的试剂瓶必须用橡胶塞，不能磨口玻璃塞（会粘死）。'
},
{
  c:'oxide', t:[],
  e:'SiO<sub>2</sub> + 4HF = SiF<sub>4</sub>↑ + 2H<sub>2</sub>O',
  p:'玻璃表面被腐蚀，变得毛糙透明。',
  n:'氢氟酸是唯一能腐蚀玻璃的酸，用于雕刻玻璃、制作量器刻度。'
},
{
  c:'oxide', t:['高温'],
  e:'SiO<sub>2</sub> + CaCO<sub>3</sub> {{高温}} CaSiO<sub>3</sub> + CO<sub>2</sub>↑',
  p:'高温下熔融，放出气体。',
  n:'玻璃工业的主要反应之一（石灰石引入 CaO）。'
},
{
  c:'oxide', t:['高温'],
  e:'SiO<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> {{高温}} Na<sub>2</sub>SiO<sub>3</sub> + CO<sub>2</sub>↑',
  p:'高温下反应放出气体，生成玻璃状物质。',
  n:'普通玻璃的成分可近似表示为 Na₂O·CaO·6SiO₂。'
},
{
  c:'oxide', t:['氧化还原','加热'],
  e:'<b data-s="red">Mn</b>O<sub>2</sub> + 4H<b data-s="ox">Cl</b> {{Δ}} <b data-s="redp">Mn</b>Cl<sub>2</sub> + <b data-s="oxp">Cl</b><sub>2</sub>↑ + 2H<sub>2</sub>O',
  ion:'MnO<sub>2</sub> + 4H<sup>+</sup> + 2Cl<sup>−</sup> {{Δ}} Mn<sup>2+</sup> + Cl<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'黑色粉末逐渐溶解，产生<em>黄绿色</em>刺激性气味气体，湿润淀粉碘化钾试纸变蓝。',
  o:{x:2,r:2}, n:'实验室制氯气的经典方法；必须用浓盐酸，稀盐酸不反应。'
},
/* ---------- 复分解与沉淀 ---------- */
{
  c:'salt', t:['沉淀'],
  e:'AgNO<sub>3</sub> + NaCl = AgCl↓ + NaNO<sub>3</sub>',
  ion:'Ag<sup>+</sup> + Cl<sup>−</sup> = AgCl↓',
  p:'立即生成<em>白色</em>沉淀，沉淀不溶于稀硝酸。',
  n:'检验 Cl⁻ 的标准方法：加稀硝酸酸化的 AgNO₃ 溶液；白色沉淀溶于氨水。'
},
{
  c:'salt', t:['沉淀'],
  e:'AgNO<sub>3</sub> + NaBr = AgBr↓ + NaNO<sub>3</sub>',
  ion:'Ag<sup>+</sup> + Br<sup>−</sup> = AgBr↓',
  p:'生成<em>淡黄色</em>沉淀，不溶于稀硝酸。',
  n:'AgBr 感光性强，是传统照相底片的感光材料。'
},
{
  c:'salt', t:['沉淀'],
  e:'AgNO<sub>3</sub> + KI = AgI↓ + KNO<sub>3</sub>',
  ion:'Ag<sup>+</sup> + I<sup>−</sup> = AgI↓',
  p:'生成<em>黄色</em>沉淀，不溶于稀硝酸。',
  n:'三种卤化银颜色：AgCl 白、AgBr 淡黄、AgI 黄。'
},
{
  c:'salt', t:['沉淀'],
  e:'BaCl<sub>2</sub> + Na<sub>2</sub>SO<sub>4</sub> = BaSO<sub>4</sub>↓ + 2NaCl',
  ion:'Ba<sup>2+</sup> + SO<sub>4</sub><sup>2−</sup> = BaSO<sub>4</sub>↓',
  p:'生成<em>白色</em>沉淀，不溶于稀盐酸、稀硝酸。',
  n:'检验 SO₄²⁻；BaSO₄ 俗称钡餐，因不溶于酸且不被吸收而在医学上用作造影剂。'
},
{
  c:'salt', t:['沉淀'],
  e:'BaCl<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> = BaCO<sub>3</sub>↓ + 2NaCl',
  ion:'Ba<sup>2+</sup> + CO<sub>3</sub><sup>2−</sup> = BaCO<sub>3</sub>↓',
  p:'生成<em>白色</em>沉淀，但沉淀<em>溶于稀盐酸</em>并放出气体。',
  n:'与 BaSO₄ 的关键区别：BaCO₃ 溶于酸。'
},
{
  c:'salt', t:['沉淀'],
  e:'CaCl<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> = CaCO<sub>3</sub>↓ + 2NaCl',
  ion:'Ca<sup>2+</sup> + CO<sub>3</sub><sup>2−</sup> = CaCO<sub>3</sub>↓',
  p:'生成<em>白色</em>沉淀，可溶于稀盐酸。'
},
{
  c:'salt', t:['气体'],
  e:'CaCO<sub>3</sub> + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'CaCO<sub>3</sub> + 2H<sup>+</sup> = Ca<sup>2+</sup> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'固体逐渐溶解，产生<em>大量气泡</em>，气体使澄清石灰水变浑浊。',
  n:'大理石、石灰石与稀盐酸反应，是实验室制 CO₂ 的常用方法。'
},
{
  c:'salt', t:['气体'],
  e:'Na<sub>2</sub>CO<sub>3</sub> + 2HCl = 2NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'CO<sub>3</sub><sup>2−</sup> + 2H<sup>+</sup> = H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'剧烈产生气泡，溶液澄清。',
  n:'滴加盐酸时，Na₂CO₃ 先转化为 NaHCO₃ 再放气，故气泡产生较 NaHCO₃ 慢。'
},
{
  c:'salt', t:['气体'],
  e:'NaHCO<sub>3</sub> + HCl = NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'HCO<sub>3</sub><sup>−</sup> + H<sup>+</sup> = H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'立即产生大量气泡，反应比 Na₂CO₃ 更剧烈。',
  n:'相同质量下 NaHCO₃ 放出的 CO₂ 更多，故常用作发酵粉、灭火剂。'
},
{
  c:'salt', t:[],
  e:'NaOH + HCl = NaCl + H<sub>2</sub>O',
  ion:'H<sup>+</sup> + OH<sup>−</sup> = H<sub>2</sub>O',
  p:'无明显现象，溶液温度升高，pH 下降。',
  n:'强酸强碱中和热 ΔH = −57.3 kJ/mol，与酸碱种类无关。'
},
{
  c:'salt', t:[],
  e:'NaOH + CH<sub>3</sub>COOH = CH<sub>3</sub>COONa + H<sub>2</sub>O',
  ion:'CH<sub>3</sub>COOH + OH<sup>−</sup> = CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O',
  p:'无明显现象，温度升高。',
  n:'弱酸不能拆写成 H⁺，这是离子方程式书写最常见的失分点。'
},
{
  c:'salt', t:[],
  e:'NH<sub>3</sub>·H<sub>2</sub>O + HCl = NH<sub>4</sub>Cl + H<sub>2</sub>O',
  ion:'NH<sub>3</sub>·H<sub>2</sub>O + H<sup>+</sup> = NH<sub>4</sub><sup>+</sup> + H<sub>2</sub>O',
  p:'两溶液混合，产生白烟（浓溶液接近时）。',
  n:'弱碱 NH₃·H₂O 在离子方程式中保留分子形式。'
},
{
  c:'salt', t:['沉淀'],
  e:'CuSO<sub>4</sub> + 2NaOH = Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>',
  ion:'Cu<sup>2+</sup> + 2OH<sup>−</sup> = Cu(OH)<sub>2</sub>↓',
  p:'生成<em>蓝色絮状</em>沉淀。',
  n:'新制 Cu(OH)₂ 悬浊液用于检验醛基（加热生成砖红色 Cu₂O）。'
},
{
  c:'salt', t:['沉淀'],
  e:'FeCl<sub>3</sub> + 3NaOH = Fe(OH)<sub>3</sub>↓ + 3NaCl',
  ion:'Fe<sup>3+</sup> + 3OH<sup>−</sup> = Fe(OH)<sub>3</sub>↓',
  p:'生成<em>红褐色</em>沉淀。',
  n:'Fe(OH)₃ 是唯一常见的红褐色沉淀，可用于鉴别 Fe³⁺。'
},
{
  c:'salt', t:['沉淀'],
  e:'FeSO<sub>4</sub> + 2NaOH = Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>',
  ion:'Fe<sup>2+</sup> + 2OH<sup>−</sup> = Fe(OH)<sub>2</sub>↓',
  p:'先生成<em>白色</em>沉淀，迅速变为<em>灰绿色</em>，最终变成<em>红褐色</em>。',
  n:'变色原因：4Fe(OH)₂ + O₂ + 2H₂O = 4Fe(OH)₃；实验时需用煮沸过的蒸馏水并加植物油隔绝空气。'
},
{
  c:'salt', t:['沉淀'],
  e:'MgCl<sub>2</sub> + 2NaOH = Mg(OH)<sub>2</sub>↓ + 2NaCl',
  ion:'Mg<sup>2+</sup> + 2OH<sup>−</sup> = Mg(OH)<sub>2</sub>↓',
  p:'生成<em>白色</em>沉淀。',
  n:'Mg(OH)₂ 难溶于水，但溶于盐酸；工业上用作阻燃剂。'
},
{
  c:'salt', t:['沉淀'],
  e:'AlCl<sub>3</sub> + 3NH<sub>3</sub>·H<sub>2</sub>O = Al(OH)<sub>3</sub>↓ + 3NH<sub>4</sub>Cl',
  ion:'Al<sup>3+</sup> + 3NH<sub>3</sub>·H<sub>2</sub>O = Al(OH)<sub>3</sub>↓ + 3NH<sub>4</sub><sup>+</sup>',
  p:'生成<em>白色</em>絮状沉淀，沉淀<em>不溶于</em>过量氨水。',
  n:'制备 Al(OH)₃ 要用氨水而不是 NaOH，因为过量强碱会把沉淀溶解。'
},
{
  c:'salt', t:['沉淀'],
  e:'AlCl<sub>3</sub> + 4NaOH(过量) = NaAlO<sub>2</sub> + 3NaCl + 2H<sub>2</sub>O',
  ion:'Al<sup>3+</sup> + 4OH<sup>−</sup> = AlO<sub>2</sub><sup>−</sup> + 2H<sub>2</sub>O',
  p:'先出现<em>白色</em>沉淀，继续滴加 NaOH 后沉淀<em>溶解</em>，溶液澄清。',
  n:'“先沉淀后溶解”是 Al³⁺ 的特征现象，也是与 Mg²⁺ 的鉴别依据。'
},
{
  c:'salt', t:[],
  e:'Al(OH)<sub>3</sub> + NaOH = NaAlO<sub>2</sub> + 2H<sub>2</sub>O',
  ion:'Al(OH)<sub>3</sub> + OH<sup>−</sup> = AlO<sub>2</sub><sup>−</sup> + 2H<sub>2</sub>O',
  p:'白色沉淀逐渐溶解，溶液澄清。',
  n:'氢氧化铝是两性氢氧化物，既能与强酸又能与强碱反应。'
},
{
  c:'salt', t:[],
  e:'Al(OH)<sub>3</sub> + 3HCl = AlCl<sub>3</sub> + 3H<sub>2</sub>O',
  ion:'Al(OH)<sub>3</sub> + 3H<sup>+</sup> = Al<sup>3+</sup> + 3H<sub>2</sub>O',
  p:'白色沉淀溶解，溶液澄清。'
},
{
  c:'salt', t:[],
  e:'Fe(OH)<sub>3</sub> + 3HCl = FeCl<sub>3</sub> + 3H<sub>2</sub>O',
  ion:'Fe(OH)<sub>3</sub> + 3H<sup>+</sup> = Fe<sup>3+</sup> + 3H<sub>2</sub>O',
  p:'红褐色沉淀溶解，溶液变为黄色。'
},
{
  c:'salt', t:[],
  e:'Cu(OH)<sub>2</sub> + 2HCl = CuCl<sub>2</sub> + 2H<sub>2</sub>O',
  ion:'Cu(OH)<sub>2</sub> + 2H<sup>+</sup> = Cu<sup>2+</sup> + 2H<sub>2</sub>O',
  p:'蓝色沉淀溶解，溶液变为蓝绿色。'
},
{
  c:'salt', t:[],
  e:'Mg(OH)<sub>2</sub> + 2HCl = MgCl<sub>2</sub> + 2H<sub>2</sub>O',
  ion:'Mg(OH)<sub>2</sub> + 2H<sup>+</sup> = Mg<sup>2+</sup> + 2H<sub>2</sub>O',
  p:'白色沉淀溶解，溶液澄清。'
},
{
  c:'salt', t:['沉淀'],
  e:'Na<sub>2</sub>CO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + 2NaOH',
  ion:'Ca<sup>2+</sup> + CO<sub>3</sub><sup>2−</sup> = CaCO<sub>3</sub>↓',
  p:'生成白色沉淀，上层清液呈强碱性。',
  n:'工业苛化法制烧碱。'
},
{
  c:'salt', t:['沉淀'],
  e:'Na<sub>2</sub>S + CuSO<sub>4</sub> = CuS↓ + Na<sub>2</sub>SO<sub>4</sub>',
  ion:'Cu<sup>2+</sup> + S<sup>2−</sup> = CuS↓',
  p:'生成<em>黑色</em>沉淀，不溶于稀盐酸。',
  n:'CuS 溶解度极小，甚至不溶于稀硫酸，可用于除去废水中的 Cu²⁺。'
},
{
  c:'salt', t:[],
  e:'NaHCO<sub>3</sub> + NaOH = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O',
  ion:'HCO<sub>3</sub><sup>−</sup> + OH<sup>−</sup> = CO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O',
  p:'无明显现象。',
  n:'不能用 Ca(OH)₂ 代替 NaOH，否则会生成 CaCO₃ 沉淀。'
},
{
  c:'salt', t:['沉淀'],
  e:'Ba(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub> = BaSO<sub>4</sub>↓ + 2H<sub>2</sub>O',
  ion:'Ba<sup>2+</sup> + 2OH<sup>−</sup> + 2H<sup>+</sup> + SO<sub>4</sub><sup>2−</sup> = BaSO<sub>4</sub>↓ + 2H<sub>2</sub>O',
  p:'生成白色沉淀，溶液导电性先减弱后增强（导电性实验）。',
  n:'该反应的离子方程式不能拆成两个独立反应，因为 Ba²⁺ 与 SO₄²⁻、H⁺ 与 OH⁻ 同时等量反应。'
},
{
  c:'salt', t:['气体','加热'],
  e:'Ba(OH)<sub>2</sub> + (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub> {{Δ}} BaSO<sub>4</sub>↓ + 2NH<sub>3</sub>↑ + 2H<sub>2</sub>O',
  ion:'Ba<sup>2+</sup> + 2OH<sup>−</sup> + 2NH<sub>4</sub><sup>+</sup> + SO<sub>4</sub><sup>2−</sup> {{Δ}} BaSO<sub>4</sub>↓ + 2NH<sub>3</sub>↑ + 2H<sub>2</sub>O',
  p:'生成白色沉淀，同时放出有刺激性气味、能使湿润红色石蕊试纸变蓝的气体。',
  n:'同时检验 NH₄⁺ 与 SO₄²⁻ 的经典组合。'
},
{
  c:'salt', t:['气体'],
  e:'CaCO<sub>3</sub> + 2CH<sub>3</sub>COOH = Ca(CH<sub>3</sub>COO)<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'CaCO<sub>3</sub> + 2CH<sub>3</sub>COOH = Ca<sup>2+</sup> + 2CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'蛋壳表面缓慢产生气泡，蛋壳逐渐变软。',
  n:'食醋除水垢的原理；弱酸与碳酸盐反应，弱酸不拆写。'
},
/* ---------- 气体制备与检验 ---------- */
{
  c:'gas', t:['氧化还原','加热','催化剂','分解'],
  e:'2K<b data-s="red">Cl</b><b data-s="ox">O</b><sub>3</sub> {{MnO₂, Δ}} 2K<b data-s="redp">Cl</b> + 3<b data-s="oxp">O</b><sub>2</sub>↑',
  p:'固体熔化并产生气泡，收集到能使带火星木条复燃的气体。',
  o:{x:12,r:12}, n:'实验室制氧气；MnO₂ 是催化剂，反应前后质量与化学性质不变。'
},
{
  c:'gas', t:['氧化还原','催化剂','分解'],
  e:'2H<sub>2</sub><b data-s="ox red">O</b><sub>2</sub> {{MnO₂}} 2H<sub>2</sub><b data-s="redp">O</b> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'迅速产生大量气泡，带火星木条复燃。',
  o:{x:2,r:2}, n:'H₂O₂ 中 −1 价氧既升高到 0 价又降低到 −2 价，属于歧化反应。'
},
{
  c:'gas', t:['氧化还原','加热','分解'],
  e:'2K<b data-s="red">Mn</b><b data-s="ox">O</b><sub>4</sub> {{Δ}} K<sub>2</sub>Mn<b data-s="oxp">O</b><sub>4</sub> + <b data-s="redp">Mn</b>O<sub>2</sub> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'紫黑色固体受热分解，产生气泡，固体变为黑色与绿色的混合物。',
  o:{x:4,r:4}, n:'高锰酸钾受热分解，不需要催化剂；试管口应略向下倾斜并塞棉花。'
},
{
  c:'gas', t:['氧化还原','加热','分解'],
  e:'2<b data-s="red">Hg</b><b data-s="ox">O</b> {{Δ}} 2<b data-s="redp">Hg</b> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'红色粉末逐渐变暗，管壁出现银白色汞珠，产生助燃气体。',
  o:{x:4,r:4}, n:'拉瓦锡测定空气组成的经典实验。'
},
{
  c:'gas', t:['加热'],
  e:'NaCl + H<sub>2</sub>SO<sub>4</sub>(浓) {{Δ}} NaHSO<sub>4</sub> + HCl↑',
  p:'产生<em>白雾</em>，气体有刺激性气味，能使湿润蓝色石蕊试纸变红。',
  n:'不加热时生成 NaHSO₄；高温下继续反应生成 Na₂SO₄ 与 HCl。'
},
{
  c:'gas', t:['加热'],
  e:'2NaCl + H<sub>2</sub>SO<sub>4</sub>(浓) {{高温}} Na<sub>2</sub>SO<sub>4</sub> + 2HCl↑',
  p:'强热时产生大量氯化氢气体，遇水蒸气形成白雾。',
  n:'实验室制氯化氢；工业上也可用 H₂ 与 Cl₂ 合成。'
},
{
  c:'gas', t:['加热'],
  e:'NH<sub>4</sub>Cl + NaOH {{Δ}} NaCl + NH<sub>3</sub>↑ + H<sub>2</sub>O',
  ion:'NH<sub>4</sub><sup>+</sup> + OH<sup>−</sup> {{Δ}} NH<sub>3</sub>↑ + H<sub>2</sub>O',
  p:'产生有<em>刺激性气味</em>的气体，能使湿润的红色石蕊试纸变<em>蓝</em>。',
  n:'检验 NH₄⁺ 的标准方法：加浓 NaOH 溶液加热，用湿润红色石蕊试纸检验。'
},
{
  c:'gas', t:['加热'],
  e:'(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub> + 2NaOH {{Δ}} Na<sub>2</sub>SO<sub>4</sub> + 2NH<sub>3</sub>↑ + 2H<sub>2</sub>O',
  ion:'NH<sub>4</sub><sup>+</sup> + OH<sup>−</sup> {{Δ}} NH<sub>3</sub>↑ + H<sub>2</sub>O',
  p:'放出刺激性气味气体，试纸变蓝。'
},
{
  c:'gas', t:['加热'],
  e:'Ca(OH)<sub>2</sub> + 2NH<sub>4</sub>Cl {{Δ}} CaCl<sub>2</sub> + 2NH<sub>3</sub>↑ + 2H<sub>2</sub>O',
  p:'产生大量氨气，可用向下排空气法收集。',
  n:'实验室制氨气的常用方法；用碱石灰干燥，不能用浓硫酸或无水 CaCl₂。'
},
{
  c:'gas', t:[],
  e:'FeS + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>S↑',
  ion:'FeS + 2H<sup>+</sup> = Fe<sup>2+</sup> + H<sub>2</sub>S↑',
  p:'产生有<em>臭鸡蛋气味</em>的有毒气体。',
  n:'用稀盐酸或稀硫酸，不能用浓硫酸或硝酸（会把 H₂S 氧化）。'
},
{
  c:'gas', t:[],
  e:'Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> = Na<sub>2</sub>SO<sub>4</sub> + SO<sub>2</sub>↑ + H<sub>2</sub>O',
  ion:'SO<sub>3</sub><sup>2−</sup> + 2H<sup>+</sup> = SO<sub>2</sub>↑ + H<sub>2</sub>O',
  p:'产生有刺激性气味的气体，能使品红溶液褪色。',
  n:'实验室制 SO₂；用向上排空气法收集，不能用碱液作干燥剂。'
},
{
  c:'gas', t:['氧化还原'],
  e:'2K<b data-s="red">Mn</b>O<sub>4</sub> + 16H<b data-s="ox">Cl</b>(浓) = 2KCl + 2<b data-s="redp">Mn</b>Cl<sub>2</sub> + 5<b data-s="oxp">Cl</b><sub>2</sub>↑ + 8H<sub>2</sub>O',
  ion:'2MnO<sub>4</sub><sup>−</sup> + 16H<sup>+</sup> + 10Cl<sup>−</sup> = 2Mn<sup>2+</sup> + 5Cl<sub>2</sub>↑ + 8H<sub>2</sub>O',
  p:'紫红色溶液褪色，产生黄绿色气体。',
  o:{x:10,r:10}, n:'不需要加热即可制氯气，反应比用 MnO₂ 更剧烈。'
},
{
  c:'gas', t:['氧化还原'],
  e:'K<b data-s="red">Cl</b>O<sub>3</sub> + 6H<b data-s="ox">Cl</b>(浓) = KCl + 3<b data-s="oxp redp">Cl</b><sub>2</sub>↑ + 3H<sub>2</sub>O',
  p:'产生大量黄绿色气体。',
  o:{x:5,r:5}, n:'归中反应：+5 价 Cl 与 −1 价 Cl 归中为 0 价，产物只有一种价态。'
},
{
  c:'gas', t:[],
  e:'CaC<sub>2</sub> + 2H<sub>2</sub>O = Ca(OH)<sub>2</sub> + C<sub>2</sub>H<sub>2</sub>↑',
  p:'电石遇水剧烈反应，产生有特殊臭味的气体，同时放出大量热。',
  n:'实验室制乙炔；用饱和食盐水代替水可减缓反应速率。'
},
{
  c:'gas', t:[],
  e:'Al<sub>4</sub>C<sub>3</sub> + 12H<sub>2</sub>O = 4Al(OH)<sub>3</sub>↓ + 3CH<sub>4</sub>↑',
  p:'产生可燃性气体甲烷。',
  n:'金属碳化物水解生成烃，可用于推断碳化物组成。'
},
{
  c:'gas', t:['氧化还原'],
  e:'2Na<sub>2</sub><b data-s="ox red">O</b><sub>2</sub> + 2H<sub>2</sub>O = 4Na<b data-s="redp">O</b>H + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'淡黄色固体投入水中，剧烈反应并放出能使带火星木条复燃的气体。',
  o:{x:2,r:2}, n:'Na₂O₂ 中氧为 −1 价，发生歧化：一部分升高为 0 价，一部分降为 −2 价。'
},
{
  c:'gas', t:['氧化还原'],
  e:'2Na<sub>2</sub><b data-s="ox red">O</b><sub>2</sub> + 2CO<sub>2</sub> = 2Na<sub>2</sub>C<b data-s="redp">O</b><sub>3</sub> + <b data-s="oxp">O</b><sub>2</sub>',
  p:'淡黄色粉末在二氧化碳中反应，放出助燃气体。',
  o:{x:2,r:2}, n:'因此 Na₂O₂ 可用于潜水艇、呼吸面具中供氧。'
},

/* ---------- 热分解与不稳定性 ---------- */
{
  c:'decomp', t:['分解','加热'],
  e:'CaCO<sub>3</sub> {{高温}} CaO + CO<sub>2</sub>↑',
  p:'石灰石高温煅烧，逐渐碎裂，放出能使石灰水变浑浊的气体。',
  n:'工业制生石灰；这是典型的吸热分解反应。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'MgCO<sub>3</sub> {{Δ}} MgO + CO<sub>2</sub>↑',
  p:'白色固体受热分解，放出气体。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'Cu<sub>2</sub>(OH)<sub>2</sub>CO<sub>3</sub> {{Δ}} 2CuO + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'绿色固体逐渐变为<em>黑色</em>，管壁出现水珠，放出使石灰水变浑浊的气体。',
  n:'注意：铜的化合价始终为 +2，此反应属于分解反应而非氧化还原反应。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'2NaHCO<sub>3</sub> {{Δ}} Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'固体受热放出气体，管口有水珠。',
  n:'除 Na₂CO₃ 中混有的 NaHCO₃ 用加热法；鉴别两者可用加热或滴加 CaCl₂ 溶液。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'2Fe(OH)<sub>3</sub> {{Δ}} Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O',
  p:'红褐色沉淀受热变为<em>红棕色</em>粉末，同时失去水分。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'Cu(OH)<sub>2</sub> {{Δ}} CuO + H<sub>2</sub>O',
  p:'蓝色沉淀受热变为<em>黑色</em>固体。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'Mg(OH)<sub>2</sub> {{Δ}} MgO + H<sub>2</sub>O',
  p:'白色固体受热失水，生成白色粉末。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'2Al(OH)<sub>3</sub> {{Δ}} Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O',
  p:'白色固体受热失水。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'2H<sub>2</sub>O<sub>2</sub> {{Δ}} 2H<sub>2</sub>O + O<sub>2</sub>↑',
  p:'缓慢放出气泡，带火星木条复燃。',
  n:'H₂O₂ 见光、受热均易分解，故应保存在棕色瓶中并置于阴凉处。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'NH<sub>4</sub>Cl {{Δ}} NH<sub>3</sub>↑ + HCl↑',
  p:'白色固体受热消失，试管口重新生成白色固体（NH₄Cl）。',
  n:'看似升华，实为分解后再化合；因此不能用加热法分离 NH₄Cl 与 NaCl。'
},
{
  c:'decomp', t:['分解','加热','氧化还原'],
  e:'<b data-s="ox">N</b>H<sub>4</sub><b data-s="red">N</b>O<sub>3</sub> {{Δ}} <b data-s="oxp redp">N</b><sub>2</sub>O↑ + 2H<sub>2</sub>O',
  p:'受热分解，产生无色气体，固体消失。',
  o:{x:4,r:4}, n:'归中反应：−3 价 N 与 +5 价 N 归中为 +1 价（N₂O）。硝酸铵受热或受撞击可能爆炸，不能与易燃物混放。'
},
{
  c:'decomp', t:['分解','加热','氧化还原'],
  e:'2<b data-s="red">Ag</b>N<b data-s="ox">O</b><sub>3</sub> {{Δ}} 2<b data-s="redp">Ag</b> + 2NO<sub>2</sub>↑ + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'白色固体受热变黑，产生红棕色气体。',
  o:{x:4,r:4}, n:'AgNO₃ 见光也会分解，必须保存在棕色试剂瓶中。'
},
{
  c:'decomp', t:['分解','加热','氧化还原'],
  e:'2Cu(<b data-s="red">N</b><b data-s="ox">O</b><sub>3</sub>)<sub>2</sub> {{Δ}} 2CuO + 4<b data-s="redp">N</b>O<sub>2</sub>↑ + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'蓝色晶体受热变为黑色，产生红棕色气体。',
  o:{x:4,r:4}
},
{
  c:'decomp', t:['分解','氧化还原'],
  e:'4H<b data-s="red">N</b><b data-s="ox">O</b><sub>3</sub> {{光照}} 4<b data-s="redp">N</b>O<sub>2</sub>↑ + <b data-s="oxp">O</b><sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'浓硝酸久置后变黄，瓶内出现红棕色气体。',
  o:{x:4,r:4}, n:'硝酸见光或受热分解，需用棕色瓶并置于阴凉避光处保存。'
},
{
  c:'decomp', t:['分解','氧化还原'],
  e:'2H<b data-s="red">Cl</b><b data-s="ox">O</b> {{光照}} 2H<b data-s="redp">Cl</b> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'次氯酸水溶液见光后逐渐失效，放出气体。',
  o:{x:4,r:4}, n:'因此漂白粉、氯水都需避光保存，久置会失效。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'H<sub>2</sub>SiO<sub>3</sub> {{Δ}} SiO<sub>2</sub> + H<sub>2</sub>O',
  p:'白色胶状物受热脱水，生成白色固体。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'CuSO<sub>4</sub>·5H<sub>2</sub>O {{Δ}} CuSO<sub>4</sub> + 5H<sub>2</sub>O',
  p:'蓝色晶体逐渐变为<em>白色</em>粉末，试管口有水珠。',
  n:'白色无水硫酸铜遇水变蓝，可用于检验水的存在。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'CaSO<sub>4</sub>·2H<sub>2</sub>O {{Δ}} CaSO<sub>4</sub> + 2H<sub>2</sub>O',
  p:'石膏受热失去结晶水，变为白色粉末（熟石膏）。',
  n:'2CaSO₄·H₂O 与水混合后重新凝固，用于石膏绷带与建筑。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'(NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub> {{Δ}} 2NH<sub>3</sub>↑ + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'白色固体受热完全分解，固体消失。',
  n:'碳酸铵受热分解无固体残留，可作为“完全分解”的典型例子。'
},
/* ---------- 歧化与归中 ---------- */
{
  c:'disprop', t:['氧化还原','歧化','可逆'],
  e:'<b data-s="ox red">Cl</b><sub>2</sub> + H<sub>2</sub>O ⇌ H<b data-s="redp">Cl</b> + H<b data-s="oxp">Cl</b>O',
  ion:'Cl<sub>2</sub> + H<sub>2</sub>O ⇌ H<sup>+</sup> + Cl<sup>−</sup> + HClO',
  p:'黄绿色气体部分溶解，溶液呈<em>浅黄绿色</em>，具有漂白性和酸性。',
  o:{x:1,r:1}, n:'氯水中含 Cl₂、H₂O、HClO 三种分子与 H⁺、Cl⁻、ClO⁻、OH⁻ 四种离子；HClO 是弱酸，离子式中不拆。'
},
{
  c:'disprop', t:['氧化还原','歧化'],
  e:'<b data-s="ox red">Cl</b><sub>2</sub> + 2NaOH = Na<b data-s="redp">Cl</b> + Na<b data-s="oxp">Cl</b>O + H<sub>2</sub>O',
  ion:'Cl<sub>2</sub> + 2OH<sup>−</sup> = Cl<sup>−</sup> + ClO<sup>−</sup> + H<sub>2</sub>O',
  p:'黄绿色气体被吸收，溶液变为无色。',
  o:{x:1,r:1}, n:'工业制漂白液的原理；NaOH 必须过量，否则 Cl₂ 溶解不充分。'
},
{
  c:'disprop', t:['氧化还原','歧化'],
  e:'2<b data-s="ox red">Cl</b><sub>2</sub> + 2Ca(OH)<sub>2</sub> = Ca<b data-s="redp">Cl</b><sub>2</sub> + Ca(<b data-s="oxp">Cl</b>O)<sub>2</sub> + 2H<sub>2</sub>O',
  p:'石灰乳中通入氯气，得到<em>漂白粉</em>（白色固体）。',
  o:{x:2,r:2}, n:'漂白粉的有效成分是 Ca(ClO)₂；久置会与空气中 CO₂、H₂O 反应失效。'
},
{
  c:'disprop', t:['氧化还原','歧化','加热'],
  e:'3<b data-s="ox red">Cl</b><sub>2</sub> + 6KOH {{Δ}} 5K<b data-s="redp">Cl</b> + K<b data-s="oxp">Cl</b>O<sub>3</sub> + 3H<sub>2</sub>O',
  p:'热浓碱液中氯气被吸收，生成无色溶液。',
  o:{x:5,r:5}, n:'温度不同产物不同：冷稀碱得次氯酸盐（Cl 为 +1），热浓碱得氯酸盐（Cl 为 +5）。'
},
{
  c:'disprop', t:['氧化还原','歧化'],
  e:'3<b data-s="ox red">N</b>O<sub>2</sub> + H<sub>2</sub>O = 2H<b data-s="oxp">N</b>O<sub>3</sub> + <b data-s="redp">N</b>O',
  ion:'3NO<sub>2</sub> + H<sub>2</sub>O = 2H<sup>+</sup> + 2NO<sub>3</sub><sup>−</sup> + NO',
  p:'红棕色气体溶解，溶液呈酸性，同时有无色气体逸出。',
  o:{x:2,r:2}, n:'工业制硝酸的吸收塔反应；尾气中的 NO 需循环氧化后再吸收。'
},
{
  c:'disprop', t:['氧化还原','歧化'],
  e:'2<b data-s="ox red">N</b>O<sub>2</sub> + 2NaOH = Na<b data-s="redp">N</b>O<sub>2</sub> + Na<b data-s="oxp">N</b>O<sub>3</sub> + H<sub>2</sub>O',
  p:'红棕色气体被碱液吸收，溶液无色。',
  o:{x:1,r:1}, n:'用 NaOH 溶液吸收氮氧化物尾气，防止污染。'
},
{
  c:'disprop', t:['氧化还原','歧化','加热'],
  e:'3<b data-s="ox red">S</b> + 6NaOH {{Δ}} 2Na<sub>2</sub><b data-s="redp">S</b> + Na<sub>2</sub><b data-s="oxp">S</b>O<sub>3</sub> + 3H<sub>2</sub>O',
  p:'淡黄色硫粉在热碱中溶解，溶液呈黄色。',
  o:{x:4,r:4}, n:'硫在碱中歧化；该反应可用于除去残留的硫单质（如试管壁上的硫）。'
},
{
  c:'disprop', t:['氧化还原','歧化','加热'],
  e:'4K<b data-s="ox red">Cl</b>O<sub>3</sub> {{Δ}} 3K<b data-s="oxp">Cl</b>O<sub>4</sub> + K<b data-s="redp">Cl</b>',
  p:'白色固体受热发生自身氧化还原，得到高氯酸钾与氯化钾。',
  o:{x:6,r:6}, n:'注意与“2KClO₃ 在 MnO₂ 催化下分解制 O₂”区分：无催化剂时主要发生歧化。'
},
{
  c:'disprop', t:['氧化还原','归中'],
  e:'2Na<sub>2</sub><b data-s="ox">S</b> + Na<sub>2</sub><b data-s="red">S</b>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> = 3Na<sub>2</sub>SO<sub>4</sub> + 3<b data-s="oxp redp">S</b>↓ + 3H<sub>2</sub>O',
  p:'溶液中出现<em>淡黄色</em>浑浊（硫沉淀）。',
  o:{x:4,r:4}, n:'归中反应：−2 价 S 与 +4 价 S 生成 0 价 S，产物中硫只有一种价态。'
},
{
  c:'disprop', t:['氧化还原','歧化','加热'],
  e:'3<b data-s="ox red">Br</b><sub>2</sub> + 6NaOH {{Δ}} 5Na<b data-s="redp">Br</b> + Na<b data-s="oxp">Br</b>O<sub>3</sub> + 3H<sub>2</sub>O',
  p:'红棕色溴被热碱液吸收，溶液无色。',
  o:{x:5,r:5}, n:'卤素在热浓碱中的歧化规律一致，可用于处理溴蒸气泄漏。'
},

/* ---------- 工业制备与冶金 ---------- */
{
  c:'industry', t:['氧化还原','高温'],
  e:'4Fe<b data-s="ox">S</b><sub>2</sub> + 11<b data-s="red">O</b><sub>2</sub> {{高温}} 2Fe<sub>2</sub><b data-s="redp">O</b><sub>3</sub> + 8<b data-s="oxp">S</b>O<sub>2</sub>↑',
  p:'黄铁矿在沸腾炉中剧烈燃烧，发出红光，产生有刺激性气味的气体。',
  o:{x:44,r:44}, n:'接触法制硫酸的第一步（沸腾炉）；FeS₂ 中 Fe 为 +2、S 为 −1 价。'
},
{
  c:'industry', t:['沉淀'],
  e:'NH<sub>3</sub> + CO<sub>2</sub> + H<sub>2</sub>O + NaCl = NaHCO<sub>3</sub>↓ + NH<sub>4</sub>Cl',
  ion:'Na<sup>+</sup> + NH<sub>3</sub> + CO<sub>2</sub> + H<sub>2</sub>O = NaHCO<sub>3</sub>↓ + NH<sub>4</sub><sup>+</sup>',
  p:'溶液中析出<em>白色</em>碳酸氢钠晶体。',
  n:'侯氏制碱法（联合制碱法）的核心反应；先通 NH₃ 再通 CO₂，因为 NH₃ 极易溶且使溶液显碱性，利于吸收 CO₂。'
},
{
  c:'industry', t:['化合','加热'],
  e:'2NH<sub>3</sub> + CO<sub>2</sub> {{Δ, 加压}} CO(NH<sub>2</sub>)<sub>2</sub> + H<sub>2</sub>O',
  p:'在加压加热条件下生成尿素。',
  n:'尿素是含氮量最高的固体氮肥（含 N 约 46%）。'
},
{
  c:'industry', t:[],
  e:'NH<sub>3</sub> + HNO<sub>3</sub> = NH<sub>4</sub>NO<sub>3</sub>',
  p:'两种气体或浓溶液接触产生白烟。',
  n:'硝酸铵既是氮肥又是炸药成分，储存需防潮防撞击。'
},
{
  c:'industry', t:['氧化还原','高温'],
  e:'CaO + 3<b data-s="ox red">C</b> {{高温}} Ca<b data-s="redp">C</b><sub>2</sub> + <b data-s="oxp">C</b>O↑',
  p:'电炉中高温反应，生成电石（碳化钙）。',
  o:{x:2,r:2}, n:'碳化钙中碳为 −1 价，此反应中碳既被氧化又被还原，属歧化反应。'
},
{
  c:'industry', t:['氧化还原','高温'],
  e:'TiO<sub>2</sub> + 2<b data-s="ox">C</b> + 2<b data-s="red">Cl</b><sub>2</sub> {{高温}} Ti<b data-s="redp">Cl</b><sub>4</sub> + 2<b data-s="oxp">C</b>O',
  p:'高温氯化，生成液态四氯化钛。',
  o:{x:4,r:4}, n:'氯化法生产钛白粉的中间步骤；TiCl₄ 沸点低，易与杂质分离。'
},
{
  c:'industry', t:['氧化还原','高温'],
  e:'<b data-s="red">Ti</b>Cl<sub>4</sub> + 2<b data-s="ox">Mg</b> {{高温}} <b data-s="redp">Ti</b> + 2<b data-s="oxp">Mg</b>Cl<sub>2</sub>',
  p:'剧烈反应，生成海绵状金属钛。',
  o:{x:4,r:4}, n:'镁热还原法（Kroll 法）；钛在高温下易与氧气、氮气反应，必须在氩气保护下进行。'
},
{
  c:'industry', t:['氧化还原','高温'],
  e:'<b data-s="red">Si</b>Cl<sub>4</sub> + 2<b data-s="ox">H</b><sub>2</sub> {{高温}} <b data-s="redp">Si</b> + 4<b data-s="oxp">H</b>Cl',
  p:'高温下还原，得到多晶硅。',
  o:{x:4,r:4}, n:'高纯硅制备的关键步骤，产物需进一步区熔提纯。'
},
{
  c:'industry', t:['氧化还原','高温'],
  e:'<b data-s="red">Si</b>HCl<sub>3</sub> + <b data-s="ox">H</b><sub>2</sub> {{高温}} <b data-s="redp">Si</b> + 3<b data-s="oxp">H</b>Cl',
  p:'高温还原，在硅芯上沉积出高纯硅。',
  o:{x:2,r:2}, n:'西门子法（改良），用于生产半导体级多晶硅。'
},
{
  c:'industry', t:['氧化还原','催化剂','加热'],
  e:'<b data-s="red">C</b>O + 2<b data-s="ox">H</b><sub>2</sub> {{催化剂, Δ}} <b data-s="redp">C</b><b data-s="oxp">H</b><sub>3</sub>OH',
  p:'在催化剂作用下合成甲醇。',
  o:{x:4,r:4}, n:'碳的化合价由 +2 降到 −2（有机化学中按氢氧数计算），这是工业合成甲醇的基础。'
},
{
  c:'industry', t:['加热','催化剂'],
  e:'C<sub>16</sub>H<sub>34</sub> {{催化剂, Δ}} C<sub>8</sub>H<sub>18</sub> + C<sub>8</sub>H<sub>16</sub>',
  p:'长链烷烃断裂为短链烷烃与烯烃。',
  n:'石油裂化的简化表示，目的是提高汽油产量与辛烷值。'
},

/* ---------- 电解与原电池 ---------- */
{
  c:'electro', t:['氧化还原','电解'],
  e:'2Na<b data-s="ox">Cl</b> + 2<b data-s="red">H</b><sub>2</sub>O {{电解}} 2NaOH + <b data-s="redp">H</b><sub>2</sub>↑ + <b data-s="oxp">Cl</b><sub>2</sub>↑',
  ion:'2Cl<sup>−</sup> + 2H<sub>2</sub>O {{电解}} 2OH<sup>−</sup> + H<sub>2</sub>↑ + Cl<sub>2</sub>↑',
  p:'两极均产生气泡，阴极气体可燃，阳极气体呈黄绿色且能使淀粉碘化钾试纸变蓝；阴极区溶液变红（滴酚酞）。',
  o:{x:2,r:2}, n:'氯碱工业；阳极用石墨或钛涂钌，阴极用铁；离子交换膜防止 Cl₂ 与 NaOH 反应。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'2<b data-s="red">Al</b><sub>2</sub><b data-s="ox">O</b><sub>3</sub> {{电解, 冰晶石}} 4<b data-s="redp">Al</b> + 3<b data-s="oxp">O</b><sub>2</sub>↑',
  p:'阴极析出<em>银白色</em>液态铝，阳极碳块被消耗并产生气体。',
  o:{x:12,r:12}, n:'电解熔融氧化铝（加冰晶石降低熔点至约 1000 ℃）；不能电解 AlCl₃ 水溶液制铝。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'2<b data-s="red">Na</b><b data-s="ox">Cl</b> {{电解}} 2<b data-s="redp">Na</b> + <b data-s="oxp">Cl</b><sub>2</sub>↑',
  p:'熔融氯化钠通电后，阴极析出银白色金属钠，阳极产生黄绿色气体。',
  o:{x:2,r:2}, n:'电解熔融态（不是水溶液）；钠的工业制法。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'<b data-s="red">Mg</b><b data-s="ox">Cl</b><sub>2</sub> {{电解}} <b data-s="redp">Mg</b> + <b data-s="oxp">Cl</b><sub>2</sub>↑',
  p:'熔融氯化镁电解，阴极得到银白色镁。',
  o:{x:2,r:2}, n:'海水提镁的最后一步；MgO 熔点过高，故用电解 MgCl₂ 的方法。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'2<b data-s="ox">H</b><sub>2</sub><b data-s="red">O</b> {{电解}} 2<b data-s="oxp">H</b><sub>2</sub>↑ + <b data-s="redp">O</b><sub>2</sub>↑',
  p:'两极均产生气泡，阴极与阳极气体体积比约为 <em>2:1</em>。',
  o:{x:4,r:4}, n:'电解水时加入少量硫酸或 NaOH 增强导电性；阴极氢气、阳极氧气。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'<b data-s="red">Cu</b><b data-s="ox">Cl</b><sub>2</sub> {{电解}} <b data-s="redp">Cu</b> + <b data-s="oxp">Cl</b><sub>2</sub>↑',
  p:'阴极析出红色铜，阳极产生黄绿色气体。',
  o:{x:2,r:2}
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'2<b data-s="red">Cu</b>SO<sub>4</sub> + 2H<sub>2</sub><b data-s="ox">O</b> {{电解}} 2<b data-s="redp">Cu</b> + <b data-s="oxp">O</b><sub>2</sub>↑ + 2H<sub>2</sub>SO<sub>4</sub>',
  p:'阴极析出红色铜，阳极产生气泡，溶液酸性增强、蓝色变浅。',
  o:{x:4,r:4}, n:'电解硫酸铜溶液（惰性电极）；若阳极为粗铜，则用于电解精炼。'
},
{
  c:'electro', t:['氧化还原'],
  e:'2<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">O</b><sub>2</sub> {{燃料电池}} 2<b data-s="oxp">H</b><sub>2</sub><b data-s="redp">O</b>',
  p:'持续输出电能，唯一产物是水。',
  o:{x:4,r:4}, n:'氢氧燃料电池，能量转化率高、无污染；电解质可为酸性或碱性。'
},
{
  c:'electro', t:['氧化还原'],
  e:'<b data-s="ox">Pb</b> + <b data-s="red">Pb</b>O<sub>2</sub> + 2H<sub>2</sub>SO<sub>4</sub> = 2<b data-s="oxp redp">Pb</b>SO<sub>4</sub> + 2H<sub>2</sub>O',
  p:'铅蓄电池<em>放电</em>：正极二氧化铅、负极铅均转化为硫酸铅，溶液密度减小。',
  o:{x:2,r:2}, n:'放电时负极 Pb 被氧化，正极 PbO₂ 被还原；硫酸密度下降可作为放电程度的判据。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'2<b data-s="ox red">Pb</b>SO<sub>4</sub> + 2H<sub>2</sub>O {{充电}} <b data-s="redp">Pb</b> + <b data-s="oxp">Pb</b>O<sub>2</sub> + 2H<sub>2</sub>SO<sub>4</sub>',
  p:'铅蓄电池<em>充电</em>：硫酸铅重新转化为铅与二氧化铅，溶液密度增大。',
  o:{x:2,r:2}, n:'充电是放电的逆过程，需外接直流电源；过充电会电解水产生气体。'
},
{
  c:'electro', t:['氧化还原'],
  e:'2<b data-s="ox">Fe</b> + <b data-s="red">O</b><sub>2</sub> + 2H<sub>2</sub>O = 2<b data-s="oxp">Fe</b>(<b data-s="redp">O</b>H)<sub>2</sub>',
  p:'铁在中性、弱酸性环境中发生<em>吸氧腐蚀</em>，表面出现白色浑浊。',
  o:{x:4,r:4}, n:'钢铁腐蚀主要是吸氧腐蚀（不是析氢腐蚀）；负极反应 Fe − 2e⁻ = Fe²⁺。'
},
{
  c:'electro', t:['氧化还原'],
  e:'4<b data-s="ox">Fe</b>(OH)<sub>2</sub> + <b data-s="red">O</b><sub>2</sub> + 2H<sub>2</sub>O = 4<b data-s="oxp">Fe</b>(<b data-s="redp">O</b>H)<sub>3</sub>',
  p:'白色沉淀迅速变为灰绿色，最终成为<em>红褐色</em>铁锈的主要成分。',
  o:{x:4,r:4}, n:'Fe(OH)₃ 进一步脱水生成 Fe₂O₃·xH₂O，即铁锈。'
},
/* ---------- 配位与显色 ---------- */
{
  c:'complex', t:['可逆'],
  e:'FeCl<sub>3</sub> + 3KSCN ⇌ Fe(SCN)<sub>3</sub> + 3KCl',
  ion:'Fe<sup>3+</sup> + 3SCN<sup>−</sup> ⇌ Fe(SCN)<sub>3</sub>',
  p:'溶液立即变为<em>血红色</em>。',
  n:'检验 Fe³⁺ 最灵敏的方法；Fe²⁺ 不显色，故可用 KSCN 区分 Fe²⁺ 与 Fe³⁺。'
},
{
  c:'complex', t:[],
  e:'AgCl + 2NH<sub>3</sub>·H<sub>2</sub>O = [Ag(NH<sub>3</sub>)<sub>2</sub>]Cl + 2H<sub>2</sub>O',
  ion:'AgCl + 2NH<sub>3</sub>·H<sub>2</sub>O = [Ag(NH<sub>3</sub>)<sub>2</sub>]<sup>+</sup> + Cl<sup>−</sup> + 2H<sub>2</sub>O',
  p:'白色沉淀逐渐<em>溶解</em>，溶液澄清。',
  n:'配位反应；AgBr 微溶、AgI 不溶，故只有 AgCl 能溶于稀氨水，可用于区分三种卤化银。'
},
{
  c:'complex', t:[],
  e:'Ag<sub>2</sub>O + 4NH<sub>3</sub>·H<sub>2</sub>O = 2[Ag(NH<sub>3</sub>)<sub>2</sub>]OH + 3H<sub>2</sub>O',
  p:'棕黑色氧化银溶解，得到无色的<em>银氨溶液</em>。',
  n:'银氨溶液必须现配现用，久置会析出易爆的雷酸银。'
},
{
  c:'complex', t:[],
  e:'CuSO<sub>4</sub> + 4NH<sub>3</sub>·H<sub>2</sub>O = [Cu(NH<sub>3</sub>)<sub>4</sub>]SO<sub>4</sub> + 4H<sub>2</sub>O',
  p:'先生成蓝色沉淀，继续加氨水后沉淀溶解，得到<em>深蓝色</em>溶液。',
  n:'铜氨络离子的生成是检验 Cu²⁺ 的特征反应。'
},
{
  c:'complex', t:[],
  e:'Cu(OH)<sub>2</sub> + 4NH<sub>3</sub> = [Cu(NH<sub>3</sub>)<sub>4</sub>](OH)<sub>2</sub>',
  p:'蓝色沉淀溶解，溶液变为<em>深蓝色</em>。',
  n:'配位数 4，空间构型为平面正方形。'
},
{
  c:'complex', t:[],
  e:'Fe<sup>3+</sup> + 6C<sub>6</sub>H<sub>5</sub>OH → [Fe(C<sub>6</sub>H<sub>5</sub>O)<sub>6</sub>]<sup>3−</sup> + 6H<sup>+</sup>',
  p:'向苯酚溶液中滴加 FeCl₃ 溶液，立即出现<em>紫色</em>。',
  n:'苯酚的显色反应，可用于检验苯酚的存在；也是苯酚与 Fe³⁺ 形成配合物的结果。'
},
{
  c:'complex', t:[],
  e:'CuSO<sub>4</sub>·5H<sub>2</sub>O = [Cu(H<sub>2</sub>O)<sub>4</sub>]SO<sub>4</sub>·H<sub>2</sub>O',
  p:'蓝色晶体中含有<em>四水合铜离子</em>，这是其呈蓝色的原因。',
  n:'Cu²⁺ 在水溶液中以 [Cu(H<sub>2</sub>O)<sub>4</sub>]²⁺ 形式存在，呈蓝色；无水 CuSO₄ 为白色。'
},
{
  c:'complex', t:[],
  e:'Fe<sup>3+</sup> + 4Cl<sup>−</sup> ⇌ [FeCl<sub>4</sub>]<sup>−</sup>',
  p:'浓盐酸中 Fe³⁺ 的黄色加深，形成黄绿色络离子。',
  n:'解释“FeCl₃ 溶液加盐酸颜色变深”的原因。'
},

/* ---------- 有机反应 ---------- */
{
  c:'organic', t:['氧化还原','加热'],
  e:'<b data-s="ox">C</b>H<sub>4</sub> + 2<b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">C</b>O<sub>2</sub> + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'甲烷在空气中安静燃烧，发出<em>淡蓝色火焰</em>，放出大量热。',
  o:{x:8,r:8}, n:'甲烷燃烧火焰呈淡蓝色，含碳量高的有机物燃烧火焰更亮并可能冒黑烟。'
},
{
  c:'organic', t:['氧化还原','加热'],
  e:'<b data-s="ox">C</b><sub>2</sub>H<sub>4</sub> + 3<b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">C</b>O<sub>2</sub> + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'乙烯燃烧，火焰<em>明亮</em>并伴有黑烟。',
  o:{x:12,r:12}, n:'含碳量越高，燃烧越不充分、黑烟越明显。'
},
{
  c:'organic', t:['氧化还原','加热'],
  e:'2<b data-s="ox">C</b><sub>2</sub>H<sub>2</sub> + 5<b data-s="red">O</b><sub>2</sub> {{点燃}} 4<b data-s="oxp">C</b>O<sub>2</sub> + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'乙炔燃烧，火焰<em>明亮</em>并产生<em>浓黑烟</em>。',
  o:{x:20,r:20}, n:'氧炔焰温度可达 3000 ℃ 以上，用于焊接和切割金属。'
},
{
  c:'organic', t:['氧化还原','加热'],
  e:'2<b data-s="ox">C</b><sub>6</sub>H<sub>6</sub> + 15<b data-s="red">O</b><sub>2</sub> {{点燃}} 12<b data-s="oxp">C</b>O<sub>2</sub> + 6H<sub>2</sub><b data-s="redp">O</b>',
  p:'苯燃烧，火焰明亮并产生<em>大量黑烟</em>。',
  o:{x:60,r:60}, n:'苯含碳量高达 92.3%，燃烧极不充分，黑烟明显。'
},
{
  c:'organic', t:['氧化还原','加热'],
  e:'<b data-s="ox">C</b><sub>2</sub>H<sub>5</sub>OH + 3<b data-s="red">O</b><sub>2</sub> {{点燃}} 2<b data-s="oxp">C</b>O<sub>2</sub> + 3H<sub>2</sub><b data-s="redp">O</b>',
  p:'乙醇燃烧，发出<em>淡蓝色火焰</em>，放出大量热。',
  o:{x:12,r:12}, n:'乙醇可作为清洁燃料，被称为“绿色能源”。'
},
{
  c:'organic', t:['氧化还原'],
  e:'<b data-s="ox">C</b><sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6<b data-s="red">O</b><sub>2</sub> {{酶}} 6<b data-s="oxp">C</b>O<sub>2</sub> + 6H<sub>2</sub><b data-s="redp">O</b>',
  p:'葡萄糖在体内缓慢氧化，释放能量。',
  o:{x:24,r:24}, n:'呼吸作用的總反应式；与体外燃烧产物相同，但能量逐步释放。'
},
{
  c:'organic', t:['加热','光照'],
  e:'CH<sub>4</sub> + Cl<sub>2</sub> {{光照}} CH<sub>3</sub>Cl + HCl',
  p:'黄绿色气体颜色变浅，瓶内壁出现油状液滴，瓶口有白雾。',
  n:'取代反应，产物是混合物（一氯甲烷至四氯化碳）；需光照，黑暗中不反应。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'C<sub>6</sub>H<sub>6</sub> + Br<sub>2</sub> {{FeBr₃}} C<sub>6</sub>H<sub>5</sub>Br + HBr',
  p:'剧烈反应，产生<em>白雾</em>（HBr 遇水汽），生成无色油状液体。',
  n:'苯的溴代需要 FeBr₃ 催化（实际起催化作用的是 FeBr₃）；苯与溴水不反应，只能萃取。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'C<sub>6</sub>H<sub>6</sub> + HNO<sub>3</sub>(浓) {{浓硫酸, Δ}} C<sub>6</sub>H<sub>5</sub>NO<sub>2</sub> + H<sub>2</sub>O',
  p:'生成<em>无色油状</em>液体，有苦杏仁气味，密度大于水且有毒。',
  n:'硝化反应；浓硫酸作催化剂和吸水剂；需水浴加热（50–60 ℃）。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH<sub>2</sub>=CH<sub>2</sub> + Br<sub>2</sub> = CH<sub>2</sub>BrCH<sub>2</sub>Br',
  p:'溴的<em>红棕色褪去</em>，生成无色油状液体。',
  n:'加成反应，可使溴水或溴的四氯化碳溶液褪色，是检验碳碳双键的方法。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH<sub>2</sub>=CH<sub>2</sub> + H<sub>2</sub>O {{催化剂, Δ}} CH<sub>3</sub>CH<sub>2</sub>OH',
  p:'工业上由乙烯水合制乙醇。',
  n:'原子利用率为 100%，属于理想的“原子经济”反应。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH<sub>2</sub>=CH<sub>2</sub> + HCl {{催化剂}} CH<sub>3</sub>CH<sub>2</sub>Cl',
  p:'气体颜色变浅，生成无色液体。',
  n:'加成反应，符合马氏规则（此处对称烯烃无选择性）。'
},
{
  c:'organic', t:['催化剂'],
  e:'n CH<sub>2</sub>=CH<sub>2</sub> {{催化剂}} [CH<sub>2</sub>—CH<sub>2</sub>]<sub>n</sub>',
  p:'气体逐渐减少，生成白色固体（聚乙烯）。',
  n:'加聚反应，产物为高分子化合物，n 表示聚合度，不是具体数值。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH≡CH + 2Br<sub>2</sub> = CHBr<sub>2</sub>CHBr<sub>2</sub>',
  p:'溴的红棕色褪去，生成无色液体。',
  n:'三键可发生两步加成；1 mol 乙炔最多与 2 mol Br₂ 加成。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH≡CH + H<sub>2</sub>O {{催化剂, Δ}} CH<sub>3</sub>CHO',
  p:'生成有刺激性气味的液体（乙醛）。',
  n:'乙炔水化制乙醛，原子利用率为 100%。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'C<sub>6</sub>H<sub>6</sub> + 3H<sub>2</sub> {{催化剂, Δ}} C<sub>6</sub>H<sub>12</sub>',
  p:'苯环加氢，生成无色的环己烷。',
  n:'苯环中的碳碳键是介于单键与双键之间的独特键，故加成比烯烃困难。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH<sub>3</sub>CH<sub>2</sub>OH {{浓硫酸, 170℃}} CH<sub>2</sub>=CH<sub>2</sub>↑ + H<sub>2</sub>O',
  p:'产生能使溴水褪色的气体（乙烯）。',
  n:'消去反应；温度控制是关键：170 ℃ 消去，140 ℃ 分子间脱水成醚。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'2CH<sub>3</sub>CH<sub>2</sub>OH {{浓硫酸, 140℃}} CH<sub>3</sub>CH<sub>2</sub>OCH<sub>2</sub>CH<sub>3</sub> + H<sub>2</sub>O',
  p:'生成乙醚，无明显气体产生。',
  n:'取代反应（分子间脱水），与消去反应互为竞争。'
},
{
  c:'organic', t:['氧化还原','加热','催化剂'],
  e:'2CH<sub>3</sub>CH<sub>2</sub><b data-s="ox">O</b>H + <b data-s="red">O</b><sub>2</sub> {{Cu, Δ}} 2CH<sub>3</sub>CH<b data-s="oxp">O</b> + 2H<sub>2</sub><b data-s="redp">O</b>',
  p:'灼热的铜丝反复插入乙醇中，闻到<em>刺激性气味</em>（乙醛）。',
  o:{x:4,r:4}, n:'醇的催化氧化：与羟基相连的碳上必须有氢原子，否则不能发生（如叔醇）。'
},
{
  c:'organic', t:['氧化还原','加热','沉淀'],
  e:'CH<sub>3</sub>CH<b data-s="ox">O</b> + 2<b data-s="red">Ag</b>(NH<sub>3</sub>)<sub>2</sub>OH {{Δ}} CH<sub>3</sub>COONH<sub>4</sub> + 2<b data-s="redp">Ag</b>↓ + 3NH<sub>3</sub> + H<sub>2</sub><b data-s="oxp">O</b>',
  p:'试管内壁出现<em>银镜</em>。',
  o:{x:2,r:2}, n:'银镜反应检验醛基；试管必须洁净，用水浴加热，不能振荡。'
},
{
  c:'organic', t:['氧化还原','加热','沉淀'],
  e:'CH<sub>3</sub>CH<b data-s="ox">O</b> + 2<b data-s="red">Cu</b>(OH)<sub>2</sub> + NaOH {{Δ}} CH<sub>3</sub>COONa + <b data-s="redp">Cu</b><sub>2</sub>O↓ + 3H<sub>2</sub><b data-s="oxp">O</b>',
  p:'出现<em>砖红色</em>沉淀。',
  o:{x:2,r:2}, n:'斐林反应（改良）；必须用新制 Cu(OH)₂ 并加热至沸腾。'
},
{
  c:'organic', t:['加热','催化剂','可逆'],
  e:'CH<sub>3</sub>COOH + CH<sub>3</sub>CH<sub>2</sub>OH {{浓硫酸, Δ}} CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub> + H<sub>2</sub>O',
  p:'生成有<em>果香味</em>的无色油状液体。',
  n:'酯化反应：酸脱羟基、醇脱氢；浓硫酸作催化剂和吸水剂；属于可逆反应。'
},
{
  c:'organic', t:['加热','可逆','催化剂'],
  e:'CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub> + H<sub>2</sub>O {{稀硫酸, Δ}} CH<sub>3</sub>COOH + CH<sub>3</sub>CH<sub>2</sub>OH',
  p:'油状液体逐渐减少，溶液不分层。',
  n:'酯的酸性水解是可逆的，因此不能进行到底。'
},
{
  c:'organic', t:['加热'],
  e:'CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub> + NaOH {{Δ}} CH<sub>3</sub>COONa + CH<sub>3</sub>CH<sub>2</sub>OH',
  p:'酯层逐渐消失，溶液澄清。',
  n:'碱性水解（皂化反应）不可逆，因为生成的酸被碱中和；“性质不同：酸性水解可逆，碱性水解完全”。'
},
{
  c:'organic', t:['加热','催化剂','气体'],
  e:'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> {{酒化酶}} 2CH<sub>3</sub>CH<sub>2</sub>OH + 2CO<sub>2</sub>↑',
  p:'产生气泡，有酒味。',
  n:'葡萄糖在酒化酶作用下发酵生成乙醇；温度一般控制在 25–35 ℃。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'(C<sub>6</sub>H<sub>10</sub>O<sub>5</sub>)<sub>n</sub> + n H<sub>2</sub>O {{催化剂}} n C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>',
  p:'淀粉在酸或酶作用下逐步水解，最终生成葡萄糖。',
  n:'检验淀粉是否水解完全：加碘水不变蓝即已完全水解。'
},
{
  c:'organic', t:['氧化还原','气体'],
  e:'2CH<sub>3</sub>CH<sub>2</sub>O<b data-s="red">H</b> + 2<b data-s="ox">Na</b> = 2CH<sub>3</sub>CH<sub>2</sub>O<b data-s="oxp">Na</b> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'缓慢产生气泡，钠粒逐渐消失。',
  o:{x:2,r:2}, n:'乙醇与钠反应比水与钠反应缓和得多，说明乙醇羟基上的氢不如水中的氢活泼。'
},
{
  c:'organic', t:['气体'],
  e:'CH<sub>3</sub>COOH + NaHCO<sub>3</sub> = CH<sub>3</sub>COONa + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'CH<sub>3</sub>COOH + HCO<sub>3</sub><sup>−</sup> = CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'产生大量气泡。',
  n:'说明酸性：CH₃COOH > H₂CO₃；可用于区分乙酸与苯酚。'
},
{
  c:'organic', t:[],
  e:'C<sub>6</sub>H<sub>5</sub>OH + NaOH = C<sub>6</sub>H<sub>5</sub>ONa + H<sub>2</sub>O',
  p:'苯酚浑浊液逐渐变澄清。',
  n:'苯酚的酸性弱于碳酸但强于水，故能与 NaOH 反应但不能与 NaHCO₃ 反应。'
},
{
  c:'organic', t:['气体'],
  e:'C<sub>6</sub>H<sub>5</sub>ONa + CO<sub>2</sub> + H<sub>2</sub>O = C<sub>6</sub>H<sub>5</sub>OH + NaHCO<sub>3</sub>',
  p:'澄清溶液重新变<em>浑浊</em>。',
  n:'酸性：H₂CO₃ > 苯酚 > HCO₃⁻，故产物是 NaHCO₃ 而不是 Na₂CO₃。'
},
{
  c:'organic', t:['沉淀'],
  e:'C<sub>6</sub>H<sub>5</sub>OH + 3Br<sub>2</sub> = C<sub>6</sub>H<sub>2</sub>Br<sub>3</sub>OH↓ + 3HBr',
  p:'生成<em>白色</em>沉淀（2,4,6-三溴苯酚）。',
  n:'苯酚与溴水反应不需要催化剂，比苯的取代容易得多，说明羟基使苯环活化。'
},
{
  c:'organic', t:['加热'],
  e:'CH<sub>3</sub>CH<sub>2</sub>Br + NaOH {{水溶液, Δ}} CH<sub>3</sub>CH<sub>2</sub>OH + NaBr',
  ion:'CH<sub>3</sub>CH<sub>2</sub>Br + OH<sup>−</sup> {{Δ}} CH<sub>3</sub>CH<sub>2</sub>OH + Br<sup>−</sup>',
  p:'油状液体逐渐消失，溶液分层消失。',
  n:'卤代烃的水解（取代）反应；NaOH 水溶液条件下发生取代。'
},
{
  c:'organic', t:['加热','气体'],
  e:'CH<sub>3</sub>CH<sub>2</sub>Br + NaOH {{醇, Δ}} CH<sub>2</sub>=CH<sub>2</sub>↑ + NaBr + H<sub>2</sub>O',
  p:'产生能使溴水褪色的气体。',
  n:'NaOH 醇溶液、加热条件下发生消去反应；与水解条件形成对比。'
},
/* ---------- 金属 × 具体试剂（补全矩阵） ---------- */
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Na</b> + <b data-s="red">S</b> {{研磨}} <b data-s="oxp">Na</b><sub>2</sub><b data-s="redp">S</b>',
  p:'研磨时发生<em>爆炸</em>，生成白色固体。',
  o:{x:2,r:2}, n:'钠与硫研磨即剧烈反应，说明钠的还原性极强。'
},
{
  c:'metal', t:['氧化还原','置换','气体'],
  e:'2<b data-s="ox">Na</b> + 2C<sub>2</sub>H<sub>5</sub>O<b data-s="red">H</b> = 2C<sub>2</sub>H<sub>5</sub>O<b data-s="oxp">Na</b> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'钠块在乙醇中缓慢反应，产生气泡但不熔成小球。',
  o:{x:2,r:2}, n:'反应比与水缓和，可用于证明乙醇羟基氢的活泼性弱于水中的氢。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'4<b data-s="ox">K</b> + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">K</b><sub>2</sub><b data-s="redp">O</b>',
  p:'钾表面迅速变暗，生成白色固体。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">K</b> + <b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">K</b><b data-s="redp">O</b><sub>2</sub>',
  p:'钾在氧气中燃烧，生成<em>橙黄色</em>固体超氧化钾。',
  o:{x:1,r:1}, n:'碱金属燃烧产物不同：Li→Li₂O，Na→Na₂O₂，K→KO₂。'
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">K</b> + <b data-s="red">Cl</b><sub>2</sub> = 2<b data-s="oxp">K</b><b data-s="redp">Cl</b>',
  p:'剧烈反应，发出紫色火焰，生成白色固体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">K</b> + <b data-s="red">S</b> {{Δ}} <b data-s="oxp">K</b><sub>2</sub><b data-s="redp">S</b>',
  p:'加热化合，生成白色固体硫化钾。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'3<b data-s="ox">Mg</b> + <b data-s="red">N</b><sub>2</sub> {{点燃}} <b data-s="oxp">Mg</b><sub>3</sub><b data-s="redp">N</b><sub>2</sub>',
  p:'镁在氮气中燃烧，生成<em>黄绿色</em>固体氮化镁。',
  o:{x:6,r:6}, n:'镁在空气中燃烧除生成 MgO 外，还会生成少量 Mg₃N₂。'
},
{
  c:'metal', t:['氧化还原','置换','加热'],
  e:'2<b data-s="ox">Mg</b> + <b data-s="red">Si</b>O<sub>2</sub> {{Δ}} 2<b data-s="oxp">Mg</b>O + <b data-s="redp">Si</b>',
  p:'剧烈反应，生成白色固体与灰黑色硅。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Mg</b> + <b data-s="red">S</b> {{Δ}} <b data-s="oxp">Mg</b><b data-s="redp">S</b>',
  p:'剧烈燃烧，发出耀眼白光，生成白色固体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换','加热'],
  e:'<b data-s="ox">Mg</b> + 2<b data-s="red">H</b><sub>2</sub>O {{Δ}} <b data-s="oxp">Mg</b>(OH)<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'镁条在沸水中缓慢反应，表面产生气泡，溶液变碱性（酚酞变红）。',
  o:{x:2,r:2}, n:'镁与冷水几乎不反应，与沸水才明显反应，说明镁的活泼性弱于钠。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Mg</b> + <b data-s="red">Cu</b>SO<sub>4</sub> = <b data-s="oxp">Mg</b>SO<sub>4</sub> + <b data-s="redp">Cu</b>',
  ion:'Mg + Cu<sup>2+</sup> = Mg<sup>2+</sup> + Cu',
  p:'镁条表面析出暗红色铜，蓝色溶液褪色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Al</b> + 3<b data-s="red">S</b> {{Δ}} <b data-s="oxp">Al</b><sub>2</sub><b data-s="redp">S</b><sub>3</sub>',
  p:'混合物受热后剧烈反应，发出强光，生成黄色固体。',
  o:{x:6,r:6}, n:'Al₂S₃ 遇水强烈水解：Al₂S₃ + 6H₂O = 2Al(OH)₃↓ + 3H₂S↑。'
},
{
  c:'metal', t:['氧化还原','置换','高温'],
  e:'8<b data-s="ox">Al</b> + 3<b data-s="red">Fe</b><sub>3</sub>O<sub>4</sub> {{高温}} 4<b data-s="oxp">Al</b><sub>2</sub>O<sub>3</sub> + 9<b data-s="redp">Fe</b>',
  p:'铝热反应，剧烈放热，熔融的铁落下。',
  o:{x:24,r:24}, n:'Fe₃O₄ 中 Fe 的平均化合价为 +8/3，故 3 mol Fe₃O₄ 共得 24 mol 电子。'
},
{
  c:'metal', t:['氧化还原','置换','高温'],
  e:'4<b data-s="ox">Al</b> + 3<b data-s="red">Mn</b>O<sub>2</sub> {{高温}} 2<b data-s="oxp">Al</b><sub>2</sub>O<sub>3</sub> + 3<b data-s="redp">Mn</b>',
  p:'铝热法冶炼锰，剧烈放热发光。',
  o:{x:12,r:12}, n:'铝热法可冶炼 V、Cr、Mn 等高熔点金属。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'2<b data-s="ox">Al</b> + 3<b data-s="red">Zn</b>SO<sub>4</sub> = <b data-s="oxp">Al</b><sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3<b data-s="redp">Zn</b>',
  ion:'2Al + 3Zn<sup>2+</sup> = 2Al<sup>3+</sup> + 3Zn',
  p:'铝片表面析出灰白色锌。',
  o:{x:6,r:6}
},
{
  c:'metal', t:['氧化还原'],
  e:'<b data-s="ox">Al</b> + 4H<b data-s="red">N</b>O<sub>3</sub>(稀) = <b data-s="oxp">Al</b>(NO<sub>3</sub>)<sub>3</sub> + <b data-s="redp">N</b>O↑ + 2H<sub>2</sub>O',
  ion:'Al + 4H<sup>+</sup> + NO<sub>3</sub><sup>−</sup> = Al<sup>3+</sup> + NO↑ + 2H<sub>2</sub>O',
  p:'铝片溶解，产生无色气体，遇空气变红棕色。',
  o:{x:3,r:3}, n:'常温下铝在浓硝酸中钝化，故可用铝槽车运输浓硝酸。'
},
{
  c:'metal', t:['氧化还原','加热'],
  e:'2<b data-s="ox">Al</b> + 6H<sub>2</sub><b data-s="red">S</b>O<sub>4</sub>(浓) {{Δ}} <b data-s="oxp">Al</b><sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3<b data-s="redp">S</b>O<sub>2</sub>↑ + 6H<sub>2</sub>O',
  p:'加热后反应剧烈，产生有刺激性气味的气体。',
  o:{x:6,r:6}
},
{
  c:'metal', t:['氧化还原','加热'],
  e:'<b data-s="ox">Fe</b> + 6H<b data-s="red">N</b>O<sub>3</sub>(浓) {{Δ}} <b data-s="oxp">Fe</b>(NO<sub>3</sub>)<sub>3</sub> + 3<b data-s="redp">N</b>O<sub>2</sub>↑ + 3H<sub>2</sub>O',
  p:'加热时铁溶解，溶液变黄，产生大量红棕色气体。',
  o:{x:3,r:3}, n:'常温下铁遇浓硝酸钝化，表面生成致密氧化膜，故可用铁罐储运浓硝酸。'
},
{
  c:'metal', t:['氧化还原','加热'],
  e:'2<b data-s="ox">Fe</b> + 6H<sub>2</sub><b data-s="red">S</b>O<sub>4</sub>(浓) {{Δ}} <b data-s="oxp">Fe</b><sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3<b data-s="redp">S</b>O<sub>2</sub>↑ + 6H<sub>2</sub>O',
  p:'加热后反应，溶液变黄，产生刺激性气体。',
  o:{x:6,r:6}, n:'常温下铁遇浓硫酸钝化；加热则反应生成 Fe³⁺（不是 Fe²⁺）。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Fe</b> + 2<b data-s="red">Ag</b>NO<sub>3</sub> = <b data-s="oxp">Fe</b>(NO<sub>3</sub>)<sub>2</sub> + 2<b data-s="redp">Ag</b>',
  ion:'Fe + 2Ag<sup>+</sup> = Fe<sup>2+</sup> + 2Ag',
  p:'铁片表面析出<em>银白色</em>银，溶液变浅绿色。',
  o:{x:2,r:2}, n:'氧化性 Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺，置换顺序由此决定。'
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Cu</b> + <b data-s="red">S</b> {{Δ}} <b data-s="oxp">Cu</b><sub>2</sub><b data-s="redp">S</b>',
  p:'铜丝在硫蒸气中燃烧，生成<em>黑色</em>固体。',
  o:{x:2,r:2}, n:'S 氧化性弱，只能把 Cu 氧化到 +1 价。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Cu</b> + 2<b data-s="red">Ag</b>NO<sub>3</sub> = <b data-s="oxp">Cu</b>(NO<sub>3</sub>)<sub>2</sub> + 2<b data-s="redp">Ag</b>',
  ion:'Cu + 2Ag<sup>+</sup> = Cu<sup>2+</sup> + 2Ag',
  p:'铜丝表面覆盖<em>银白色</em>物质，溶液变蓝。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Zn</b> + <b data-s="red">O</b><sub>2</sub> {{Δ}} 2<b data-s="oxp">Zn</b><b data-s="redp">O</b>',
  p:'锌片表面变灰白，生成氧化锌。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Zn</b> + <b data-s="red">Cl</b><sub>2</sub> {{点燃}} <b data-s="oxp">Zn</b><b data-s="redp">Cl</b><sub>2</sub>',
  p:'锌在氯气中燃烧，产生白色烟。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Zn</b> + <b data-s="red">S</b> {{Δ}} <b data-s="oxp">Zn</b><b data-s="redp">S</b>',
  p:'剧烈反应，发出白光，生成白色固体。',
  o:{x:2,r:2}, n:'ZnS 是荧光粉的基质材料。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Zn</b> + 2CH<sub>3</sub>COO<b data-s="red">H</b> = <b data-s="oxp">Zn</b>(CH<sub>3</sub>COO)<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Zn + 2CH<sub>3</sub>COOH = Zn<sup>2+</sup> + 2CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>↑',
  p:'锌粒缓慢溶解，产生气泡。',
  o:{x:2,r:2}, n:'弱酸与金属反应，离子式中弱酸不拆写。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Zn</b> + <b data-s="red">Fe</b>SO<sub>4</sub> = <b data-s="oxp">Zn</b>SO<sub>4</sub> + <b data-s="redp">Fe</b>',
  ion:'Zn + Fe<sup>2+</sup> = Zn<sup>2+</sup> + Fe',
  p:'锌粒表面析出灰黑色铁，浅绿色溶液褪色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Zn</b> + 2<b data-s="red">Ag</b>NO<sub>3</sub> = <b data-s="oxp">Zn</b>(NO<sub>3</sub>)<sub>2</sub> + 2<b data-s="redp">Ag</b>',
  ion:'Zn + 2Ag<sup>+</sup> = Zn<sup>2+</sup> + 2Ag',
  p:'锌粒表面析出银白色银，溶液无色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原'],
  e:'<b data-s="ox">Ag</b> + 2H<b data-s="red">N</b>O<sub>3</sub>(浓) = <b data-s="oxp">Ag</b>NO<sub>3</sub> + <b data-s="redp">N</b>O<sub>2</sub>↑ + H<sub>2</sub>O',
  p:'银溶解，产生大量红棕色气体。',
  o:{x:1,r:1}, n:'浓硝酸与金属反应生成 NO₂，稀硝酸生成 NO。'
},
{
  c:'metal', t:['氧化还原','加热'],
  e:'2<b data-s="ox">Ag</b> + 2H<sub>2</sub><b data-s="red">S</b>O<sub>4</sub>(浓) {{Δ}} <b data-s="oxp">Ag</b><sub>2</sub>SO<sub>4</sub> + <b data-s="redp">S</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'银溶解，产生刺激性气体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Ca</b> + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">Ca</b><b data-s="redp">O</b>',
  p:'钙表面迅速变暗，生成白色氧化钙。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'<b data-s="ox">Ca</b> + <b data-s="red">Cl</b><sub>2</sub> = <b data-s="oxp">Ca</b><b data-s="redp">Cl</b><sub>2</sub>',
  p:'剧烈反应，生成白色固体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Ca</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Ca</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Ca + 2H<sup>+</sup> = Ca<sup>2+</sup> + H<sub>2</sub>↑',
  p:'剧烈反应，产生大量气泡。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Ba</b> + <b data-s="red">O</b><sub>2</sub> = 2<b data-s="oxp">Ba</b><b data-s="redp">O</b>',
  p:'钡表面变暗，生成白色氧化钡。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','化合'],
  e:'<b data-s="ox">Ba</b> + <b data-s="red">Cl</b><sub>2</sub> = <b data-s="oxp">Ba</b><b data-s="redp">Cl</b><sub>2</sub>',
  p:'燃烧，生成白色固体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Ba</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Ba</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Ba + 2H<sup>+</sup> = Ba<sup>2+</sup> + H<sub>2</sub>↑',
  p:'剧烈反应，产生气泡。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="red">Hg</b> + <b data-s="ox">O</b><sub>2</sub> {{Δ}} 2<b data-s="redp">Hg</b><b data-s="oxp">O</b>',
  p:'银白色汞受热缓慢氧化，表面出现红色粉末。',
  o:{x:4,r:4}, n:'HgO 受热又分解为 Hg 和 O₂，说明汞与氧的结合不稳定。'
},
{
  c:'metal', t:['氧化还原','加热'],
  e:'<b data-s="ox">Hg</b> + 2H<sub>2</sub><b data-s="red">S</b>O<sub>4</sub>(浓) {{Δ}} <b data-s="oxp">Hg</b>SO<sub>4</sub> + <b data-s="redp">S</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'汞溶解，产生刺激性气体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Pb</b> + <b data-s="red">O</b><sub>2</sub> {{Δ}} 2<b data-s="oxp">Pb</b><b data-s="redp">O</b>',
  p:'铅表面变暗，生成灰黑色氧化铅。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原'],
  e:'<b data-s="ox">Pb</b> + 4H<b data-s="red">N</b>O<sub>3</sub>(浓) = <b data-s="oxp">Pb</b>(NO<sub>3</sub>)<sub>2</sub> + 2<b data-s="redp">N</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'铅溶解，产生红棕色气体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Sn</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Sn</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Sn + 2H<sup>+</sup> = Sn<sup>2+</sup> + H<sub>2</sub>↑',
  p:'锡溶解，产生气泡。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Sn</b> + 2<b data-s="red">Cl</b><sub>2</sub> {{点燃}} <b data-s="oxp">Sn</b><b data-s="redp">Cl</b><sub>4</sub>',
  p:'锡在氯气中燃烧，产生白烟。',
  o:{x:4,r:4}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Ni</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Ni</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Ni + 2H<sup>+</sup> = Ni<sup>2+</sup> + H<sub>2</sub>↑',
  p:'镍片溶解，溶液变绿色，产生气泡。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Ni</b> + <b data-s="red">Cl</b><sub>2</sub> {{点燃}} <b data-s="oxp">Ni</b><b data-s="redp">Cl</b><sub>2</sub>',
  p:'镍在氯气中燃烧，生成黄棕色固体。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Mn</b> + 2<b data-s="red">H</b>Cl = <b data-s="oxp">Mn</b>Cl<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Mn + 2H<sup>+</sup> = Mn<sup>2+</sup> + H<sub>2</sub>↑',
  p:'锰溶解，溶液呈浅粉色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','化合','加热'],
  e:'3<b data-s="ox">Mn</b> + 2<b data-s="red">O</b><sub>2</sub> {{点燃}} <b data-s="oxp">Mn</b><sub>3</sub><b data-s="redp">O</b><sub>4</sub>',
  p:'锰在氧气中燃烧，火星四射，生成黑色固体。',
  o:{x:8,r:8}
},
/* ---------- 非金属 × 具体物质（补全矩阵） ---------- */
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">F</b><sub>2</sub> = 2<b data-s="oxp">H</b><b data-s="redp">F</b>',
  p:'在<em>暗处</em>即剧烈化合甚至爆炸，生成白雾。',
  o:{x:2,r:2}, n:'氟是非金属性最强的元素，与氢气不需光照即可反应。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">Br</b><sub>2</sub> {{Δ}} 2<b data-s="oxp">H</b><b data-s="redp">Br</b>',
  p:'加热时缓慢化合，生成有刺激性气味的无色气体。',
  o:{x:2,r:2}, n:'反应条件递增：F₂（暗处）< Cl₂（光照）< Br₂（加热）< I₂（持续加热且可逆）。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热','可逆'],
  e:'<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">I</b><sub>2</sub> ⇌ 2<b data-s="oxp">H</b><b data-s="redp">I</b>',
  p:'加热时生成紫色气体（HI），冷却后颜色变浅。',
  o:{x:2,r:2}, n:'HI 不稳定，受热易分解，反应是可逆的。'
},
{
  c:'nonmetal', t:['氧化还原','置换','高温'],
  e:'3<b data-s="ox">H</b><sub>2</sub> + <b data-s="red">W</b>O<sub>3</sub> {{高温}} <b data-s="redp">W</b> + 3<b data-s="oxp">H</b><sub>2</sub>O',
  p:'白色氧化钨变为银灰色金属钨粉。',
  o:{x:6,r:6}, n:'氢气还原金属氧化物制取金属钨。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'2<b data-s="ox">Na</b> + <b data-s="red">H</b><sub>2</sub> {{Δ}} 2<b data-s="oxp">Na</b><b data-s="redp">H</b>',
  p:'钠在氢气中加热，生成白色固体氢化钠。',
  o:{x:2,r:2}, n:'NaH 中氢为 −1 价，遇水剧烈反应：NaH + H₂O = NaOH + H₂↑。'
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Ca</b> + <b data-s="red">H</b><sub>2</sub> {{Δ}} <b data-s="oxp">Ca</b><b data-s="redp">H</b><sub>2</sub>',
  p:'加热生成白色固体氢化钙。',
  o:{x:2,r:2}, n:'CaH₂ 是常用的野外便携氢源，遇水缓慢放出氢气。'
},
{
  c:'nonmetal', t:['化合','可逆'],
  e:'3O<sub>2</sub> {{放电}} 2O<sub>3</sub>',
  p:'无声放电时产生有特殊腥味的气体。',
  n:'臭氧层即由此反应及紫外线作用维持；O₃ 氧化性比 O₂ 强。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'4<b data-s="ox">N</b>O<sub>2</sub> + <b data-s="red">O</b><sub>2</sub> + 2H<sub>2</sub><b data-s="redp">O</b> = 4H<b data-s="oxp">N</b>O<sub>3</sub>',
  p:'红棕色气体与氧气、水共同作用，生成硝酸。',
  o:{x:4,r:4}, n:'工业制硝酸的吸收阶段；实际生产中通入过量空气使 NO 充分转化。'
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'2Na<sub>2</sub><b data-s="ox">S</b>O<sub>3</sub> + <b data-s="red">O</b><sub>2</sub> = 2Na<sub>2</sub><b data-s="oxp">S</b><b data-s="redp">O</b><sub>4</sub>',
  p:'溶液由无色变为无色（无明显现象），需用检验试剂确认。',
  o:{x:4,r:4}, n:'亚硫酸钠在空气中易被氧化变质，必须密封保存。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">P</b> + 3<b data-s="red">Cl</b><sub>2</sub> = 2<b data-s="oxp">P</b><b data-s="redp">Cl</b><sub>3</sub>',
  p:'白磷在少量氯气中燃烧，产生白色烟雾。',
  o:{x:6,r:6}, n:'氯气不足时生成 PCl₃（无色液体），足量时生成 PCl₅（白色固体）。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">P</b> + 5<b data-s="red">Cl</b><sub>2</sub> = 2<b data-s="oxp">P</b><b data-s="redp">Cl</b><sub>5</sub>',
  p:'白磷在足量氯气中燃烧，产生大量白色烟雾。',
  o:{x:10,r:10}
},
{
  c:'nonmetal', t:['氧化还原','置换','加热'],
  e:'2<b data-s="ox">P</b> + 3<b data-s="red">Ca</b> {{Δ}} <b data-s="redp">Ca</b><sub>3</sub><b data-s="oxp">P</b><sub>2</sub>',
  p:'加热化合，生成红棕色固体磷化钙。',
  o:{x:6,r:6}, n:'Ca₃P₂ 遇水生成 PH₃（磷化氢），有剧毒且易自燃。'
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'<b data-s="red">Cl</b><sub>2</sub> + H<sub>2</sub><b data-s="ox">S</b> = <b data-s="oxp">S</b>↓ + 2H<b data-s="redp">Cl</b>',
  p:'出现<em>淡黄色</em>浑浊，溶液酸性增强。',
  o:{x:2,r:2}, n:'氯气能氧化硫化氢，说明氧化性 Cl₂ > S。'
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'<b data-s="red">Cl</b><sub>2</sub> + <b data-s="ox">S</b>O<sub>2</sub> + 2H<sub>2</sub>O = H<sub>2</sub><b data-s="oxp">S</b>O<sub>4</sub> + 2H<b data-s="redp">Cl</b>',
  p:'黄绿色与刺激性气体同时消失，溶液呈酸性。',
  o:{x:2,r:2}, n:'用氯水或双氧水脱除烟气中的 SO₂。'
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">Cl</b><sub>2</sub> + Na<sub>2</sub><b data-s="ox">S</b> = 2Na<b data-s="redp">Cl</b> + <b data-s="oxp">S</b>↓',
  p:'溶液中出现淡黄色浑浊。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['加热','催化剂'],
  e:'C<sub>6</sub>H<sub>6</sub> + Cl<sub>2</sub> {{FeCl₃}} C<sub>6</sub>H<sub>5</sub>Cl + HCl',
  p:'剧烈反应并放出气体（HCl），生成无色油状液体。',
  n:'苯的氯代，需 FeCl₃ 催化；若无催化剂而光照，则发生侧链取代。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'<b data-s="red">Br</b><sub>2</sub> + <b data-s="ox">Mg</b> = <b data-s="oxp">Mg</b><b data-s="redp">Br</b><sub>2</sub>',
  p:'镁条在溴蒸气中燃烧，生成白色固体。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Al</b> + 3<b data-s="red">Br</b><sub>2</sub> = 2<b data-s="oxp">Al</b><b data-s="redp">Br</b><sub>3</sub>',
  p:'剧烈反应，生成白色固体。',
  o:{x:6,r:6}
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'2<b data-s="ox">Na</b> + <b data-s="red">Br</b><sub>2</sub> = 2<b data-s="oxp">Na</b><b data-s="redp">Br</b>',
  p:'剧烈反应，生成白色固体溴化钠。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">Br</b><sub>2</sub> + Na<sub>2</sub><b data-s="ox">S</b> = 2Na<b data-s="redp">Br</b> + <b data-s="oxp">S</b>↓',
  p:'出现淡黄色浑浊。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">I</b><sub>2</sub> + 2<b data-s="ox">Na</b> {{Δ}} 2<b data-s="oxp">Na</b><b data-s="redp">I</b>',
  p:'加热剧烈反应，生成白色固体碘化钠。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="red">I</b><sub>2</sub> + <b data-s="ox">Zn</b> {{Δ}} <b data-s="oxp">Zn</b><b data-s="redp">I</b><sub>2</sub>',
  p:'锌粉与碘混合后加一滴水即剧烈反应，产生紫色碘蒸气。',
  o:{x:2,r:2}, n:'碘与锌反应需少量水引发，是“水作催化剂”的经典演示实验。'
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'<b data-s="red">I</b><sub>2</sub> + 2Na<sub>2</sub><b data-s="ox">S</b><sub>2</sub>O<sub>3</sub> = 2Na<b data-s="redp">I</b> + Na<sub>2</sub><b data-s="oxp">S</b><sub>4</sub>O<sub>6</sub>',
  ion:'I<sub>2</sub> + 2S<sub>2</sub>O<sub>3</sub><sup>2−</sup> = 2I<sup>−</sup> + S<sub>4</sub>O<sub>6</sub><sup>2−</sup>',
  p:'碘的棕黄色迅速褪去，溶液变为无色。',
  o:{x:2,r:2}, n:'碘量法滴定的基础反应；淀粉作指示剂，蓝色消失即为终点。'
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'<b data-s="red">I</b><sub>2</sub> + <b data-s="ox">S</b>O<sub>2</sub> + 2H<sub>2</sub>O = H<sub>2</sub><b data-s="oxp">S</b>O<sub>4</sub> + 2H<b data-s="redp">I</b>',
  p:'碘的棕色褪去，溶液呈酸性。',
  o:{x:2,r:2}
},
{
  c:'nonmetal', t:['氧化还原','化合','高温'],
  e:'<b data-s="red">N</b><sub>2</sub> + 2<b data-s="ox">Al</b> {{高温}} 2<b data-s="oxp">Al</b><b data-s="redp">N</b>',
  p:'高温下生成白色固体氮化铝。',
  o:{x:6,r:6}, n:'AlN 是重要的陶瓷材料，耐高温、导热性好。'
},
{
  c:'nonmetal', t:['氧化还原','高温'],
  e:'Ca<b data-s="ox">C</b><sub>2</sub> + <b data-s="red">N</b><sub>2</sub> {{高温}} CaC<b data-s="redp">N</b><sub>2</sub> + <b data-s="oxp">C</b>',
  p:'电石与氮气在高温下反应，生成氰氨化钙。',
  o:{x:6,r:6}, n:'氰氨化钙（石灰氮）是重要的氮肥与化工原料。'
},
{
  c:'nonmetal', t:['氧化还原','加热'],
  e:'<b data-s="ox">C</b> + 4H<b data-s="red">N</b>O<sub>3</sub>(浓) {{Δ}} <b data-s="oxp">C</b>O<sub>2</sub>↑ + 4<b data-s="redp">N</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'木炭与热浓硝酸剧烈反应，产生红棕色气体。',
  o:{x:4,r:4}, n:'说明浓硝酸具有强氧化性，能氧化非金属单质。'
},
{
  c:'nonmetal', t:['氧化还原','加热'],
  e:'<b data-s="ox">C</b> + 2H<sub>2</sub><b data-s="red">S</b>O<sub>4</sub>(浓) {{Δ}} <b data-s="oxp">C</b>O<sub>2</sub>↑ + 2<b data-s="redp">S</b>O<sub>2</sub>↑ + 2H<sub>2</sub>O',
  p:'木炭与热浓硫酸反应，产生有刺激性气味的气体。',
  o:{x:4,r:4}
},
{
  c:'nonmetal', t:['氧化还原','化合','加热'],
  e:'<b data-s="ox">Si</b> + 2<b data-s="red">Cl</b><sub>2</sub> {{Δ}} <b data-s="oxp">Si</b><b data-s="redp">Cl</b><sub>4</sub>',
  p:'加热时化合，生成无色液体四氯化硅。',
  o:{x:4,r:4}, n:'SiCl₄ 易水解：SiCl₄ + 4H₂O = H₄SiO₄↓ + 4HCl，在潮湿空气中冒白雾。'
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Si</b> + 4<b data-s="red">H</b>F = <b data-s="oxp">Si</b>F<sub>4</sub>↑ + 2<b data-s="redp">H</b><sub>2</sub>↑',
  p:'硅粉溶解，产生气体。',
  o:{x:4,r:4}, n:'硅与氢氟酸反应，而碳不与任何酸反应，这是两者的重要区别。'
},
{
  c:'nonmetal', t:['氧化还原','化合'],
  e:'<b data-s="ox">Si</b> + 2<b data-s="red">F</b><sub>2</sub> = <b data-s="oxp">Si</b><b data-s="redp">F</b><sub>4</sub>',
  p:'剧烈反应，产生大量白烟。',
  o:{x:4,r:4}
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'2<b data-s="red">F</b><sub>2</sub> + 2H<sub>2</sub><b data-s="ox">O</b> = 4H<b data-s="redp">F</b> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'氟气通入水中立即反应，放出助燃气体。',
  o:{x:4,r:4}, n:'F₂ 氧化性极强，能将水中的氧氧化为 O₂，故氟不能从水溶液中置换出其他卤素。'
},
{
  c:'nonmetal', t:['氧化还原','置换'],
  e:'<b data-s="red">F</b><sub>2</sub> + 2Na<b data-s="ox">Cl</b> = 2Na<b data-s="redp">F</b> + <b data-s="oxp">Cl</b><sub>2</sub>',
  p:'剧烈反应，产生黄绿色气体。',
  o:{x:2,r:2}, n:'氟的氧化性最强，可从熔融氯化钠中置换出氯。'
},
{
  c:'nonmetal', t:['氧化还原'],
  e:'<b data-s="red">O</b><sub>3</sub> + 2K<b data-s="ox">I</b> + H<sub>2</sub>O = <b data-s="oxp">I</b><sub>2</sub> + 2KOH + <b data-s="redp">O</b><sub>2</sub>',
  p:'无色溶液变为棕黄色，加淀粉变蓝。',
  o:{x:2,r:2}, n:'检验臭氧的方法；O₃ 的氧化性比 O₂ 强得多。'
},
/* ---------- 盐类补充矩阵 ---------- */
{
  c:'salt', t:['沉淀'],
  e:'Pb(NO<sub>3</sub>)<sub>2</sub> + 2KI = PbI<sub>2</sub>↓ + 2KNO<sub>3</sub>',
  ion:'Pb<sup>2+</sup> + 2I<sup>−</sup> = PbI<sub>2</sub>↓',
  p:'生成<em>金黄色</em>沉淀，溶于热水，冷却后析出金色晶体（“黄金雨”）。',
  n:'PbI₂ 溶解度随温度升高显著增大，是重结晶演示的经典体系。'
},
{
  c:'salt', t:['沉淀'],
  e:'Pb(NO<sub>3</sub>)<sub>2</sub> + Na<sub>2</sub>S = PbS↓ + 2NaNO<sub>3</sub>',
  ion:'Pb<sup>2+</sup> + S<sup>2−</sup> = PbS↓',
  p:'生成<em>黑色</em>沉淀。',
  n:'PbS 极难溶，也用于古代铅白颜料变黑的原因解释。'
},
{
  c:'salt', t:['沉淀'],
  e:'CuSO<sub>4</sub> + Ba(OH)<sub>2</sub> = Cu(OH)<sub>2</sub>↓ + BaSO<sub>4</sub>↓',
  ion:'Cu<sup>2+</sup> + SO<sub>4</sub><sup>2−</sup> + Ba<sup>2+</sup> + 2OH<sup>−</sup> = Cu(OH)<sub>2</sub>↓ + BaSO<sub>4</sub>↓',
  p:'同时生成<em>蓝色</em>与<em>白色</em>两种沉淀。',
  n:'“双沉淀”反应；离子方程式中四种离子必须全部写出，不能拆成两个。'
},
{
  c:'salt', t:['沉淀'],
  e:'FeCl<sub>3</sub> + 3NH<sub>3</sub>·H<sub>2</sub>O = Fe(OH)<sub>3</sub>↓ + 3NH<sub>4</sub>Cl',
  ion:'Fe<sup>3+</sup> + 3NH<sub>3</sub>·H<sub>2</sub>O = Fe(OH)<sub>3</sub>↓ + 3NH<sub>4</sub><sup>+</sup>',
  p:'生成<em>红褐色</em>絮状沉淀。'
},
{
  c:'salt', t:['沉淀'],
  e:'ZnCl<sub>2</sub> + 2NaOH = Zn(OH)<sub>2</sub>↓ + 2NaCl',
  ion:'Zn<sup>2+</sup> + 2OH<sup>−</sup> = Zn(OH)<sub>2</sub>↓',
  p:'生成<em>白色</em>絮状沉淀。',
  n:'Zn(OH)₂ 也是两性氢氧化物，继续加碱会溶解。'
},
{
  c:'salt', t:[],
  e:'Zn(OH)<sub>2</sub> + 2NaOH = Na<sub>2</sub>ZnO<sub>2</sub> + 2H<sub>2</sub>O',
  ion:'Zn(OH)<sub>2</sub> + 2OH<sup>−</sup> = ZnO<sub>2</sub><sup>2−</sup> + 2H<sub>2</sub>O',
  p:'白色沉淀溶解，溶液澄清。',
  n:'与 Al(OH)₃ 类似，Zn(OH)₂ 既能溶于强酸又能溶于强碱。'
},
{
  c:'salt', t:['沉淀'],
  e:'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NH<sub>3</sub>·H<sub>2</sub>O = 2Al(OH)<sub>3</sub>↓ + 3(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>',
  ion:'Al<sup>3+</sup> + 3NH<sub>3</sub>·H<sub>2</sub>O = Al(OH)<sub>3</sub>↓ + 3NH<sub>4</sub><sup>+</sup>',
  p:'生成白色絮状沉淀，沉淀不溶于过量氨水。'
},
{
  c:'salt', t:['沉淀'],
  e:'MgSO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + MgCl<sub>2</sub>',
  ion:'Ba<sup>2+</sup> + SO<sub>4</sub><sup>2−</sup> = BaSO<sub>4</sub>↓',
  p:'生成白色沉淀，不溶于稀硝酸。'
},
{
  c:'salt', t:['沉淀'],
  e:'Na<sub>2</sub>S + 2HCl = 2NaCl + H<sub>2</sub>S↑',
  ion:'S<sup>2−</sup> + 2H<sup>+</sup> = H<sub>2</sub>S↑',
  p:'产生有<em>臭鸡蛋气味</em>的气体。',
  n:'实验室检验 S²⁻ 的方法；H₂S 有毒，需在通风处操作。'
},
{
  c:'salt', t:['沉淀'],
  e:'CuSO<sub>4</sub> + H<sub>2</sub>S = CuS↓ + H<sub>2</sub>SO<sub>4</sub>',
  ion:'Cu<sup>2+</sup> + H<sub>2</sub>S = CuS↓ + 2H<sup>+</sup>',
  p:'溶液变浑浊，生成黑色沉淀。',
  n:'弱酸也能沉淀 Cu²⁺，因为 CuS 的溶解度极小（Ksp 约 10⁻³⁶）。'
},
{
  c:'salt', t:['气体'],
  e:'K<sub>2</sub>CO<sub>3</sub> + 2HCl = 2KCl + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'CO<sub>3</sub><sup>2−</sup> + 2H<sup>+</sup> = H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'产生大量气泡。'
},
{
  c:'salt', t:['气体'],
  e:'(NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub> + 2HCl = 2NH<sub>4</sub>Cl + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'产生气泡，同时有刺激性气味。',
  n:'碳酸铵与酸反应放出 CO₂，因含 NH₄⁺ 也需注意与碱的反应。'
},
{
  c:'salt', t:['气体'],
  e:'Ca(HCO<sub>3</sub>)<sub>2</sub> + 2HCl = CaCl<sub>2</sub> + 2H<sub>2</sub>O + 2CO<sub>2</sub>↑',
  ion:'HCO<sub>3</sub><sup>−</sup> + H<sup>+</sup> = H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'产生大量气泡。',
  n:'暂时硬水与水壶水垢的形成有关。'
},
{
  c:'salt', t:['沉淀'],
  e:'Ca(HCO<sub>3</sub>)<sub>2</sub> + Ca(OH)<sub>2</sub> = 2CaCO<sub>3</sub>↓ + 2H<sub>2</sub>O',
  ion:'Ca<sup>2+</sup> + 2HCO<sub>3</sub><sup>−</sup> + 2OH<sup>−</sup> = CaCO<sub>3</sub>↓ + CO<sub>3</sub><sup>2−</sup> + 2H<sub>2</sub>O',
  p:'生成白色沉淀，水的暂时硬度被降低。',
  n:'煮沸法或石灰法软化暂时硬水的原理。'
},
{
  c:'salt', t:['沉淀'],
  e:'NaHCO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + NaOH + H<sub>2</sub>O',
  ion:'HCO<sub>3</sub><sup>−</sup> + Ca<sup>2+</sup> + OH<sup>−</sup> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O',
  p:'生成白色沉淀。',
  n:'Ca(OH)₂ 过量时的产物；若 NaHCO₃ 过量则为 2NaHCO₃ + Ca(OH)₂ = CaCO₃↓ + Na₂CO₃ + 2H₂O。'
},
{
  c:'salt', t:['沉淀'],
  e:'2NaHCO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + Na<sub>2</sub>CO<sub>3</sub> + 2H<sub>2</sub>O',
  p:'生成白色沉淀，溶液仍显碱性。',
  n:'“少量/过量”问题：碱过量生成 NaOH，碱不足生成 Na₂CO₃。'
},
{
  c:'salt', t:[],
  e:'Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> + 3H<sub>2</sub>SO<sub>4</sub> = 3CaSO<sub>4</sub> + 2H<sub>3</sub>PO<sub>4</sub>',
  p:'磷灰石与硫酸反应，得到磷酸与硫酸钙。',
  n:'湿法磷酸生产；产物需分离硫酸钙（磷石膏）。'
},
{
  c:'salt', t:[],
  e:'Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> + 4H<sub>3</sub>PO<sub>4</sub> = 3Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub>',
  p:'生成可溶性的磷酸二氢钙。',
  n:'过磷酸钙（磷肥）的有效成分是 Ca(H₂PO₄)₂，不能与碱性物质混用。'
},
{
  c:'salt', t:['沉淀'],
  e:'Al<sub>2</sub>S<sub>3</sub> + 6H<sub>2</sub>O = 2Al(OH)<sub>3</sub>↓ + 3H<sub>2</sub>S↑',
  p:'遇水剧烈水解，产生白色沉淀与臭鸡蛋气味气体。',
  n:'双水解反应；因此 Al₂S₃ 不能在溶液中制取，只能用干法合成。'
},
{
  c:'salt', t:['沉淀'],
  e:'Fe<sup>3+</sup> + 3H<sub>2</sub>O ⇌ Fe(OH)<sub>3</sub> + 3H<sup>+</sup>',
  p:'加热 FeCl₃ 溶液颜色加深，pH 降低，久置出现红褐色浑浊。',
  n:'盐类水解：Fe³⁺ 水解程度较大，配制 FeCl₃ 溶液需加少量盐酸抑制水解。'
},
{
  c:'salt', t:['沉淀'],
  e:'Al<sup>3+</sup> + 3H<sub>2</sub>O ⇌ Al(OH)<sub>3</sub>(胶体) + 3H<sup>+</sup>',
  p:'生成氢氧化铝胶体，具有吸附性。',
  n:'明矾净水的原理：胶体吸附水中悬浮杂质而沉降。'
},
{
  c:'salt', t:[],
  e:'CO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O ⇌ HCO<sub>3</sub><sup>−</sup> + OH<sup>−</sup>',
  p:'纯碱溶液显碱性。',
  n:'“纯碱不是碱而是盐”，其碱性来自水解；加热可促进水解。'
},
{
  c:'salt', t:[],
  e:'NH<sub>4</sub><sup>+</sup> + H<sub>2</sub>O ⇌ NH<sub>3</sub>·H<sub>2</sub>O + H<sup>+</sup>',
  p:'氯化铵溶液显酸性。',
  n:'铵态氮肥不能与草木灰（K₂CO₃）混用，因双水解会放出氨气降低肥效。'
},
{
  c:'salt', t:['沉淀'],
  e:'CaCl<sub>2</sub> + 2AgNO<sub>3</sub> = 2AgCl↓ + Ca(NO<sub>3</sub>)<sub>2</sub>',
  ion:'Ag<sup>+</sup> + Cl<sup>−</sup> = AgCl↓',
  p:'生成白色沉淀。'
},
{
  c:'salt', t:['沉淀'],
  e:'K<sub>2</sub>SO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + 2KCl',
  ion:'Ba<sup>2+</sup> + SO<sub>4</sub><sup>2−</sup> = BaSO<sub>4</sub>↓',
  p:'生成白色沉淀。'
},
{
  c:'salt', t:[],
  e:'BaCO<sub>3</sub> + 2HCl = BaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'BaCO<sub>3</sub> + 2H<sup>+</sup> = Ba<sup>2+</sup> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'白色沉淀溶解并放出气体。',
  n:'区分 BaSO₄ 与 BaCO₃：加盐酸，溶解并放气的是 BaCO₃。'
},
{
  c:'salt', t:['气体'],
  e:'Cu<sub>2</sub>(OH)<sub>2</sub>CO<sub>3</sub> + 4HCl = 2CuCl<sub>2</sub> + CO<sub>2</sub>↑ + 3H<sub>2</sub>O',
  p:'绿色固体溶解，溶液变蓝绿色，同时放出气体。',
  n:'铜绿（碱式碳酸铜）能溶于酸，这是“铜锈可用酸洗去”的原理。'
},
/* ---------- 氧化物补充 ---------- */
{
  c:'oxide', t:['化合'],
  e:'Na<sub>2</sub>O + H<sub>2</sub>O = 2NaOH',
  p:'白色固体剧烈水化，放出大量热，溶液呈强碱性。',
  n:'碱性氧化物与水化合生成碱，属于化合反应。'
},
{
  c:'oxide', t:['化合'],
  e:'K<sub>2</sub>O + H<sub>2</sub>O = 2KOH',
  p:'白色固体溶解，放出大量热。'
},
{
  c:'oxide', t:['化合'],
  e:'BaO + H<sub>2</sub>O = Ba(OH)<sub>2</sub>',
  p:'白色固体水化，生成强碱。',
  n:'Ba(OH)₂ 是强碱，可溶，与 Ca(OH)₂（微溶）不同。'
},
{
  c:'oxide', t:['化合'],
  e:'CaO + CO<sub>2</sub> = CaCO<sub>3</sub>',
  p:'生石灰在空气中逐渐失效，表面生成白色硬壳。',
  n:'干燥剂 CaO 不能用于干燥 CO₂、SO₂ 等酸性气体。'
},
{
  c:'oxide', t:['化合','高温'],
  e:'CaO + SiO<sub>2</sub> {{高温}} CaSiO<sub>3</sub>',
  p:'高温下熔融成玻璃状物质。',
  n:'玻璃工业中石灰石与石英的反应，也是炼铁炉渣形成的反应。'
},
{
  c:'oxide', t:['化合'],
  e:'Na<sub>2</sub>O + CO<sub>2</sub> = Na<sub>2</sub>CO<sub>3</sub>',
  p:'白色固体吸收二氧化碳，生成纯碱。',
  n:'与 Na₂O₂ 不同：Na₂O₂ 与 CO₂ 反应会放出 O₂。'
},
{
  c:'oxide', t:['化合'],
  e:'MgO + SO<sub>3</sub> = MgSO<sub>4</sub>',
  p:'白色固体吸收三氧化硫，生成硫酸镁。',
  n:'碱性氧化物与酸性氧化物化合生成盐。'
},
{
  c:'oxide', t:['化合','高温'],
  e:'P<sub>2</sub>O<sub>5</sub> + 3CaO {{高温}} Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>',
  p:'高温下生成磷酸钙。',
  n:'磷矿石的主要成分即为 Ca₃(PO₄)₂。'
},
{
  c:'oxide', t:['氧化还原','高温'],
  e:'<b data-s="red">Fe</b>O + <b data-s="ox">C</b>O {{高温}} <b data-s="redp">Fe</b> + <b data-s="oxp">C</b>O<sub>2</sub>',
  p:'黑色粉末逐渐变为灰黑色金属铁。',
  o:{x:2,r:2}, n:'CO 作还原剂，被氧化为 CO₂；这是高炉中 FeO 被还原的一步。'
},
{
  c:'oxide', t:['氧化还原','高温'],
  e:'<b data-s="red">Zn</b>O + <b data-s="ox">C</b>O {{高温}} <b data-s="redp">Zn</b> + <b data-s="oxp">C</b>O<sub>2</sub>',
  p:'白色粉末变为银灰色金属锌蒸气，冷凝得锌粉。',
  o:{x:2,r:2}, n:'火法炼锌的简化反应。'
},
{
  c:'oxide', t:['高温'],
  e:'Al<sub>2</sub>O<sub>3</sub> + Na<sub>2</sub>CO<sub>3</sub> {{高温}} 2NaAlO<sub>2</sub> + CO<sub>2</sub>↑',
  p:'高温下反应放出气体，生成偏铝酸钠。',
  n:'从铝土矿中提取氧化铝的碱熔法基础。'
},
{
  c:'oxide', t:['化合'],
  e:'SO<sub>2</sub> + Na<sub>2</sub>O = Na<sub>2</sub>SO<sub>3</sub>',
  p:'酸性氧化物与碱性氧化物直接化合。'
},

/* ---------- 热分解补充 ---------- */
{
  c:'decomp', t:['氧化还原','分解','加热'],
  e:'2Na<b data-s="red">N</b><b data-s="ox">O</b><sub>3</sub> {{Δ}} 2Na<b data-s="redp">N</b>O<sub>2</sub> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'白色固体受热熔化并放出助燃气体。',
  o:{x:4,r:4}, n:'硝酸盐热分解规律：K、Ca、Na 的硝酸盐 → 亚硝酸盐 + O₂。'
},
{
  c:'decomp', t:['氧化还原','分解','加热'],
  e:'2K<b data-s="red">N</b><b data-s="ox">O</b><sub>3</sub> {{Δ}} 2K<b data-s="redp">N</b>O<sub>2</sub> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'白色晶体受热放出气体。',
  o:{x:4,r:4}, n:'黑火药的成分之一（KNO₃、S、C），受热分解放出氧气助燃。'
},
{
  c:'decomp', t:['氧化还原','分解','加热'],
  e:'2Pb(<b data-s="red">N</b><b data-s="ox">O</b><sub>3</sub>)<sub>2</sub> {{Δ}} 2PbO + 4<b data-s="redp">N</b>O<sub>2</sub>↑ + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'白色固体受热变黄，产生红棕色气体。',
  o:{x:4,r:4}, n:'活动性较弱的金属硝酸盐分解为氧化物 + NO₂ + O₂。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'NH<sub>4</sub>HCO<sub>3</sub> {{Δ}} NH<sub>3</sub>↑ + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'白色固体受热完全消失，产生两种气体。',
  n:'碳酸氢铵受热易分解，是“气肥”，需深施覆土。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'Ca(HCO<sub>3</sub>)<sub>2</sub> {{Δ}} CaCO<sub>3</sub>↓ + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'加热时溶液变浑浊，生成白色沉淀。',
  n:'暂时硬水加热软化（水垢形成）的原因。'
},
{
  c:'decomp', t:['分解','加热'],
  e:'Mg(HCO<sub>3</sub>)<sub>2</sub> {{Δ}} MgCO<sub>3</sub>↓ + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'加热产生白色沉淀与气体。'
},
{
  c:'decomp', t:['氧化还原','分解','加热'],
  e:'2<b data-s="red">Ag</b><sub>2</sub><b data-s="ox">O</b> {{Δ}} 4<b data-s="redp">Ag</b> + <b data-s="oxp">O</b><sub>2</sub>↑',
  p:'棕黑色固体受热分解，析出银白色银。',
  o:{x:2,r:2}, n:'氧化银不稳定，加热即可还原为银。'
},
{
  c:'decomp', t:['氧化还原','分解','加热'],
  e:'(<b data-s="ox">N</b>H<sub>4</sub>)<sub>2</sub><b data-s="red">Cr</b><sub>2</sub>O<sub>7</sub> {{Δ}} <b data-s="redp">Cr</b><sub>2</sub>O<sub>3</sub> + <b data-s="oxp">N</b><sub>2</sub>↑ + 4H<sub>2</sub>O',
  p:'橙红色固体受热后剧烈反应，体积膨胀数十倍，生成绿色固体（“火山”实验）。',
  o:{x:6,r:6}, n:'重铬酸铵的自身氧化还原分解：Cr 由 +6 降到 +3，N 由 −3 升到 0。'
},
/* ---------- 有机反应补充 ---------- */
{
  c:'organic', t:['加热','光照'],
  e:'C<sub>6</sub>H<sub>6</sub> + 3Cl<sub>2</sub> {{光照}} C<sub>6</sub>H<sub>6</sub>Cl<sub>6</sub>',
  p:'苯与氯气在光照下发生加成，生成白色固体（六六六）。',
  n:'注意区分：光照下苯与 Cl₂ 发生<em>加成</em>，FeCl₃ 催化下发生<em>取代</em>。'
},
{
  c:'organic', t:['加热'],
  e:'CH<sub>3</sub>CH<sub>2</sub>OH + HBr {{Δ}} CH<sub>3</sub>CH<sub>2</sub>Br + H<sub>2</sub>O',
  p:'生成无色油状液体（溴乙烷）。',
  n:'醇与氢卤酸的取代反应，断裂 C—O 键；也可用 NaBr + 浓硫酸代替 HBr。'
},
{
  c:'organic', t:['气体'],
  e:'2CH<sub>3</sub>COOH + Na<sub>2</sub>CO<sub>3</sub> = 2CH<sub>3</sub>COONa + H<sub>2</sub>O + CO<sub>2</sub>↑',
  ion:'2CH<sub>3</sub>COOH + CO<sub>3</sub><sup>2−</sup> = 2CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O + CO<sub>2</sub>↑',
  p:'产生大量气泡。',
  n:'酸性强弱：乙酸 > 碳酸 > 苯酚，故乙酸能与碳酸钠反应而苯酚不能。'
},
{
  c:'organic', t:['氧化还原','加热','沉淀'],
  e:'H<b data-s="ox">C</b>HO + 4<b data-s="red">Ag</b>(NH<sub>3</sub>)<sub>2</sub>OH {{Δ}} (NH<sub>4</sub>)<sub>2</sub><b data-s="oxp">C</b>O<sub>3</sub> + 4<b data-s="redp">Ag</b>↓ + 6NH<sub>3</sub> + 2H<sub>2</sub>O',
  p:'试管内壁出现<em>银镜</em>。',
  o:{x:4,r:4}, n:'甲醛含两个醛基当量（可看作 H—CO—H），1 mol 甲醛可还原 4 mol Ag，是银镜效应最强的醛。'
},
{
  c:'organic', t:['氧化还原','加热','沉淀'],
  e:'H<b data-s="ox">C</b>HO + 4<b data-s="red">Cu</b>(OH)<sub>2</sub> + 2NaOH {{Δ}} Na<sub>2</sub><b data-s="oxp">C</b>O<sub>3</sub> + 2<b data-s="redp">Cu</b><sub>2</sub>O↓ + 6H<sub>2</sub>O',
  p:'出现<em>砖红色</em>沉淀。',
  o:{x:4,r:4}, n:'甲醛与斐林试剂反应，1 mol 甲醛还原 4 mol Cu(OH)₂。'
},
{
  c:'organic', t:['氧化还原','加热','沉淀'],
  e:'<b data-s="ox">C</b><sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 2<b data-s="red">Ag</b>(NH<sub>3</sub>)<sub>2</sub>OH {{Δ}} <b data-s="oxp">C</b><sub>6</sub>H<sub>12</sub>O<sub>7</sub> + 2<b data-s="redp">Ag</b>↓ + 4NH<sub>3</sub> + H<sub>2</sub>O',
  o:{x:2,r:2},
  p:'出现<em>银镜</em>，说明葡萄糖具有还原性。',
  n:'葡萄糖是还原性糖（含醛基）；蔗糖是非还原性糖，需水解后才起银镜反应。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'C<sub>12</sub>H<sub>22</sub>O<sub>11</sub> + H<sub>2</sub>O {{催化剂}} C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>',
  p:'无明显现象，产物有甜味（葡萄糖与果糖）。',
  n:'蔗糖水解生成一分子葡萄糖和一分子果糖，两者互为同分异构体。'
},
{
  c:'organic', t:['加热'],
  e:'(C<sub>17</sub>H<sub>35</sub>COO)<sub>3</sub>C<sub>3</sub>H<sub>5</sub> + 3NaOH {{Δ}} 3C<sub>17</sub>H<sub>35</sub>COONa + C<sub>3</sub>H<sub>5</sub>(OH)<sub>3</sub>',
  p:'油脂层逐渐消失，生成黏稠的肥皂液。',
  n:'皂化反应（油脂的碱性水解）；产物高级脂肪酸钠即肥皂主要成分，甘油是副产物。'
},
{
  c:'organic', t:['加热'],
  e:'CH<sub>2</sub>=CH<sub>2</sub> + Cl<sub>2</sub> = CH<sub>2</sub>ClCH<sub>2</sub>Cl',
  p:'气体颜色褪去，生成无色油状液体（1,2-二氯乙烷）。',
  n:'加成反应，可用于制备聚氯乙烯的单体上游原料。'
},
{
  c:'organic', t:['加热','催化剂'],
  e:'CH≡CH + HCl {{催化剂}} CH<sub>2</sub>=CHCl',
  p:'生成氯乙烯气体。',
  n:'氯乙烯是合成聚氯乙烯（PVC）的单体，属于加聚反应的前体。'
},
{
  c:'organic', t:[],
  e:'CH<sub>3</sub>COOH + NaOH = CH<sub>3</sub>COONa + H<sub>2</sub>O',
  ion:'CH<sub>3</sub>COOH + OH<sup>−</sup> = CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O',
  p:'无明显现象，溶液由酸性变为中性偏碱。',
  n:'弱酸与强碱中和，离子式中弱酸保留分子形式。'
},

/* ---------- 金属 × 弱酸 ---------- */
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Mg</b> + 2CH<sub>3</sub>COO<b data-s="red">H</b> = <b data-s="oxp">Mg</b>(CH<sub>3</sub>COO)<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Mg + 2CH<sub>3</sub>COOH = Mg<sup>2+</sup> + 2CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>↑',
  p:'镁条表面持续产生气泡并逐渐溶解。',
  o:{x:2,r:2}, n:'弱酸与活泼金属反应，速率比与盐酸反应慢。'
},
{
  c:'metal', t:['氧化还原','置换'],
  e:'<b data-s="ox">Fe</b> + 2CH<sub>3</sub>COO<b data-s="red">H</b> = <b data-s="oxp">Fe</b>(CH<sub>3</sub>COO)<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>↑',
  ion:'Fe + 2CH<sub>3</sub>COOH = Fe<sup>2+</sup> + 2CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>↑',
  p:'铁屑缓慢溶解，产生气泡，溶液变浅绿色。',
  o:{x:2,r:2}
},
{
  c:'metal', t:['氧化还原','置换','气体'],
  e:'2<b data-s="ox">Na</b> + 2CH<sub>3</sub>COO<b data-s="red">H</b> = 2CH<sub>3</sub>COO<b data-s="oxp">Na</b> + <b data-s="redp">H</b><sub>2</sub>↑',
  p:'钠粒剧烈反应，产生大量气泡。',
  o:{x:2,r:2}, n:'钠与酸反应比与水更剧烈；钠过量时仍会与水继续反应。'
},

/* ---------- 电解补充 ---------- */
{
  c:'electro', t:['氧化还原','电解'],
  e:'4<b data-s="red">Ag</b>NO<sub>3</sub> + 2H<sub>2</sub><b data-s="ox">O</b> {{电解}} 4<b data-s="redp">Ag</b> + <b data-s="oxp">O</b><sub>2</sub>↑ + 4HNO<sub>3</sub>',
  p:'阴极析出银白色银，阳极产生气泡，溶液酸性增强。',
  o:{x:4,r:4}, n:'电解硝酸银溶液（惰性电极）；阴极质量增加可用于电镀与银量法。'
},
{
  c:'electro', t:['氧化还原','电解'],
  e:'2<b data-s="red">H</b><b data-s="ox">Cl</b> {{电解}} <b data-s="redp">H</b><sub>2</sub>↑ + <b data-s="oxp">Cl</b><sub>2</sub>↑',
  p:'两极分别产生可燃气体与黄绿色气体，体积比 1:1。',
  o:{x:2,r:2}, n:'电解盐酸溶液；实质是电解 HCl 本身，溶液浓度逐渐降低。'
},
{
  c:'electro', t:['氧化还原'],
  e:'<b data-s="ox">Zn</b> + 2<b data-s="red">Mn</b>O<sub>2</sub> + 2H<sub>2</sub>O = <b data-s="oxp">Zn</b>(OH)<sub>2</sub> + 2<b data-s="redp">Mn</b>OOH',
  p:'普通锌锰干电池放电，输出电压约 1.5 V。',
  o:{x:2,r:2}, n:'碱性锌锰电池的总反应；负极锌被氧化，正极 MnO₂ 被还原为 MnOOH。'
},

/* ---------- 工业补充 ---------- */
{
  c:'industry', t:['氧化还原','催化剂','高温'],
  e:'<b data-s="ox">C</b>H<sub>4</sub> + <b data-s="red">H</b><sub>2</sub>O {{催化剂, 高温}} <b data-s="oxp">C</b>O + 3<b data-s="redp">H</b><sub>2</sub>',
  p:'天然气与水蒸气在高温催化下重整，得到合成气。',
  o:{x:6,r:6}
},
{
  c:'industry', t:['氧化还原','催化剂','加热'],
  e:'<b data-s="ox">C</b>O + <b data-s="red">H</b><sub>2</sub>O {{催化剂, Δ}} <b data-s="oxp">C</b>O<sub>2</sub> + <b data-s="redp">H</b><sub>2</sub>',
  p:'进一步转化，提高氢气产率。',
  o:{x:2,r:2}, n:'水煤气变换反应（WGS），工业制氢与合成氨原料气净化的关键步骤。'
},

/* ---------- 歧化补充 ---------- */
{
  c:'disprop', t:['氧化还原'],
  e:'5<b data-s="red">Cl</b><sub>2</sub> + <b data-s="ox">I</b><sub>2</sub> + 6H<sub>2</sub>O = 2H<b data-s="oxp">I</b>O<sub>3</sub> + 10H<b data-s="redp">Cl</b>',
  p:'氯气将碘氧化为碘酸，溶液呈无色。',
  o:{x:10,r:10}, n:'说明氧化性 Cl₂ > HIO₃ > I₂；碘在强氧化剂作用下可被氧化到 +5 价。'
},
{
  c:'disprop', t:['氧化还原','歧化','加热'],
  e:'3<b data-s="ox red">Cl</b>O<sup>−</sup> {{Δ}} 2<b data-s="redp">Cl</b><sup>−</sup> + <b data-s="oxp">Cl</b>O<sub>3</sub><sup>−</sup>',
  o:{x:4,r:4},
  p:'加热次氯酸盐溶液，漂白能力下降。',
  n:'次氯酸根在受热时歧化；因此漂白液应低温避光保存，不宜加热使用。'
},

/* ---------- 配位补充 ---------- */
{
  c:'complex', t:[],
  e:'2C<sub>3</sub>H<sub>5</sub>(OH)<sub>3</sub> + Cu(OH)<sub>2</sub> = [Cu(C<sub>3</sub>H<sub>6</sub>O<sub>3</sub>)<sub>2</sub>]<sup>2−</sup> + 2H<sub>2</sub>O + 2H<sup>+</sup>',
  p:'氢氧化铜沉淀溶解，溶液变为<em>绛蓝色</em>。',
  n:'甘油（丙三醇）与 Cu(OH)₂ 的特征显色反应，可用于鉴别多元醇。'
},
{
  c:'complex', t:[],
  e:'Fe<sup>3+</sup> + 6F<sup>−</sup> = [FeF<sub>6</sub>]<sup>3−</sup>',
  p:'黄色溶液逐渐变为无色。',
  n:'F⁻ 可掩蔽 Fe³⁺（形成稳定无色配合物），因此检验 Fe³⁺ 时不能用含 F⁻ 的体系。'
},
/* @DATA_END */
];

/* ==================================================================
   物质表：化学式 → [中文名, 分组]
   用于「涉及物质」筛选；未收录的物质自动以化学式显示
   ================================================================== */
const SPECIES = {
  /* --- 金属单质 --- */
  'Na':['钠','金属单质'], 'K':['钾','金属单质'], 'Li':['锂','金属单质'],
  'Mg':['镁','金属单质'], 'Al':['铝','金属单质'], 'Fe':['铁','金属单质'],
  'Cu':['铜','金属单质'], 'Zn':['锌','金属单质'], 'Ag':['银','金属单质'],
  'Ca':['钙','金属单质'], 'Ba':['钡','金属单质'], 'Hg':['汞','金属单质'],
  'Pb':['铅','金属单质'], 'Sn':['锡','金属单质'], 'Ni':['镍','金属单质'],
  'Mn':['锰','金属单质'], 'Ti':['钛','金属单质'], 'W':['钨','金属单质'],

  /* --- 非金属单质 --- */
  'H2':['氢气','非金属单质'], 'O2':['氧气','非金属单质'], 'O3':['臭氧','非金属单质'],
  'Cl2':['氯气','非金属单质'], 'Br2':['溴','非金属单质'], 'I2':['碘','非金属单质'],
  'F2':['氟气','非金属单质'], 'N2':['氮气','非金属单质'], 'S':['硫','非金属单质'],
  'P':['磷','非金属单质'], 'C':['碳','非金属单质'], 'Si':['硅','非金属单质'],

  /* --- 氧化物 --- */
  'H2O':['水','氧化物'], 'CO2':['二氧化碳','氧化物'], 'CO':['一氧化碳','氧化物'],
  'SO2':['二氧化硫','氧化物'], 'SO3':['三氧化硫','氧化物'],
  'NO':['一氧化氮','氧化物'], 'NO2':['二氧化氮','氧化物'], 'N2O':['一氧化二氮','氧化物'],
  'CuO':['氧化铜','氧化物'], 'Cu2O':['氧化亚铜','氧化物'],
  'CaO':['氧化钙','氧化物'], 'MgO':['氧化镁','氧化物'],
  'Al2O3':['氧化铝','氧化物'], 'Fe2O3':['氧化铁','氧化物'],
  'Fe3O4':['四氧化三铁','氧化物'], 'FeO':['氧化亚铁','氧化物'],
  'ZnO':['氧化锌','氧化物'], 'MnO2':['二氧化锰','氧化物'],
  'HgO':['氧化汞','氧化物'], 'PbO':['氧化铅','氧化物'], 'PbO2':['二氧化铅','氧化物'],
  'SiO2':['二氧化硅','氧化物'], 'P2O5':['五氧化二磷','氧化物'],
  'Na2O':['氧化钠','氧化物'], 'K2O':['氧化钾','氧化物'], 'BaO':['氧化钡','氧化物'],
  'Ag2O':['氧化银','氧化物'], 'WO3':['三氧化钨','氧化物'], 'TiO2':['二氧化钛','氧化物'],
  'Mn3O4':['四氧化三锰','氧化物'],

  /* --- 其他化合物 --- */
  'NH3':['氨','其他化合物'], 'H2O2':['过氧化氢','其他化合物'],

  /* --- 酸 --- */
  'HCl':['盐酸','酸'], 'H2SO4':['硫酸','酸'], 'HNO3':['硝酸','酸'],
  'H2CO3':['碳酸','酸'], 'HF':['氢氟酸','酸'], 'HBr':['氢溴酸','酸'],
  'HI':['氢碘酸','酸'], 'HClO':['次氯酸','酸'], 'H2S':['氢硫酸','酸'],
  'H2SiO3':['硅酸','酸'],

  /* --- 碱 --- */
  'NaOH':['氢氧化钠','碱'], 'KOH':['氢氧化钾','碱'],
  'Ca(OH)2':['氢氧化钙','碱'], 'Ba(OH)2':['氢氧化钡','碱'],
  'NH3·H2O':['氨水','碱'], 'LiOH':['氢氧化锂','碱'],
  'Mg(OH)2':['氢氧化镁','碱'], 'Al(OH)3':['氢氧化铝','碱'],
  'Fe(OH)2':['氢氧化亚铁','碱'], 'Fe(OH)3':['氢氧化铁','碱'],
  'Cu(OH)2':['氢氧化铜','碱'],

  /* --- 盐 --- */
  'NaCl':['氯化钠','盐'], 'KCl':['氯化钾','盐'], 'CaCl2':['氯化钙','盐'],
  'BaCl2':['氯化钡','盐'], 'MgCl2':['氯化镁','盐'], 'AlCl3':['氯化铝','盐'],
  'FeCl2':['氯化亚铁','盐'], 'FeCl3':['氯化铁','盐'], 'CuCl2':['氯化铜','盐'],
  'ZnCl2':['氯化锌','盐'], 'MnCl2':['氯化锰','盐'], 'NiCl2':['氯化镍','盐'],
  'NaBr':['溴化钠','盐'], 'KBr':['溴化钾','盐'], 'NaI':['碘化钠','盐'],
  'KI':['碘化钾','盐'], 'NaF':['氟化钠','盐'],
  'AgCl':['氯化银','盐'], 'AgBr':['溴化银','盐'], 'AgI':['碘化银','盐'],
  'AgNO3':['硝酸银','盐'],
  'Na2CO3':['碳酸钠','盐'], 'NaHCO3':['碳酸氢钠','盐'], 'CaCO3':['碳酸钙','盐'],
  'BaCO3':['碳酸钡','盐'], 'MgCO3':['碳酸镁','盐'],
  'Cu2(OH)2CO3':['碱式碳酸铜','盐'],
  'Na2SO4':['硫酸钠','盐'], 'CuSO4':['硫酸铜','盐'], 'FeSO4':['硫酸亚铁','盐'],
  'ZnSO4':['硫酸锌','盐'], 'MgSO4':['硫酸镁','盐'],
  'Al2(SO4)3':['硫酸铝','盐'], 'Fe2(SO4)3':['硫酸铁','盐'],
  'Ag2SO4':['硫酸银','盐'], 'PbSO4':['硫酸铅','盐'], 'BaSO4':['硫酸钡','盐'],
  'CaSO4':['硫酸钙','盐'], 'CaSO4·2H2O':['石膏','盐'],
  'CuSO4·5H2O':['胆矾','盐'], 'NaHSO4':['硫酸氢钠','盐'],
  'Na2SO3':['亚硫酸钠','盐'], 'CaSO3':['亚硫酸钙','盐'],
  'NaNO3':['硝酸钠','盐'], 'KNO3':['硝酸钾','盐'],
  'Cu(NO3)2':['硝酸铜','盐'], 'Fe(NO3)2':['硝酸亚铁','盐'],
  'Fe(NO3)3':['硝酸铁','盐'], 'Pb(NO3)2':['硝酸铅','盐'],
  'Al(NO3)3':['硝酸铝','盐'], 'Zn(NO3)2':['硝酸锌','盐'],
  'NH4NO3':['硝酸铵','盐'], 'NH4Cl':['氯化铵','盐'],
  '(NH4)2SO4':['硫酸铵','盐'], '(NH4)2CO3':['碳酸铵','盐'],
  'KClO3':['氯酸钾','盐'], 'KClO4':['高氯酸钾','盐'],
  'KMnO4':['高锰酸钾','盐'], 'K2MnO4':['锰酸钾','盐'],
  'NaClO':['次氯酸钠','盐'], 'Ca(ClO)2':['次氯酸钙','盐'],
  'Na2O2':['过氧化钠','盐'], 'NaAlO2':['偏铝酸钠','盐'],
  'Na2ZnO2':['锌酸钠','盐'], 'Na2[Zn(OH)4]':['四羟基合锌酸钠','盐'],
  'Na2SiO3':['硅酸钠','盐'], 'CaSiO3':['硅酸钙','盐'],
  'Na2S':['硫化钠','盐'], 'FeS':['硫化亚铁','盐'], 'FeS2':['二硫化亚铁','盐'],
  'HgS':['硫化汞','盐'], 'Ag2S':['硫化银','盐'], 'CuS':['硫化铜','盐'],
  'ZnS':['硫化锌','盐'], 'MgS':['硫化镁','盐'],
  'Na2S2O3':['硫代硫酸钠','盐'], 'Na2S4O6':['连四硫酸钠','盐'],
  'KSCN':['硫氰化钾','盐'],
  'CaC2':['碳化钙','盐'], 'Al4C3':['碳化铝','盐'],
  'NaH':['氢化钠','盐'], 'CaH2':['氢化钙','盐'],
  'Mg3N2':['氮化镁','盐'], 'AlN':['氮化铝','盐'], 'CaCN2':['氰氨化钙','盐'],
  'Al2S3':['硫化铝','盐'], 'Ca3P2':['磷化钙','盐'],
  'PCl3':['三氯化磷','盐'], 'PCl5':['五氯化磷','盐'],
  'SiF4':['四氟化硅','盐'], 'SiCl4':['四氯化硅','盐'],
  'TiCl4':['四氯化钛','盐'], 'SiHCl3':['三氯氢硅','盐'],
  'MgBr2':['溴化镁','盐'], 'AlBr3':['溴化铝','盐'], 'ZnI2':['碘化锌','盐'],
  'FeI2':['碘化亚铁','盐'], 'FeBr2':['溴化亚铁','盐'], 'FeBr3':['溴化铁','盐'],
  'SnCl2':['氯化亚锡','盐'], 'SnCl4':['四氯化锡','盐'],
  'Cu2S':['硫化亚铜','盐'], 'Ag(NH3)2OH':['银氨溶液','盐'],
  '[Ag(NH3)2]OH':['银氨溶液','盐'],
  'K2S':['硫化钾','盐'], 'KO2':['超氧化钾','盐'],
  'NaNO2':['亚硝酸钠','盐'], 'NaBrO3':['溴酸钠','盐'],
  'HgSO4':['硫酸汞','盐'],
  '[Ag(NH3)2]Cl':['氯化二氨合银','盐'],
  '[Cu(NH3)4]SO4':['硫酸四氨合铜','盐'],
  '[Cu(NH3)4](OH)2':['氢氧化四氨合铜','盐'],
  '[Cu(H2O)4]SO4·H2O':['五水合硫酸铜','盐'],
  '[FeCl4]':['四氯合铁酸根','盐'], 'Fe(SCN)3':['硫氰化铁','盐'],

  /* --- 有机物 --- */
  'CH4':['甲烷','有机物'], 'C2H4':['乙烯','有机物'],
  'C2H2':['乙炔','有机物'], 'C6H6':['苯','有机物'],
  'C6H12':['环己烷','有机物'],
  'CH3CH2OH':['乙醇','有机物'], 'CH3OH':['甲醇','有机物'],
  'CH3COOH':['乙酸','有机物'], 'CH3CHO':['乙醛','有机物'],
  'C6H5OH':['苯酚','有机物'], 'C6H12O6':['葡萄糖','有机物'],
  'CH3COOCH2CH3':['乙酸乙酯','有机物'],
  'CH3Cl':['一氯甲烷','有机物'], 'CH3CH2Cl':['氯乙烷','有机物'],
  'CH3CH2Br':['溴乙烷','有机物'], 'CH2BrCH2Br':['1,2-二溴乙烷','有机物'],
  'CHBr2CHBr2':['1,1,2,2-四溴乙烷','有机物'],
  'C6H5Br':['溴苯','有机物'], 'C6H5Cl':['氯苯','有机物'],
  'C6H5NO2':['硝基苯','有机物'], 'C6H2Br3OH':['三溴苯酚','有机物'],
  'CH3CH2OCH2CH3':['乙醚','有机物'],
  '(C6H10O5)n':['淀粉','有机物'], '(C6H10O5)':['淀粉','有机物'],
  '[CH2—CH2]':['聚乙烯链节','有机物'],
  'C16H34':['十六烷','有机物'],
  'C8H18':['辛烷','有机物'], 'C8H16':['辛烯','有机物'],
  'CO(NH2)2':['尿素','有机物'],
  'CH3CH2ONa':['乙醇钠','有机物'],
  'C6H5ONa':['苯酚钠','有机物'], 'CH3COONa':['乙酸钠','有机物'],
  'CH3COONH4':['乙酸铵','有机物'], 'Ca(CH3COO)2':['乙酸钙','有机物'],
  'Zn(CH3COO)2':['乙酸锌','有机物'],
  '[Fe(C6H5O)6]':['苯酚铁配合物','有机物']
};

/* 同一物质的不同写法归一（前者 → 后者） */
const SPECIES_ALIAS = {
  'C2H5OH':'CH3CH2OH',
  'CH≡CH':'C2H2',
  'CH2=CH2':'C2H4',
  'C2H5ONa':'CH3CH2ONa',
  'Ag(NH3)2OH':'[Ag(NH3)2]OH',
  '(C6H10O5)':'(C6H10O5)n'
};

const SPECIES_GROUPS = ['金属单质','非金属单质','氧化物','酸','碱','盐','有机物','其他化合物'];

/* ==================================================================
   教材出处
   EQ_BOOK：EQ 下标 → [[教材代号, 正文页码], …]
   页码是教材正文印刷页码（不是 PDF 页序）。
   来源：对五本人教版高中化学教材逐页提取文本后，按“反应物 → 箭头 → 生成物”
   的化学式序列做结构化比对；未收录于教材的条目不出现在此表中。
   ================================================================== */
const BOOKS = [
  { k:'b1', n:'必修第一册',                 short:'必修一' },
  { k:'b2', n:'必修第二册',                 short:'必修二' },
  { k:'x1', n:'选择性必修1 化学反应原理',    short:'选必一' },
  { k:'x2', n:'选择性必修2 物质结构与性质',  short:'选必二' },
  { k:'x3', n:'选择性必修3 有机化学基础',    short:'选必三' }
];
const EQ_BOOK = {
  0: [['b1',37]],
  1: [['b1',35]],
  2: [['b1',35]],
  3: [['b1',23]],
  5: [['b1',101]],
  10: [['x2',80]],
  15: [['b2',98]],
  17: [['b1',82]],
  21: [['b2',2]],
  25: [['b1',28]],
  26: [['b1',23]],
  27: [['b1',70]],
  30: [['b1',45]],
  32: [['b2',5]],
  44: [['b1',28], ['x1',101]],
  45: [['b1',24], ['x1',8]],
  48: [['b2',48], ['x1',10]],
  49: [['b2',54], ['x1',14]],
  50: [['b2',48]],
  51: [['b2',102], ['x1',18]],
  52: [['b1',22]],
  53: [['b2',21]],
  54: [['x1',13]],
  56: [['b1',22], ['b2',48]],
  57: [['b2',2]],
  59: [['b2',3]],
  60: [['b2',3]],
  61: [['b1',103]],
  65: [['x1',21]],
  67: [['b2',13]],
  68: [['b2',14], ['x1',30]],
  69: [['b2',14], ['x1',45]],
  70: [['b1',28]],
  75: [['b1',27]],
  89: [['b2',3]],
  98: [['b1',48]],
  102: [['b1',18]],
  105: [['b1',27]],
  108: [['b1',27]],
  128: [['x1',44]],
  129: [['b1',28], ['x1',44]],
  131: [['b1',28], ['b2',98]],
  136: [['b2',14]],
  143: [['b1',37]],
  144: [['b1',37]],
  145: [['b1',27], ['b2',53]],
  148: [['b1',39]],
  153: [['b1',28], ['x1',44]],
  154: [['b2',14]],
  158: [['b2',15]],
  159: [['b1',47]],
  166: [['b1',47]],
  168: [['b2',13]],
  174: [['x1',17]],
  184: [['b2',103]],
  186: [['b2',98]],
  187: [['b2',98], ['x1',108]],
  188: [['b2',98]],
  189: [['x1',21]],
  192: [['b1',28], ['x1',101]],
  193: [['x1',99]],
  195: [['x1',112]],
  196: [['b1',72], ['x1',44]],
  201: [['x2',96]],
  205: [['b2',53]],
  206: [['b2',67]],
  210: [['x1',17]],
  214: [['x3',48]],
  223: [['b2',79]],
  225: [['x3',70]],
  247: [['x1',103]],
  258: [['b2',2]],
  284: [['b1',103]],
  285: [['b1',103]],
  286: [['b1',103]],
  311: [['b2',6]],
  360: [['b2',14]],
  380: [['x1',21]],
  382: [['x1',18]],
  383: [['x1',19]],
  433: [['b2',102]],
  456: [['b2',2]],
  468: [['b2',21]],
  537: [['b1',48]],
  625: [['b1',39]],
  656: [['x1',43]],
  663: [['x1',18]],
  675: [['b1',47]],
  719: [['b1',22]],
  722: [['b2',98]],
  747: [['x1',99]],
  1232: [['x3',48]],
  1313: [['x1',13]],
  1316: [['x1',101]],
};

/* 反向查询：教材代号 + 页码 → 条目下标 */
const BOOK_INDEX = (function(){
  const m = new Map();
  Object.keys(EQ_BOOK).forEach(k=>{
    EQ_BOOK[k].forEach(([b,pg])=>{
      const key = b + ':' + pg;
      if(!m.has(key)) m.set(key, []);
      m.get(key).push(+k);
    });
  });
  return m;
})();
