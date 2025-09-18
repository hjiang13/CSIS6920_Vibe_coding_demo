// Vibe Coding 图表功能

// 学习保持率图表
function createRetentionChart() {
    const ctx = document.getElementById('retentionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['传统编程', 'Vibe Coding', '混合方法'],
            datasets: [{
                label: '学习保持率 (%)',
                data: [45, 78, 62],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '不同编程方法的学习保持率对比',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// 迭代速度图表
function createSpeedChart() {
    const ctx = document.getElementById('speedChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
            datasets: [{
                label: '传统编程',
                data: [20, 25, 30, 35, 40, 45],
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4
            }, {
                label: 'Vibe Coding',
                data: [15, 35, 55, 70, 85, 95],
                borderColor: 'rgba(34, 197, 94, 1)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '编程技能提升速度对比',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// 错误率对比图表
function createErrorRateChart() {
    const ctx = document.getElementById('errorRateChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['传统编程错误率', 'Vibe Coding错误率'],
            datasets: [{
                data: [23, 8],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(34, 197, 94, 0.8)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '编程错误率对比',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

// 学习曲线图表
function createLearningCurveChart() {
    const ctx = document.getElementById('learningCurveChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['理解速度', '实现效率', '调试能力', '代码质量', '学习动机', '问题解决'],
            datasets: [{
                label: '传统编程',
                data: [60, 50, 45, 55, 40, 50],
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                pointBackgroundColor: 'rgba(239, 68, 68, 1)'
            }, {
                label: 'Vibe Coding',
                data: [85, 90, 80, 88, 95, 92],
                borderColor: 'rgba(34, 197, 94, 1)',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                pointBackgroundColor: 'rgba(34, 197, 94, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '编程能力综合评估',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// 创建所有图表
function createAllCharts() {
    createRetentionChart();
    createSpeedChart();
    createErrorRateChart();
    createLearningCurveChart();
}

// 页面加载时创建图表
document.addEventListener('DOMContentLoaded', function() {
    // 延迟创建图表，确保DOM完全加载
    setTimeout(createAllCharts, 100);
});

// 导出函数供其他文件使用
window.Charts = {
    createRetentionChart,
    createSpeedChart,
    createErrorRateChart,
    createLearningCurveChart,
    createAllCharts
};
