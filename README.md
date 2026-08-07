# 知识拓扑图 · Knowledge Topology

把信奥（NOI/CSP）知识体系按主题分板块，每板块一棵**知识树**：可并行学习的知识点并列成行，有前置依赖的知识点逐层递进。数据按信奥学习常识设计成分支结构（无环）。

## 打开方式

浏览器**直接打开**对应 HTML 即可（数据已内联，仅需联网加载 Cytoscape CDN）：

| 文件 | 说明 |
|------|------|
| `demo-tree.html` | **推荐**。左侧切换板块，右侧单板块知识树（dagre 分层，前置在左、后继在右，分叉并列） |
| `demo-cy.html` | 整图模式：板块折叠成圆，点击展开内部知识点（简单靠内、难靠外），紫色粗线为板块学习主线 |
| `demo-g6.html` | G6 版（备选） |
| `index.html` | 纯原生自研静态版 |

交互：悬停节点高亮前后置链、点击看详情、滚轮缩放、拖拽平移。

## 目录结构

```
知识拓扑图/
├── index.html          # 原生静态版
├── demo-tree.html      # 分板块知识树（Cytoscape + dagre）
├── demo-cy.html        # 整图折叠版（Cytoscape + expand-collapse）
├── demo-g6.html        # G6 版
├── README.md
└── data/
    ├── index.js        # 知识集清单
    ├── _模板.js        # 数据模板
    └── 信奥知识.js     # 信奥体系数据（分支依赖）
```

## 数据格式

每套知识集 = 一个 js 文件，定义 `window.TOPOLOGY_DATA`：

```js
window.TOPOLOGY_DATA = {
  name: "信奥体系知识",
  badge: { key: "diff", label: "难度" },
  groups: [
    {
      id: "lang",
      name: "C++语言",
      nodes: [
        { id: "lang-1", n: "变量与常量", level: "j", diff: 1, url: "https://oi-wiki.org/lang/var/" },
        // ...任意自定义属性，详情栏会显示
      ],
    },
    // ...更多分组
  ],
  // 依赖边：["前置id", "后继id"]，箭头从前指向后（先学前 / 后学后）
  edges: [
    ["lang-1", "lang-2"],
    ["lang-1", "lang-3"],   // lang-2 与 lang-3 并列（无互相依赖，可同时学）
  ],
  filters: [ ... ],        // 可选：筛选控件
};
```

要点：

- **分支并列**：无互相依赖的知识点放同一层并列；有前置依赖的往后递进。数据据此设计（每板块多个并列根、无环）。
- **id 全局唯一**，边里引用的 id 必须存在。
- **分组可省**：无分组时用顶层 `nodes: [...]`。
- **`url` 或 `link`** 键渲染为可点击链接。

## 内置示例

`data/信奥知识.js`：213 个知识点、261 条依赖边，覆盖 C++ 语言、算法基础、搜索、数据结构、树与图论、动态规划、字符串、数学、计算几何、杂项技巧十个主题。

每个知识点标注 NOI 大纲级别（入门/提高/NOI）与难度系数（1-10），并链向 OI Wiki 文档。

## 技术栈

- [Cytoscape.js](https://js.cytoscape.org/) + [cytoscape-dagre](https://github.com/cytoscape/cytoscape.js-dagre) + [cytoscape-expand-collapse](https://github.com/iVis-at-Bilkent/cytoscape.js-expand-collapse)
- 纯前端，无构建步骤
