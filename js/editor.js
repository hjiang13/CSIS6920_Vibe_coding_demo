// Vibe Coding 代码编辑器功能

let jsEditor = null;
let pythonEditor = null;

// 初始化Monaco编辑器
function initializeEditors() {
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
    
    require(['vs/editor/editor.main'], function () {
        // 初始化JavaScript编辑器
        const jsEditorElement = document.getElementById('js-editor');
        if (jsEditorElement) {
            jsEditor = monaco.editor.create(jsEditorElement, {
                value: getDefaultJavaScriptCode(),
                language: 'javascript',
                theme: 'vs-light',
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true
            });
        }
        
        // 初始化Python编辑器
        const pythonEditorElement = document.getElementById('python-editor');
        if (pythonEditorElement) {
            pythonEditor = monaco.editor.create(pythonEditorElement, {
                value: getDefaultPythonCode(),
                language: 'python',
                theme: 'vs-light',
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true
            });
        }
    });
}

// 获取默认JavaScript代码
function getDefaultJavaScriptCode() {
    return `// Vibe Coding JavaScript 演示
// 问题：计算数组中每个数字的平方，并找出最大值

function findMaxSquare(numbers) {
    // 1. 计算每个数字的平方
    const squares = numbers.map(num => num * num);
    
    // 2. 找出最大值
    const maxSquare = Math.max(...squares);
    
    // 3. 返回结果
    return {
        squares: squares,
        maxSquare: maxSquare
    };
}

// 测试数据
const testNumbers = [1, 2, 3, 4, 5];
const result = findMaxSquare(testNumbers);

console.log('原始数组:', testNumbers);
console.log('平方数组:', result.squares);
console.log('最大平方值:', result.maxSquare);

// 返回结果供显示
result;`;
}

// 获取默认Python代码
function getDefaultPythonCode() {
    return `# Vibe Coding Python 演示
# 问题：分析文本中单词的频率，并可视化结果

from collections import Counter
import matplotlib.pyplot as plt

def analyze_word_frequency(text, top_n=5):
    """
    分析文本中单词的频率
    """
    # 1. 转换为小写并分词
    words = text.lower().split()
    
    # 2. 统计频率
    word_counts = Counter(words)
    
    # 3. 获取最常见的单词
    most_common = word_counts.most_common(top_n)
    
    return {
        'word_counts': dict(word_counts),
        'most_common': most_common,
        'total_words': len(words),
        'unique_words': len(word_counts)
    }

# 测试文本
test_text = "hello world hello python programming is fun python is powerful"
result = analyze_word_frequency(test_text)

print(f"原始文本: {test_text}")
print(f"总单词数: {result['total_words']}")
print(f"唯一单词数: {result['unique_words']}")
print(f"单词频率: {result['word_counts']}")
print(f"最常见的{len(result['most_common'])}个单词:")
for word, count in result['most_common']:
    print(f"  {word}: {count}")

# 返回结果供显示
result`;
}

// 运行JavaScript代码
function runJavaScript() {
    if (!jsEditor) {
        showNotification('编辑器未初始化', 'error');
        return;
    }
    
    const code = jsEditor.getValue();
    const outputElement = document.getElementById('js-output');
    
    if (!outputElement) {
        showNotification('输出元素未找到', 'error');
        return;
    }
    
    try {
        // 清空输出
        outputElement.innerHTML = '';
        
        // 重写console.log来捕获输出
        const logs = [];
        const originalLog = console.log;
        console.log = function(...args) {
            logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            originalLog.apply(console, args);
        };
        
        // 执行代码
        const result = eval(code);
        
        // 恢复原始console.log
        console.log = originalLog;
        
        // 显示结果
        let output = '';
        if (logs.length > 0) {
            output += '<div class="mb-4"><strong>控制台输出:</strong></div>';
            output += '<div class="bg-gray-100 p-3 rounded mb-4">';
            output += logs.map(log => `<div>${log}</div>`).join('');
            output += '</div>';
        }
        
        if (result !== undefined) {
            output += '<div class="mb-2"><strong>返回值:</strong></div>';
            output += '<div class="bg-blue-50 p-3 rounded">';
            output += `<pre>${JSON.stringify(result, null, 2)}</pre>`;
            output += '</div>';
        }
        
        outputElement.innerHTML = output || '<p class="text-gray-500">代码执行完成，无输出</p>';
        
    } catch (error) {
        outputElement.innerHTML = `
            <div class="error p-4 rounded-lg">
                <strong>执行错误:</strong><br>
                <code>${error.message}</code>
            </div>
        `;
    }
}

