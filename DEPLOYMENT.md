# Vibe Coding Website Deployment Guide

## 🚀 GitHub Pages Deployment

### Method 1: Deploy from Root Directory (Recommended)

1. **Commit all files to GitHub repository**
   ```bash
   git add .
   git commit -m "Initial Vibe Coding website"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository settings (Settings)
   - Scroll to "Pages" section
   - Select "Source": "Deploy from a branch"
   - Select "Branch": "main"
   - Select "Folder": "/ (root)"
   - Click "Save"

3. **Access Website**
   - Website will be available at `https://[username].github.io/[repository-name]`
   - Example: `https://hailongjiang.github.io/CSIS6920_Vibe_coding_demo`

### Method 2: Deploy from docs Directory

1. **Create docs directory and move files**
   ```bash
   mkdir docs
   cp *.html docs/
   cp -r assets docs/
   cp -r js docs/
   ```

2. **Update all HTML file links**
   - Update relative paths with `../` prefix
   - Example: `href="assets/styles.css"` → `href="../assets/styles.css"`

3. **Enable GitHub Pages**
   - Select "Folder": "/docs"

## 🔧 Local Testing

### Using Python Server
```bash
cd /path/to/project
python3 -m http.server 8000
```
Access: http://localhost:8000

### Using Node.js Server
```bash
npx serve .
```

## 📁 File Structure

```
/
├── index.html          # Homepage: What is Vibe Coding
├── why.html           # Why it works
├── how.html           # How to use
├── demos.html         # Interactive demos
├── test.html          # Test page
├── assets/
│   ├── styles.css     # Custom styles
│   ├── logo.svg       # Website logo
│   └── hero.svg       # Hero image
├── js/
│   ├── app.js         # Main application logic
│   ├── charts.js      # Chart functionality
│   ├── editor.js      # Code editor
│   ├── demos.js       # Demo functionality
│   └── py.js          # Python runtime
└── README.md          # Project documentation
```

## 🌐 Feature Highlights

### ✅ Implemented Features
- [x] Responsive design (mobile-friendly)
- [x] Dark/light theme toggle
- [x] Interactive code editor (Monaco Editor)
- [x] JavaScript code execution
- [x] Python code simulation execution
- [x] Data processing demos
- [x] Chart visualization (Chart.js)
- [x] Workflow diagrams (Mermaid.js)
- [x] Smooth scrolling and animation effects

### 🔄 External Dependencies
- Tailwind CSS (CDN)
- Monaco Editor (CDN)
- Chart.js (CDN)
- Mermaid.js (CDN)
- Pyodide (CDN) - Python runtime

## 🎯 Learning Objectives

Through this website, students will learn:

1. **Understand Vibe Coding Core Concepts**
   - Process from intuition to code
   - Importance of fast feedback loops
   - Use of scaffolds and prompts

2. **Master Practical Skills**
   - 7-step workflow
   - Code templates and checklists
   - Problem decomposition and solution strategies

3. **Experience Programming Process**
   - Interactive code editing
   - Real-time result feedback
   - Error debugging and optimization

## 🐛 Troubleshooting

### Common Issues

1. **Charts not displaying**
   - Check if Chart.js is loaded correctly
   - Ensure chart functions are called on why.html page

2. **Code editor not working**
   - Check Monaco Editor CDN link
   - Ensure editor is initialized on demos.html page

3. **Theme toggle not working**
   - Check if app.js is loaded correctly
   - Ensure theme toggle button exists

4. **Python functionality unavailable**
   - Pyodide needs time to load
   - Check network connection
   - View browser console for errors

### Debug Steps

1. Open browser developer tools (F12)
2. Check Console tab for error messages
3. Check Network tab for resource loading
4. Use test.html page for functionality testing

## 📱 Mobile Optimization

Website is optimized for mobile devices:
- Responsive layout
- Touch-friendly buttons
- Readable font sizes
- Charts adapted for small screens

## 🔒 Security Considerations

- All code execution is client-side
- No server-side processing
- User data is not sent to external servers
- Python code runs in Pyodide sandbox

## 📈 Performance Optimization

- External libraries loaded via CDN
- Images use SVG format
- CSS and JS files compressed
- Lazy loading for non-critical resources

## 🎯 Next Steps for Improvement

- [ ] Add more interactive demos
- [ ] Implement real Python code execution
- [ ] Add user progress tracking
- [ ] Create more code templates
- [ ] Add code quality checking
- [ ] Implement code sharing functionality