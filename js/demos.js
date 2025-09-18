// Vibe Coding Demo Functionality

// Show specified demo
function showDemo(demoType) {
    // Hide all demos
    const demos = ['javascript-demo', 'python-demo', 'data-processing-demo'];
    demos.forEach(demo => {
        const element = document.getElementById(demo);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    // Reset all tab styles
    const tabs = ['js-tab', 'python-tab', 'data-tab'];
    tabs.forEach(tab => {
        const element = document.getElementById(tab);
        if (element) {
            element.className = 'px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors';
        }
    });
    
    // Show selected demo
    const selectedDemo = document.getElementById(demoType + '-demo');
    if (selectedDemo) {
        selectedDemo.classList.remove('hidden');
    }
    
    // Update selected tab style
    const selectedTab = document.getElementById(demoType + '-tab');
    if (selectedTab) {
        selectedTab.className = 'px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors';
    }
    
    // Add fade-in animation
    if (selectedDemo) {
        selectedDemo.classList.add('fade-in');
    }
}

// Process grade data
function processScores() {
    const input = document.getElementById('scores-input');
    const output = document.getElementById('scores-output');
    
    if (!input || !output) {
        showNotification('元素未找到', 'error');
        return;
    }
    
    try {
        // Parse input data
        const scoresText = input.value.trim();
        const scores = scoresText.split(',').map(s => parseFloat(s.trim())).filter(s => !isNaN(s));
        
        if (scores.length === 0) {
            throw new Error('请输入有效的数字');
        }
        
        // Validate score range
        const validScores = scores.filter(score => score >= 0 && score <= 100);
        const invalidScores = scores.filter(score => score < 0 || score > 100);
        
        if (validScores.length === 0) {
            throw new Error('没有有效的分数（0-100范围）');
        }
        
        // Calculate statistics
        const average = validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
        const max = Math.max(...validScores);
        const min = Math.min(...validScores);
        
        // 分类等级
        const grades = validScores.map(score => {
            if (score >= 90) return 'A';
            if (score >= 80) return 'B';
            if (score >= 70) return 'C';
            if (score >= 60) return 'D';
            return 'F';
        });
        
        // 统计等级分布
        const gradeDistribution = grades.reduce((acc, grade) => {
            acc[grade] = (acc[grade] || 0) + 1;
            return acc;
        }, {});
        
        // 生成输出
        let outputHtml = `
            <div class="space-y-4">
                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-800 mb-2">✅ 数据处理成功</h4>
                    <p class="text-green-700">处理了 ${validScores.length} 个有效分数</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">📊 基本统计</h4>
                        <ul class="space-y-1 text-sm">
                            <li>平均分: <span class="font-mono font-bold">${average.toFixed(2)}</span></li>
                            <li>最高分: <span class="font-mono font-bold">${max}</span></li>
                            <li>最低分: <span class="font-mono font-bold">${min}</span></li>
                            <li>有效分数: <span class="font-mono font-bold">${validScores.length}</span></li>
                        </ul>
                    </div>
                    
                    <div class="bg-white p-4 rounded-lg border">
                        <h4 class="font-semibold text-gray-800 mb-2">🎯 等级分布</h4>
                        <ul class="space-y-1 text-sm">
                            ${Object.entries(gradeDistribution)
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(([grade, count]) => 
                                    `<li>等级 ${grade}: <span class="font-mono font-bold">${count}</span> 人</li>`
                                ).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">📈 可视化建议</h4>
                    <p class="text-blue-700 text-sm">
                        可以绘制柱状图显示等级分布，或绘制箱线图分析分数分布情况。
                    </p>
                </div>
        `;
        
        if (invalidScores.length > 0) {
            outputHtml += `
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-yellow-800 mb-2">⚠️ 数据警告</h4>
                    <p class="text-yellow-700 text-sm">
                        发现 ${invalidScores.length} 个无效分数（超出0-100范围）: ${invalidScores.join(', ')}
                    </p>
                </div>
            `;
        }
        
        output.innerHTML = outputHtml;
        
    } catch (error) {
        output.innerHTML = `
            <div class="error p-4 rounded-lg">
                <strong>处理错误:</strong><br>
                <code>${error.message}</code>
            </div>
        `;
    }
}

// 创建代码示例
function createCodeExample(language, problem, solution) {
    const examples = {
        javascript: {
            problem: "计算数组元素平方的最大值",
            solution: `function findMaxSquare(numbers) {
    const squares = numbers.map(num => num * num);
    return Math.max(...squares);
}`
        },
        python: {
            problem: "分析文本中单词频率",
            solution: `def analyze_word_frequency(text):
    from collections import Counter
    words = text.lower().split()
    return Counter(words).most_common(5)`
        }
    };
    
    return examples[language] || { problem: "未知问题", solution: "无解决方案" };
}

// 生成随机测试数据
function generateTestData(type) {
    const generators = {
        numbers: () => Array.from({length: 10}, () => Math.floor(Math.random() * 100)),
        text: () => {
            const words = ['hello', 'world', 'python', 'programming', 'code', 'data', 'analysis', 'machine', 'learning', 'algorithm'];
            return Array.from({length: 20}, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        },
        scores: () => Array.from({length: 15}, () => Math.floor(Math.random() * 40) + 60)
    };
    
    return generators[type] ? generators[type]() : [];
}

// 验证代码质量
function validateCodeQuality(code, language) {
    const issues = [];
    
    // 基本检查
    if (code.length < 10) {
        issues.push('代码太短，可能不完整');
    }
    
    if (language === 'javascript') {
        if (!code.includes('function') && !code.includes('=>')) {
            issues.push('建议使用函数封装代码');
        }
        if (!code.includes('console.log') && !code.includes('return')) {
            issues.push('建议添加输出或返回值');
        }
    }
    
    if (language === 'python') {
        if (!code.includes('def ') && !code.includes('print')) {
            issues.push('建议使用函数或添加输出');
        }
        if (!code.includes('#')) {
            issues.push('建议添加注释说明');
        }
    }
    
    return {
        score: Math.max(0, 100 - issues.length * 20),
        issues: issues
    };
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 默认显示JavaScript演示
    showDemo('javascript');
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showDemo('javascript');
                    break;
                case '2':
                    e.preventDefault();
                    showDemo('python');
                    break;
                case '3':
                    e.preventDefault();
                    showDemo('data-processing');
                    break;
            }
        }
    });
});

// 导出函数供其他文件使用
window.Demos = {
    showDemo,
    processScores,
    createCodeExample,
    generateTestData,
    validateCodeQuality
};
