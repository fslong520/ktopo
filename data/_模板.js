/* ============================================================
 * 知识拓扑图 · 知识集模板
 * 使用方法：
 *   1. 复制本文件为 data/你的知识集.js
 *   2. 按下方格式填写节点与依赖边
 *   3. 在 data/index.js 的 TOPOLOGY_SETS 中登记名称与文件名
 *   4. 刷新页面，顶部下拉选择即见效果
 *
 * 字段说明：
 *   name    知识集名称（显示在顶部）
 *   badge   可选。节点右上角徽章显示哪个属性，如 { key:"难度", label:"难度" }
 *   groups  可选。分组（主题/领域），节点按组着色、分组内部按顺序排列。
 *           若不需要分组，可省略 groups，直接写 nodes（见文件末尾注释）。
 *   edges   依赖边 [前置id, 后继id]，箭头从前置指向后继，
 *           表示"先学/先了解前者，再学/再看后者"。
 *   filters 可选。界面据此动态生成筛选控件：
 *           { key, name, type:"multi", options:[{v,label,color}] }  → 勾选组
 *           { key, name, type:"range", min, max }                    → 数值范围
 * ============================================================ */
window.TOPOLOGY_DATA = {
  name: "我的知识集",

  badge: { key: "difficulty", label: "难度" },

  groups: [
    {
      id: "g1",
      name: "主题一",
      nodes: [
        { id: "a1", n: "知识点A", difficulty: 1, 备注: "可加任意属性，详情栏都会显示" },
        { id: "a2", n: "知识点B", difficulty: 2 },
      ],
    },
    {
      id: "g2",
      name: "主题二",
      nodes: [
        { id: "b1", n: "知识点C", difficulty: 3 },
        { id: "b2", n: "知识点D", difficulty: 4 },
      ],
    },
  ],

  /* 依赖边：先学 A 再学 B */
  edges: [
    ["a1", "a2"],
    ["a2", "b1"],
    ["b1", "b2"],
  ],

  /* 可选筛选控件 */
  filters: [
    { key: "difficulty", name: "难度上限", type: "range", min: 1, max: 10 },
  ],
};

/* 不用分组时的写法：
window.TOPOLOGY_DATA = {
  name: "我的知识集",
  nodes: [
    { id: "a", n: "知识点A", 难度: 1 },
    { id: "b", n: "知识点B", 难度: 2 },
  ],
  edges: [["a", "b"]],
};
*/
