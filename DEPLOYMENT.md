# Vibe Coding 网站部署指南

## 🚀 GitHub Pages 部署

### 方法一：从根目录部署（推荐）

1. **提交所有文件到GitHub仓库**
   ```bash
   git add .
   git commit -m "Initial Vibe Coding website"
   git push origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库设置 (Settings)
   - 滚动到 "Pages" 部分
   - 选择 "Source": "Deploy from a branch"
   - 选择 "Branch": "main"
   - 选择 "Folder": "/ (root)"
   - 点击 "Save"

3. **访问网站**
   - 网站将在 `https://[username].github.io/[repository-name]` 可用
   - 例如：`https://hailongjiang.github.io/CSIS6920_Vibe_coding_demo`

### 方法二：从docs目录部署

1. **创建docs目录并移动文件**
   ```bash
   mkdir docs
   cp *.html docs/
   cp -r assets docs/
   cp -r js docs/
   ```

2. **更新所有HTML文件中的链接**
   - 将相对路径更新为 `../` 前缀
   - 例如：`href="assets/styles.css"` → `href="../assets/styles.css"`

3. **启用GitHub Pages**
   - 选择 "Folder": "/docs"

## 🔧 本地测试

### 使用Python服务器
```bash
cd /path/to/project
python3 -m http.server 8000
```
访问：http://localhost:8000

### 使用Node.js服务器
```bash
npx serve .
```

## 📁 文件结构

```
/
├── index.html          # 首页：什么是Vibe Coding
├── why.html           # 为什么有效
├── how.html           # 如何使用
├── demos.html         # 交互式演示
├── test.html          # 测试页面
├── assets/
│   ├── styles.css     # 自定义样式
│   ├── logo.svg       # 网站Logo
│   └── hero.svg       # 英雄图片
├── js/
│   ├── app.js         # 主应用逻辑
│   ├── charts.js      # 图表功能
│   ├── editor.js      # 代码编辑器
│   ├── demos.js       # 演示功能
│   └── py.js          # Python运行时
└── README.md          # 项目说明
```

## 🌐 功能特性

### ✅ 已实现功能
- [x] 响应式设计（移动端友好）
- [x] 深色/浅色主题切换
- [x] 交互式代码编辑器（Monaco Editor）
- [x] JavaScript代码执行
- [x] Python代码模拟执行
- [x] 数据处理演示
- [x] 图表可视化（Chart.js）
- [x] 工作流程图（Mermaid.js）
- [x] 平滑滚动和动画效果

### 🔄 外部依赖
- Tailwind CSS (CDN)
- Monaco Editor (CDN)
- Chart.js (CDN)
- Mermaid.js (CDN)
- Pyodide (CDN) - Python运行时

## 🐛 故障排除

### 常见问题

1. **图表不显示**
   - 检查Chart.js是否正确加载
   - 确保在why.html页面中调用图表函数

2. **代码编辑器不工作**
   - 检查Monaco Editor CDN链接
   - 确保在demos.html页面中初始化编辑器

3. **主题切换不工作**
   - 检查app.js是否正确加载
   - 确保主题切换按钮存在

4. **Python功能不可用**
   - Pyodide需要时间加载
   - 检查网络连接
   - 查看浏览器控制台错误

### 调试步骤

1. 打开浏览器开发者工具 (F12)
2. 查看Console标签页的错误信息
3. 检查Network标签页的资源加载情况
4. 使用test.html页面进行功能测试

## 📱 移动端优化

网站已针对移动设备进行优化：
- 响应式布局
- 触摸友好的按钮
- 可读的字体大小
- 适配小屏幕的图表

## 🔒 安全注意事项

- 所有代码执行都在客户端进行
- 没有服务器端处理
- 用户数据不会发送到外部服务器
- Python代码通过Pyodide在沙箱中运行

## 📈 性能优化

- 使用CDN加载外部库
- 图片使用SVG格式
- CSS和JS文件压缩
- 延迟加载非关键资源

## 🎯 下一步改进

- [ ] 添加更多交互式演示
- [ ] 实现真实的Python代码执行
- [ ] 添加用户进度跟踪
- [ ] 创建更多代码模板
- [ ] 添加代码质量检查
- [ ] 实现代码分享功能
