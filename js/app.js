// Vibe Coding 主应用文件

// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // 主题切换事件
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark')) {
                body.classList.remove('dark');
                localStorage.setItem('theme', '');
                updateThemeIcon('');
            } else {
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon('dark');
            }
        });
    }
    
    // 添加页面加载动画
    addPageAnimations();
});

// 更新主题图标
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// 添加页面动画
function addPageAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// 平滑滚动到元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${getNotificationClass(type)}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 获取通知样式类
function getNotificationClass(type) {
    const classes = {
        'success': 'bg-green-500 text-white',
        'error': 'bg-red-500 text-white',
        'warning': 'bg-yellow-500 text-black',
        'info': 'bg-blue-500 text-white'
    };
    return classes[type] || classes['info'];
}

// 复制文本到剪贴板
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('已复制到剪贴板', 'success');
    } catch (err) {
        showNotification('复制失败', 'error');
    }
}

// 格式化代码
function formatCode(code, language = 'javascript') {
    // 简单的代码格式化
    return code
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/;\s*/g, ';\n')
        .replace(/\s*}\s*/g, '\n}\n')
        .trim();
}

// 验证代码语法（简单版本）
function validateCode(code, language = 'javascript') {
    const errors = [];
    
    if (language === 'javascript') {
        // 检查基本语法错误
        if (code.includes('function') && !code.includes('{')) {
            errors.push('函数缺少大括号');
        }
        if (code.includes('if') && !code.includes('(')) {
            errors.push('if语句缺少括号');
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// 生成随机ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 本地存储工具
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('存储失败:', e);
        }
    },
    
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('读取失败:', e);
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('删除失败:', e);
        }
    }
};

// 导出全局函数
window.VibeCoding = {
    scrollToElement,
    showNotification,
    copyToClipboard,
    formatCode,
    validateCode,
    generateId,
    debounce,
    throttle,
    Storage
};
