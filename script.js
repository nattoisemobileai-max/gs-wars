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

// Global variables
let schoolsData = null;
let questionsData = null;

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
        // Use hardcoded school data as backup
        schoolsData = {
            schools: [
                {
                    id: 1,
                    name: "Ying Wa College",
                    chineseName: "英華書院",
                    type: "直資",
                    religion: "基督教",
                    gender: "男校",
                    district: "深水埗區",
                    language: "英文",
                    specialty: "STEM、音樂、體育",
                    website: "https://www.yingwa.edu.hk/",
                    phone: "2380-4331"
                },
                {
                    id: 2,
                    name: "St. Paul's Co-educational College",
                    chineseName: "聖保羅男女中學",
                    type: "直資",
                    religion: "基督教",
                    gender: "男女校",
                    district: "中西區",
                    language: "英文",
                    specialty: "學術卓越、領導才能",
                    website: "https://www.spcc.edu.hk/",
                    phone: "2523-1194"
                },
                {
                    id: 3,
                    name: "Alliance Church Chan Sui Ki College",
                    chineseName: "宣道會陳瑞芝紀念中學",
                    type: "資助",
                    religion: "基督教",
                    gender: "男女校",
                    district: "屯門區",
                    language: "中文",
                    specialty: "社區服務、藝術",
                    website: "http://www.acsks.edu.hk/",
                    phone: "2451-2033"
                },
                {
                    id: 4,
                    name: "Po Leung Kuk Tang Yuk Tien College",
                    chineseName: "保良局董玉娣中學",
                    type: "資助",
                    religion: "無",
                    gender: "男女校",
                    district: "屯門區",
                    language: "中文",
                    specialty: "科技、體育",
                    website: "http://www.plktytc.edu.hk/",
                    phone: "2461-9888"
                }
            ]
        };
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
        // Use hardcoded questions data as backup
        questionsData = {
            chinese: ["請用三分鐘介紹你自己。", "你為什麼選擇我們學校？"],
            english: ["Tell us about yourself.", "Why choose our school?"],
            math: ["What do you like about math?", "How do you use math?"],
            current: ["你對香港最近的社會議題有什麼看法？"],
            science: ["你對哪個科學領域最感興趣？為什麼？"],
            creative: ["如果你有一天的時間可以做任何事，你會做什麼？為什麼？"],
            other: ["你如何定義成功？"],
            schoolSpecific: {
                "英華書院": ["你對英華書院的歷史和傳統有多少了解？"],
                "聖保羅男女中學": ["為什麼選擇聖保羅？"],
                "宣道會陳瑞芝紀念中學": ["你對基督教教育有什麼看法？"],
                "保良局董玉娣中學": ["你對科技教育有什麼興趣？"]
            }
        };
    }
}

// Initialize school dropdown
function initializeSchoolDropdown() {
    if (!schoolsData || !schoolsData.schools) {
        console.error('School data not loaded');
        return;
    }
    
    // Clear existing options
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    // Add school options
    schoolsData.schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = `${school.chineseName} (${school.name})`;
        schoolSelect.appendChild(option);
    });
    
    // Update school count display
    if (schoolCount) {
        schoolCount.textContent = `共 ${schoolsData.schools.length} 所學校`;
    }
    
    console.log('School dropdown initialized');
}

