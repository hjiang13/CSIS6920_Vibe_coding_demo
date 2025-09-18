# Vibe Coding 网站演示

一个视觉化、直观的网站，向信息系统研究生介绍Vibe Coding编程方法。

## 🎯 项目目标

构建一个托管在GitHub Pages上的视觉化网站，向信息系统研究生介绍Vibe Coding：

- **什么是Vibe Coding** - 核心概念和工作流程
- **为什么有效** - 基于认知科学和软件工程研究的证据
- **如何使用** - 实践指南、模板和脚手架
- **交互式演示** - 实际编程体验

## 🌟 主要特性

- 📱 响应式设计，支持移动端
- 🌙 深色/浅色主题切换
- 💻 交互式代码编辑器（Monaco Editor）
- 🐍 Python代码执行（Pyodide）
- 📊 数据可视化图表（Chart.js）
- 🔄 工作流程图（Mermaid.js）
- ⚡ 快速反馈循环演示

## 🚀 快速开始

### 本地运行
```bash
# 克隆仓库
git clone https://github.com/yourusername/CSIS6920_Vibe_coding_demo.git
cd CSIS6920_Vibe_coding_demo

# 启动本地服务器
python3 -m http.server 8000
# 或使用Node.js
npx serve .

# 访问网站
open http://localhost:8000
```

### GitHub Pages部署
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择从main分支的根目录部署
4. 访问 `https://yourusername.github.io/CSIS6920_Vibe_coding_demo`

## 📁 项目结构

```
/
├── index.html          # 首页：什么是Vibe Coding
├── why.html           # 为什么有效（理论、证据、图表）
├── how.html           # 如何使用（工作流程、脚手架、模板）
├── demos.html         # 交互式演示
├── test.html          # 功能测试页面
├── assets/
│   ├── styles.css     # 自定义样式
│   ├── logo.svg       # 网站Logo
│   └── hero.svg       # 英雄图片
├── js/
│   ├── app.js         # 主应用逻辑和工具函数
│   ├── charts.js      # 图表功能（Chart.js）
│   ├── editor.js      # 代码编辑器（Monaco Editor）
│   ├── demos.js       # 演示功能
│   └── py.js          # Python运行时（Pyodide）
├── README.md          # 项目说明
└── DEPLOYMENT.md      # 部署指南
```

## 🎨 技术栈

- **前端框架**: 纯HTML/CSS/JavaScript
- **样式**: Tailwind CSS (CDN)
- **代码编辑器**: Monaco Editor
- **图表**: Chart.js
- **流程图**: Mermaid.js
- **Python运行时**: Pyodide
- **图标**: 自定义SVG

## 📚 页面内容

### 1. 首页 (index.html)
- Vibe Coding核心概念介绍
- 工作流程图（Mermaid图表）
- 核心原则说明
- 快速开始按钮

### 2. 为什么有效 (why.html)
- 认知科学理论基础
- 软件工程实践证据
- 学习效果数据图表
- 相关研究引用

### 3. 如何使用 (how.html)
- 7步工作流程详解
- 实用模板和脚手架
- 检查清单
- 最佳实践建议

### 4. 交互式演示 (demos.html)
- JavaScript代码编辑器演示
- Python代码执行演示
- 数据处理交互演示
- 实时反馈和结果展示

## 🔧 功能特性

### 代码编辑器
- 语法高亮
- 自动补全
- 错误检测
- 多语言支持（JavaScript, Python）

### 数据可视化
- 学习保持率对比图表
- 迭代速度提升曲线
- 错误率降低统计
- 综合能力雷达图

### 交互式演示
- 实时代码执行
- 结果可视化
- 错误处理和反馈
- 代码质量评估

## 🎯 教学目标

通过这个网站，学生将学会：

1. **理解Vibe Coding的核心概念**
   - 从直觉到代码的转换过程
   - 快速反馈循环的重要性
   - 脚手架和提示词的使用

2. **掌握实践技能**
   - 7步工作流程
   - 代码模板和检查清单
   - 问题分解和解决策略

3. **体验编程过程**
   - 交互式代码编辑
   - 实时结果反馈
   - 错误调试和优化

## 📖 使用指南

### 对于教师
1. 在课堂上展示网站内容
2. 引导学生完成交互式演示
3. 讨论Vibe Coding的理论基础
4. 布置实践作业

### 对于学生
1. 阅读理论部分了解概念
2. 跟随工作流程进行实践
3. 完成交互式演示练习
4. 应用到实际编程项目中

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

本项目用于CSIS6920课程教学目的。

## 📞 联系方式

如有问题，请通过GitHub Issues联系。

---

**CSIS6920 信息系统课程 - 杨斯顿州立大学**
