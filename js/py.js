// Vibe Coding Python 运行时集成 (Pyodide)

let pyodide = null;
let isPyodideLoaded = false;

// 初始化Pyodide
async function initializePyodide() {
    if (isPyodideLoaded) {
        return pyodide;
    }
    
    try {
        showNotification('正在加载Python运行时...', 'info');
        
        // 加载Pyodide
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        
        // 安装必要的包
        await pyodide.loadPackage(["matplotlib", "numpy", "pandas"]);
        
        isPyodideLoaded = true;
        showNotification('Python运行时加载完成', 'success');
        
        return pyodide;
    } catch (error) {
        console.error('Pyodide加载失败:', error);
        showNotification('Python运行时加载失败，将使用模拟模式', 'warning');
        return null;
    }
}

// 运行Python代码
async function runPythonCode(code) {
    if (!isPyodideLoaded) {
        await initializePyodide();
    }
    
    if (!pyodide) {
        return {
            success: false,
            output: 'Python运行时不可用',
            error: 'Pyodide未正确加载'
        };
    }
    
    try {
        // 设置输出捕获
        const output = [];
        pyodide.runPython(`
import sys
from io import StringIO
import contextlib

# 创建输出捕获器
class OutputCapture:
    def __init__(self):
        self.output = []
    
    def write(self, text):
        self.output.append(text)
    
    def flush(self):
        pass
    
    def get_output(self):
        return ''.join(self.output)

capture = OutputCapture()
sys.stdout = capture
sys.stderr = capture
        `);
        
        // 执行用户代码
        const result = pyodide.runPython(code);
        
        // 获取输出
        const capturedOutput = pyodide.runPython('capture.get_output()');
        
        return {
            success: true,
            output: capturedOutput,
            result: result,
            error: null
        };
        
    } catch (error) {
        return {
            success: false,
            output: '',
            result: null,
            error: error.message
        };
    }
}

// 创建Python可视化
async function createPythonVisualization(code) {
    if (!isPyodideLoaded) {
        await initializePyodide();
    }
    
    if (!pyodide) {
        return null;
    }
    
    try {
        // 设置matplotlib后端
        pyodide.runPython(`
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
        `);
        
        // 执行可视化代码
        const result = pyodide.runPython(code);
        
        // 生成图片
        const imageCode = `
import io
import base64

# 创建图片缓冲区
buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')
buf.seek(0)

# 转换为base64
img_base64 = base64.b64encode(buf.getvalue()).decode()
img_base64
        `;
        
        const imageBase64 = pyodide.runPython(imageCode);
        
        return {
            success: true,
            image: `data:image/png;base64,${imageBase64}`,
            error: null
        };
        
    } catch (error) {
        return {
            success: false,
            image: null,
            error: error.message
        };
    }
}

// 安装Python包
async function installPythonPackage(packageName) {
    if (!isPyodideLoaded) {
        await initializePyodide();
    }
    
    if (!pyodide) {
        return false;
    }
    
    try {
        await pyodide.loadPackage(packageName);
        return true;
    } catch (error) {
        console.error(`安装包 ${packageName} 失败:`, error);
        return false;
    }
}

// 获取Python环境信息
async function getPythonEnvironment() {
    if (!isPyodideLoaded) {
        await initializePyodide();
    }
    
    if (!pyodide) {
        return {
            version: '不可用',
            packages: [],
            platform: '不可用'
        };
    }
    
    try {
        const version = pyodide.runPython('import sys; sys.version');
        const packages = pyodide.runPython(`
import pkg_resources
installed_packages = [d.project_name for d in pkg_resources.working_set]
installed_packages
        `);
        
        return {
            version: version,
            packages: packages,
            platform: 'Web (Pyodide)'
        };
    } catch (error) {
        return {
            version: '未知',
            packages: [],
            platform: 'Web (Pyodide)',
            error: error.message
        };
    }
}

// 创建Python代码模板
function createPythonTemplate(templateType) {
    const templates = {
        data_analysis: `
# 数据分析模板
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建示例数据
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'score': [85, 92, 78, 88]
}

df = pd.DataFrame(data)
print("数据概览:")
print(df.describe())

# 绘制图表
plt.figure(figsize=(10, 6))
plt.subplot(1, 2, 1)
plt.bar(df['name'], df['score'])
plt.title('分数对比')
plt.xticks(rotation=45)

plt.subplot(1, 2, 2)
plt.scatter(df['age'], df['score'])
plt.xlabel('年龄')
plt.ylabel('分数')
plt.title('年龄与分数关系')

plt.tight_layout()
plt.show()
        `,
        
        machine_learning: `
# 机器学习模板
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 生成示例数据
X, y = make_classification(n_samples=1000, n_features=4, n_classes=2, random_state=42)

# 分割数据
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 训练模型
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估
accuracy = accuracy_score(y_test, y_pred)
print(f"模型准确率: {accuracy:.2f}")
print("\\n分类报告:")
print(classification_report(y_test, y_pred))
        `,
        
        web_scraping: `
# 网页抓取模板
import requests
from bs4 import BeautifulSoup
import json

def scrape_website(url):
    try:
        # 发送请求
        response = requests.get(url)
        response.raise_for_status()
        
        # 解析HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 提取标题
        title = soup.find('title')
        title_text = title.get_text() if title else "无标题"
        
        # 提取所有链接
        links = [a.get('href') for a in soup.find_all('a', href=True)]
        
        return {
            'title': title_text,
            'links_count': len(links),
            'links': links[:10]  # 只返回前10个链接
        }
    except Exception as e:
        return {'error': str(e)}

# 示例使用
url = "https://example.com"
result = scrape_website(url)
print(json.dumps(result, indent=2, ensure_ascii=False))
        `
    };
    
    return templates[templateType] || templates['data_analysis'];
}

// 页面加载时初始化Pyodide
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，避免阻塞页面加载
    setTimeout(initializePyodide, 1000);
});

// 导出函数供其他文件使用
window.Python = {
    initializePyodide,
    runPythonCode,
    createPythonVisualization,
    installPythonPackage,
    getPythonEnvironment,
    createPythonTemplate,
    isLoaded: () => isPyodideLoaded
};