// 重置JavaScript代码
function resetJavaScript() {
    if (jsEditor) {
        jsEditor.setValue(getDefaultJavaScriptCode());
    }
    const outputElement = document.getElementById('js-output');
    if (outputElement) {
        outputElement.innerHTML = '<p class="text-gray-500">点击"运行代码"查看结果...</p>';
    }
}

// 运行Python代码
function runPython() {
    if (!pythonEditor) {
        showNotification('编辑器未初始化', 'error');
        return;
    }
    
    const code = pythonEditor.getValue();
    const outputElement = document.getElementById('python-output');
    
    if (!outputElement) {
        showNotification('输出元素未找到', 'error');
        return;
    }
    
    // 显示加载状态
    outputElement.innerHTML = '<div class="loading"></div> 正在运行Python代码...';
    
    // 使用Pyodide运行Python代码
    if (window.pyodide) {
        runPythonWithPyodide(code, outputElement);
    } else {
        // 如果Pyodide未加载，显示模拟结果
        showPythonSimulation(code, outputElement);
    }
}

// 使用Pyodide运行Python代码
async function runPythonWithPyodide(code, outputElement) {
    try {
        // 运行Python代码
        const result = pyodide.runPython(code);
        
        // 显示结果
        let output = '<div class="success p-4 rounded-lg">';
        output += '<strong>Python执行结果:</strong><br>';
        output += `<pre>${result}</pre>`;
        output += '</div>';
        
        outputElement.innerHTML = output;
        
    } catch (error) {
        outputElement.innerHTML = `
            <div class="error p-4 rounded-lg">
                <strong>Python执行错误:</strong><br>
                <code>${error.message}</code>
            </div>
        `;
    }
}

// 显示Python模拟结果
function showPythonSimulation(code, outputElement) {
    // 模拟Python执行结果
    const output = `
        <div class="success p-4 rounded-lg">
            <strong>Python模拟执行结果:</strong><br>
            <div class="bg-gray-100 p-3 rounded mt-2">
                <div>原始文本: hello world hello python programming is fun python is powerful</div>
                <div>总单词数: 10</div>
                <div>唯一单词数: 7</div>
                <div>单词频率: {'hello': 2, 'world': 1, 'python': 2, 'programming': 1, 'is': 2, 'fun': 1, 'powerful': 1}</div>
                <div>最常见的5个单词:</div>
                <div>  hello: 2</div>
                <div>  python: 2</div>
                <div>  is: 2</div>
                <div>  world: 1</div>
                <div>  programming: 1</div>
            </div>
            <div class="mt-2 text-sm text-gray-600">
                <em>注意：这是模拟结果。实际环境中会使用Pyodide运行真实的Python代码。</em>
            </div>
        </div>
    `;
    
    outputElement.innerHTML = output;
}

// 重置Python代码
function resetPython() {
    if (pythonEditor) {
        pythonEditor.setValue(getDefaultPythonCode());
    }
    const outputElement = document.getElementById('python-output');
    if (outputElement) {
        outputElement.innerHTML = '<p class="text-gray-500">点击"运行代码"查看结果...</p>';
    }
}

// 页面加载时初始化编辑器
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保DOM完全加载
    setTimeout(initializeEditors, 500);
});

// 导出函数供其他文件使用
window.Editor = {
    runJavaScript,
    resetJavaScript,
    runPython,
    resetPython,
    initializeEditors
};
