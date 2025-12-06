// DOM Elements
const schoolSelect = document.getElementById('schoolSelect');
const schoolSearch = document.getElementById('schoolSearch');
const generateBtn = document.getElementById('generateBtn');
const randomBtn = document.getElementById('randomBtn');
const questionsOutput = document.getElementById('questionsOutput');
const noSchoolMessage = document.getElementById('noSchoolMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const schoolCount = document.getElementById('schoolCount');
const questionTypeSelect = document.getElementById('questionTypeSelect');
const questionCountInput = document.getElementById('questionCount');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');

// Global variables
let schoolsData = null;
let questionsData = null;
let practiceHistory = [];
let currentSchool = null;
let currentQuestionType = null;

// Load schools data
async function loadSchoolsData() {
    try {
        const response = await fetch('schools.json');
        if (!response.ok) throw new Error('Failed to load school data');
        schoolsData = await response.json();
        console.log('School data loaded successfully');
        initializeSchoolDropdown();
    } catch (error) {
        console.error('Error loading school data:', error);
        schoolsData = { schools: [] };
        initializeSchoolDropdown();
    }
}

// Load questions data
async function loadQuestionsData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error('Failed to load questions data');
        questionsData = await response.json();
        console.log('Questions data loaded successfully');
    } catch (error) {
        console.error('Error loading questions data:', error);
        questionsData = {};
    }
}

// Load practice history
async function loadPracticeHistory() {
    try {
        const response = await fetch('practice-history.json');
        if (!response.ok) throw new Error('Failed to load practice history');
        const data = await response.json();
        practiceHistory = data.practiceHistory || [];
        console.log('Practice history loaded:', practiceHistory.length, 'records');
    } catch (error) {
        console.error('Error loading practice history:', error);
        practiceHistory = [];
    }
}

// Save practice history
async function savePracticeHistory() {
    try {
        const data = {
            practiceHistory: practiceHistory
        };
        
        // In a real application, you would send this to a server
        // For client-side only, we'll use localStorage as a fallback
        localStorage.setItem('practiceHistory', JSON.stringify(data));
        console.log('Practice history saved to localStorage');
    } catch (error) {
        console.error('Error saving practice history:', error);
    }
}

// Initialize school dropdown
function initializeSchoolDropdown() {
    if (!schoolsData || !schoolsData.schools) {
        console.error('School data not loaded');
        return;
    }
    
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    schoolsData.schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = `${school.chineseName} (${school.name})`;
        schoolSelect.appendChild(option);
    });
    
    if (schoolCount) {
        schoolCount.textContent = `共 ${schoolsData.schools.length} 所學校`;
    }
}

// Check if question is practiced
function isQuestionPracticed(questionText, schoolId, questionType) {
    return practiceHistory.some(record => 
        record.question === questionText && 
        record.schoolId === schoolId &&
        (!questionType || record.questionType === questionType)
    );
}

// Mark question as practiced
function markQuestionAsPracticed(questionText, questionType, buttonElement) {
    const schoolId = currentSchool ? currentSchool.id : null;
    const schoolName = currentSchool ? currentSchool.chineseName : '未知學校';
    
    // Check if already practiced
    if (isQuestionPracticed(questionText, schoolId, questionType)) {
        return; // Already practiced
    }
    
    // Add to history
    const practiceRecord = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        question: questionText,
        schoolId: schoolId,
        schoolName: schoolName,
        questionType: questionType,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('zh-Hant'),
        time: new Date().toLocaleTimeString('zh-Hant', { hour: '2-digit', minute: '2-digit' })
    };
    
    practiceHistory.push(practiceRecord);
    
    // Update button
    buttonElement.innerHTML = '<i class="fas fa-check-circle"></i> 已完成';
    buttonElement.className = 'try-btn practiced';
    buttonElement.disabled = true;
    
    // Save history
    savePracticeHistory();
    
    // Show notification
    showNotification('問題已標記為已完成！');
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Get random questions by type
function getQuestionsByType(questionType, count = 4) {
    if (!questionsData || !questionsData[questionType]) {
        return ["問題數據加載中..."];
    }
    
    const questions = [...questionsData[questionType]];
    const selected = [];
    
    const questionsToSelect = Math.min(count, questions.length);
    
    if (questionsToSelect < questions.length) {
        for (let i = 0; i < questionsToSelect; i++) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            selected.push(questions[randomIndex]);
            questions.splice(randomIndex, 1);
        }
    } else {
        selected.push(...questions);
    }
    
    return selected;
}