// Get random questions by type
function getQuestionsByType(questionType, count = 4) {
    if (!questionsData || !questionsData[questionType]) {
        return ["問題數據加載中..."];
    }
    
    const questions = [...questionsData[questionType]];
    const selected = [];
    
    // If we have fewer questions than requested, adjust the count
    const questionsToSelect = Math.min(count, questions.length);
    
    // If we're requesting fewer questions than available, select randomly
    if (questionsToSelect < questions.length) {
        for (let i = 0; i < questionsToSelect; i++) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            selected.push(questions[randomIndex]);
            questions.splice(randomIndex, 1);
        }
    } else {
        // Otherwise, use all questions
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
    const selected = [];
    
    // Always select 4 school specific questions, or all if less than 4
    const questionsToSelect = Math.min(4, questions.length);
    
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

// Generate interview questions
function generateQuestions() {
    const selectedSchoolId = schoolSelect.value;
    const questionType = questionTypeSelect.value;
    const questionCount = parseInt(questionCountInput.value) || 4;
    
    // Validate input
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
    
    // Show loading indicator
    loadingIndicator.style.display = 'block';
    questionsOutput.style.display = 'none';
    
    // Simulate loading
    setTimeout(() => {
        // Hide "no school" message
        noSchoolMessage.style.display = 'none';
        
        // Generate HTML
        let html = `
            <div class="school-name-display">
                <div class="chinese-name">${school.chineseName}</div>
                <div class="english-name">${school.name}</div>
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
                    <div class="detail-item">
                        <div class="detail-label">學校網站</div>
                        <div class="detail-value"><a href="${school.website}" target="_blank">${school.website}</a></div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">聯絡電話</div>
                        <div class="detail-value">${school.phone}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Generate questions based on selected type
        if (questionType === 'all') {
            // Show all question types
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
                        html += `<li>${question}</li>`;
                    });
                    
                    html += `
                            </ul>
                        </div>
                    `;
                }
            });
        } else {
            // Show single question type
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
                    html += `<li>${question}</li>`;
                });
                
                html += `
                        </ul>
                    </div>
                `;
            }
        }
        
        // Add school specific questions
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
                html += `<li>${question}</li>`;
            });
            
            html += `
                    </ul>
                </div>
            `;
        }
        
        // Add interview tips section
        html += `
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-tips"></i>
                    <h3>面試準備建議</h3>
                </div>
                <ul class="question-list">
                    <li>提前了解學校的歷史、特色和成就</li>
                    <li>準備具體的例子來支持你的回答</li>
                    <li>練習用清晰、有條理的方式表達想法</li>
                    <li>準備好詢問面試官的問題</li>
                    <li>注意儀容整潔，表現自信和禮貌</li>
                    <li>準時到達，帶齊所需文件</li>
                </ul>
            </div>
        `;
        
        // Update display
        questionsOutput.innerHTML = html;
        questionsOutput.style.display = 'block';
        loadingIndicator.style.display = 'none';
        
        // Scroll to results
        questionsOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Search schools
function searchSchools(query) {
    if (!schoolsData) return;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    // Clear dropdown
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    // Filter schools
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
    
    // Add matched schools
    matchedSchools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = `${school.chineseName} (${school.name})`;
        schoolSelect.appendChild(option);
    });
    
    // Auto-select if only one match
    if (matchedSchools.length === 1) {
        schoolSelect.value = matchedSchools[0].id;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Page loaded, initializing...');
    
    // Load data
    await Promise.all([loadSchoolsData(), loadQuestionsData()]);
    
    // Set up event listeners
    if (generateBtn) {
        generateBtn.addEventListener('click', generateQuestions);
    }
    
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            if (!schoolsData || schoolsData.schools.length === 0) {
                alert("學校數據尚未加載完成");
                return;
            }
            
            // Select random school
            const randomIndex = Math.floor(Math.random() * schoolsData.schools.length);
            const randomSchool = schoolsData.schools[randomIndex];
            
            schoolSelect.value = randomSchool.id;
            
            // Select random question type
            const questionTypes = ['all', 'chinese', 'english', 'math', 'current', 'science', 'creative', 'other'];
            const randomTypeIndex = Math.floor(Math.random() * questionTypes.length);
            questionTypeSelect.value = questionTypes[randomTypeIndex];
            
            // Generate questions
            generateQuestions();
        });
    }
    
    if (schoolSearch) {
        schoolSearch.addEventListener('input', (e) => {
            searchSchools(e.target.value);
        });
    }
    
    // Add keyboard shortcut for Enter key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && schoolSelect.value) {
            generateQuestions();
        }
    });
    
    console.log('Application initialized');
});