// Get school specific questions
function getSchoolSpecificQuestions(schoolChineseName) {
    if (!questionsData || !questionsData.schoolSpecific || !questionsData.schoolSpecific[schoolChineseName]) {
        return [`你為什麼選擇${schoolChineseName}？`];
    }
    
    const questions = [...questionsData.schoolSpecific[schoolChineseName]];
    return questions.slice(0, 4);
}

// Get icon for question type
function getIconForQuestionType(type) {
    const icons = {
        'chinese': 'fa-language',
        'english': 'fa-language',
        'math': 'fa-calculator',
        'current': 'fa-newspaper',
        'science': 'fa-flask',
        'creative': 'fa-lightbulb',
        'other': 'fa-question-circle'
    };
    
    return icons[type] || 'fa-question-circle';
}

// Get display name for question type
function getDisplayNameForQuestionType(type) {
    const names = {
        'chinese': '中文',
        'english': 'English',
        'math': '數學（心算）',
        'current': '時事',
        'science': '科學',
        'creative': '創意',
        'other': '其他'
    };
    
    return names[type] || type;
}

// Generate interview questions with practice buttons
function generateQuestions() {
    const selectedSchoolId = schoolSelect.value;
    const questionType = questionTypeSelect.value;
    const questionCount = parseInt(questionCountInput.value) || 4;
    
    if (!selectedSchoolId) {
        alert("請先選擇一所學校。");
        return;
    }
    
    if (questionCount < 1 || questionCount > 10) {
        alert("問題數量必須在1到10之間。");
        return;
    }
    
    if (!schoolsData) {
        alert("學校數據尚未加載完成，請稍候再試。");
        return;
    }
    
    const school = schoolsData.schools.find(s => s.id == selectedSchoolId);
    
    if (!school) {
        alert("未找到學校資料。");
        return;
    }
    
    // Store current school and question type
    currentSchool = school;
    currentQuestionType = questionType;
    
    loadingIndicator.style.display = 'block';
    questionsOutput.style.display = 'none';
    
    setTimeout(() => {
        noSchoolMessage.style.display = 'none';
        
        let html = `
            <div class="school-name-display">
                <div class="chinese-name">${school.chineseName}</div>
                <div class="english-name">${school.name}</div>
                <div class="practice-stats">
                    <span class="stat-item">
                        <i class="fas fa-history"></i>
                        <span id="totalPracticed">0</span> 題已練習
                    </span>
                    <span class="stat-item">
                        <i class="fas fa-calendar"></i>
                        ${new Date().toLocaleDateString('zh-Hant')}
                    </span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-school"></i>
                    <h3>學校詳情</h3>
                </div>
                <div class="school-details">
                    <div class="detail-item">
                        <div class="detail-label">學校類型</div>
                        <div class="detail-value">${school.type}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">宗教背景</div>
                        <div class="detail-value">${school.religion}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">性別</div>
                        <div class="detail-value">${school.gender}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">地區</div>
                        <div class="detail-value">${school.district}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">教學語言</div>
                        <div class="detail-value">${school.language}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">學校特色</div>
                        <div class="detail-value">${school.specialty}</div>
                    </div>
                </div>
            </div>
        `;
        
        if (questionType === 'all') {
            const questionTypes = ['chinese', 'english', 'math', 'current', 'science', 'creative', 'other'];
            
            questionTypes.forEach(type => {
                const questions = getQuestionsByType(type, Math.min(questionCount, 3));
                if (questions.length > 0) {
                    html += `
                        <div class="section">
                            <div class="section-title">
                                <i class="fas ${getIconForQuestionType(type)}"></i>
                                <h3>${getDisplayNameForQuestionType(type)}面試問題</h3>
                            </div>
                            <ul class="question-list">
                    `;
                    
                    questions.forEach(question => {
                        const isPracticed = isQuestionPracticed(question, school.id, type);
                        html += `
                            <li>
                                <span class="question-text">${question}</span>
                                <button class="try-btn ${isPracticed ? 'practiced' : ''}" 
                                        data-question="${question}" 
                                        data-type="${type}"
                                        ${isPracticed ? 'disabled' : ''}>
                                    <i class="fas ${isPracticed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                                    ${isPracticed ? '已完成' : '練習'}
                                </button>
                            </li>
                        `;
                    });
                    
                    html += `
                            </ul>
                        </div>
                    `;
                }
            });
        } else {
            const questions = getQuestionsByType(questionType, questionCount);
            
            if (questions.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">
                            <i class="fas ${getIconForQuestionType(questionType)}"></i>
                            <h3>${getDisplayNameForQuestionType(questionType)}面試問題</h3>
                        </div>
                        <ul class="question-list">
                `;
                
                questions.forEach(question => {
                    const isPracticed = isQuestionPracticed(question, school.id, questionType);
                    html += `
                        <li>
                            <span class="question-text">${question}</span>
                            <button class="try-btn ${isPracticed ? 'practiced' : ''}" 
                                    data-question="${question}" 
                                    data-type="${questionType}"
                                    ${isPracticed ? 'disabled' : ''}>
                                <i class="fas ${isPracticed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                                ${isPracticed ? '已完成' : '練習'}
                            </button>
                        </li>
                    `;
                });
                
                html += `
                        </ul>
                    </div>
                `;
            }
        }
        
        // School specific questions
        const schoolSpecificQuestions = getSchoolSpecificQuestions(school.chineseName);
        if (schoolSpecificQuestions.length > 0) {
            html += `
                <div class="section highlight">
                    <div class="section-title">
                        <i class="fas fa-star"></i>
                        <h3>學校特定問題</h3>
                    </div>
                    <ul class="question-list">
            `;
            
            schoolSpecificQuestions.forEach(question => {
                const isPracticed = isQuestionPracticed(question, school.id, 'schoolSpecific');
                html += `
                    <li>
                        <span class="question-text">${question}</span>
                        <button class="try-btn ${isPracticed ? 'practiced' : ''}" 
                                data-question="${question}" 
                                data-type="schoolSpecific"
                                ${isPracticed ? 'disabled' : ''}>
                            <i class="fas ${isPracticed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                            ${isPracticed ? '已完成' : '練習'}
                        </button>
                    </li>
                `;
            });
            
            html += `
                    </ul>
                </div>
            `;
        }
        
        // Add practice summary
        const schoolPracticedCount = practiceHistory.filter(record => record.schoolId === school.id).length;
        html += `
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-chart-line"></i>
                    <h3>練習統計</h3>
                </div>
                <div class="practice-summary">
                    <div class="summary-item">
                        <div class="summary-label">今日練習</div>
                        <div class="summary-value" id="todayCount">0</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">本校練習</div>
                        <div class="summary-value">${schoolPracticedCount}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">總練習數</div>
                        <div class="summary-value">${practiceHistory.length}</div>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="btn view-history-btn" id="showHistoryBtn">
                    <i class="fas fa-history"></i> 查看練習記錄
                </button>
                <button class="btn clear-history-btn" id="clearHistoryBtn">
                    <i class="fas fa-trash"></i> 清除記錄
                </button>
            </div>
        `;
        
        questionsOutput.innerHTML = html;
        questionsOutput.style.display = 'block';
        loadingIndicator.style.display = 'none';
        
        // Update today's count
        updateTodayCount();
        
        // Add event listeners to try buttons
        document.querySelectorAll('.try-btn:not(.practiced)').forEach(button => {
            button.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                const type = this.getAttribute('data-type');
                markQuestionAsPracticed(question, type, this);
                updatePracticeStats();
            });
        });
        
        // Add event listeners to action buttons
        document.getElementById('showHistoryBtn').addEventListener('click', showPracticeHistory);
        document.getElementById('clearHistoryBtn').addEventListener('click', clearPracticeHistory);
        
        questionsOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Update practice stats
function updatePracticeStats() {
    const totalPracticed = document.getElementById('totalPracticed');
    const todayCount = document.getElementById('todayCount');
    
    if (totalPracticed) {
        totalPracticed.textContent = practiceHistory.length;
    }
    
    updateTodayCount();
}

// Update today's count
function updateTodayCount() {
    const todayCount = document.getElementById('todayCount');
    if (todayCount) {
        const today = new Date().toLocaleDateString('zh-Hant');
        const todayRecords = practiceHistory.filter(record => record.date === today);
        todayCount.textContent = todayRecords.length;
    }
}

// Show practice history
function showPracticeHistory() {
    if (practiceHistory.length === 0) {
        showNotification('尚未有任何練習記錄', 'info');
        return;
    }
    
    let historyHtml = `
        <div class="history-modal">
            <div class="history-header">
                <h3><i class="fas fa-history"></i> 練習記錄</h3>
                <button class="close-history">&times;</button>
            </div>
            <div class="history-content">
                <div class="history-summary">
                    <div class="summary-card">
                        <i class="fas fa-list-ol"></i>
                        <div class="summary-text">總練習數</div>
                        <div class="summary-number">${practiceHistory.length}</div>
                    </div>
                    <div class="summary-card">
                        <i class="fas fa-school"></i>
                        <div class="summary-text">涉及學校</div>
                        <div class="summary-number">${new Set(practiceHistory.map(r => r.schoolName)).size}</div>
                    </div>
                    <div class="summary-card">
                        <i class="fas fa-calendar-day"></i>
                        <div class="summary-text">今日練習</div>
                        <div class="summary-number">${practiceHistory.filter(r => r.date === new Date().toLocaleDateString('zh-Hant')).length}</div>
                    </div>
                </div>
                
                <div class="history-list">
                    <h4>最近練習記錄</h4>
    `;
    
    // Sort by timestamp (newest first) and take last 20
    const recentHistory = [...practiceHistory]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 20);
    
    recentHistory.forEach(record => {
        historyHtml += `
            <div class="history-item">
                <div class="history-question">${record.question}</div>
                <div class="history-details">
                    <span class="history-school">${record.schoolName}</span>
                    <span class="history-type">${getDisplayNameForQuestionType(record.questionType) || '學校特定'}</span>
                    <span class="history-time">${record.date} ${record.time}</span>
                </div>
            </div>
        `;
    });
    
    historyHtml += `
                </div>
            </div>
        </div>
    `;
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-overlay';
    modalContainer.innerHTML = historyHtml;
    
    document.body.appendChild(modalContainer);
    
    // Add event listeners
    modalContainer.querySelector('.close-history').addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });
    
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            document.body.removeChild(modalContainer);
        }
    });
}

// Clear practice history
function clearPracticeHistory() {
    if (practiceHistory.length === 0) {
        showNotification('沒有可清除的記錄', 'info');
        return;
    }
    
    if (confirm('確定要清除所有練習記錄嗎？此操作無法復原。')) {
        practiceHistory = [];
        savePracticeHistory();
        showNotification('所有練習記錄已清除', 'success');
        
        // Update UI if questions are currently displayed
        if (currentSchool) {
            generateQuestions();
        }
    }
}

// Search schools
function searchSchools(query) {
    if (!schoolsData) return;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    const matchedSchools = schoolsData.schools.filter(school => 
        school.name.toLowerCase().includes(normalizedQuery) ||
        school.chineseName.toLowerCase().includes(normalizedQuery)
    );
    
    if (matchedSchools.length === 0) {
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "未找到相關學校";
        schoolSelect.appendChild(option);
        return;
    }
    
    matchedSchools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = `${school.chineseName} (${school.name})`;
        schoolSelect.appendChild(option);
    });
    
    if (matchedSchools.length === 1) {
        schoolSelect.value = matchedSchools[0].id;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Page loaded, initializing...');
    
    await Promise.all([
        loadSchoolsData(),
        loadQuestionsData(),
        loadPracticeHistory()
    ]);
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateQuestions);
    }
    
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            if (!schoolsData || schoolsData.schools.length === 0) {
                alert("學校數據尚未加載完成");
                return;
            }
            
            const randomIndex = Math.floor(Math.random() * schoolsData.schools.length);
            const randomSchool = schoolsData.schools[randomIndex];
            
            schoolSelect.value = randomSchool.id;
            
            const questionTypes = ['all', 'chinese', 'english', 'math', 'current', 'science', 'creative', 'other'];
            const randomTypeIndex = Math.floor(Math.random() * questionTypes.length);
            questionTypeSelect.value = questionTypes[randomTypeIndex];
            
            generateQuestions();
        });
    }
    
    if (schoolSearch) {
        schoolSearch.addEventListener('input', (e) => {
            searchSchools(e.target.value);
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && schoolSelect.value) {
            generateQuestions();
        }
    });
    
    console.log('Application initialized');
});