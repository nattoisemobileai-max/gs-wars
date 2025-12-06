// DOM Elements
const schoolSelect = document.getElementById('schoolSelect');
const schoolSearch = document.getElementById('schoolSearch');
const generateBtn = document.getElementById('generateBtn');
const randomBtn = document.getElementById('randomBtn');
const questionsOutput = document.getElementById('questionsOutput');
const noSchoolMessage = document.getElementById('noSchoolMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const schoolCount = document.getElementById('schoolCount');
const totalSchoolCount = document.getElementById('totalSchoolCount');

// 全局變量
let schoolsData = null;
let questionsData = null;

// 從外部JSON文件加載學校數據
async function loadSchoolsData() {
    try {
        const response = await fetch('schools.json');
        if (!response.ok) {
            throw new Error(`HTTP錯誤! 狀態碼: ${response.status}`);
        }
        schoolsData = await response.json();
        console.log('學校數據加載成功:', schoolsData.schools.length + ' 所學校');
        
        // 初始化學校下拉選單
        initializeSchoolDropdown();
        
        // 更新學校數量顯示
        schoolCount.textContent = `共 ${schoolsData.schools.length} 所學校`;
        totalSchoolCount.textContent = schoolsData.schools.length;
        
    } catch (error) {
        console.error('加載學校數據時出錯:', error);
        // 顯示錯誤信息
        schoolCount.textContent = '加載學校數據失敗，請刷新頁面重試';
        schoolCount.style.color = '#c33';
        
        // 使用備用數據
        schoolsData = {
            schools: [
                {
                    "id": 1,
                    "name": "Ying Wa College",
                    "chineseName": "英華書院",
                    "type": "資助",
                    "religion": "基督教",
                    "gender": "男校",
                    "district": "深水埗區",
                    "language": "英文",
                    "specialty": "STEM、音樂、體育",
                    "website": "www.yingwa.edu.hk",
                    "phone": "2380-4331"
                },
                {
                    "id": 2,
                    "name": "St. Paul's Co-educational College",
                    "chineseName": "聖保羅男女中學",
                    "type": "資助",
                    "religion": "基督教",
                    "gender": "男女校",
                    "district": "半山區",
                    "language": "英文",
                    "specialty": "學術卓越、領導才能",
                    "website": "www.spcc.edu.hk",
                    "phone": "2523-1194"
                }
            ]
        };
        
        initializeSchoolDropdown();
        schoolCount.textContent = `使用備用數據（${schoolsData.schools.length} 所學校）`;
    }
}

// 從外部JSON文件加載問題數據
async function loadQuestionsData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP錯誤! 狀態碼: ${response.status}`);
        }
        questionsData = await response.json();
        console.log('問題數據加載成功');
        
    } catch (error) {
        console.error('加載問題數據時出錯:', error);
        
        // 使用備用問題數據
        questionsData = {
            "chinese": ["請用三分鐘介紹你自己。", "你為什麼選擇我們學校？"],
            "english": ["Tell us about yourself in three minutes.", "Why do you want to study at our school?"],
            "math": ["What do you find most interesting about mathematics?", "How do you apply mathematics in your daily life?"],
            "manner": ["How would you handle a disagreement with a classmate?", "Describe a time when you showed leadership."],
            "schoolSpecific": {
                "英華書院": ["你對英華書院的歷史和傳統有多少了解？"],
                "聖保羅男女中學": ["聖保羅男女中學以學術卓越著稱，你如何應對學術挑戰？"]
            }
        };
    }
}

// 初始化學校下拉選單
function initializeSchoolDropdown() {
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    schoolsData.schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = school.chineseName;
        
        // 添加英文名稱顯示
        const englishSpan = document.createElement('span');
        englishSpan.className = 'option-chinese';
        englishSpan.textContent = ` (${school.name})`;
        option.appendChild(englishSpan);
        
        schoolSelect.appendChild(option);
    });
}

// 從類別中獲取隨機問題
function getRandomQuestions(category, count = 3) {
    if (!questionsData || !questionsData[category]) {
        return ["問題數據正在加載中..."];
    }
    
    const questions = [...questionsData[category]];
    const selected = [];
    
    for (let i = 0; i < count && questions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        selected.push(questions[randomIndex]);
        questions.splice(randomIndex, 1);
    }
    
    return selected;
}

// 獲取學校特定問題
function getSchoolSpecificQuestions(schoolChineseName) {
    if (!questionsData || !questionsData.schoolSpecific || !questionsData.schoolSpecific[schoolChineseName]) {
        return [`你為什麼認為自己適合就讀${schoolChineseName}？`, `你對${schoolChineseName}有什麼期望？`];
    }
    
    const questions = [...questionsData.schoolSpecific[schoolChineseName]];
    const selected = [];
    const count = 4; // 選擇4個學校特定問題
    
    for (let i = 0; i < count && questions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        selected.push(questions[randomIndex]);
        questions.splice(randomIndex, 1);
    }
    
    return selected;
}

// 生成面試題目
function generateQuestions(schoolId) {
    // 檢查數據是否已加載
    if (!schoolsData) {
        alert("學校數據尚未加載完成，請稍候再試。");
        return;
    }
    
    // 顯示加載指示器
    loadingIndicator.style.display = 'block';
    questionsOutput.style.display = 'none';
    
    // 模擬加載時間
    setTimeout(() => {
        const school = schoolsData.schools.find(s => s.id == schoolId);
        
        if (!school) {
            alert("未找到學校。請選擇有效的學校。");
            loadingIndicator.style.display = 'none';
            return;
        }
        
        // 隱藏"無學校"信息
        noSchoolMessage.style.display = 'none';
        
        // 生成問題HTML
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
                        <div class="detail-label">創校年份</div>
                        <div class="detail-value">${school.established || '資料未提供'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">學生人數</div>
                        <div class="detail-value">${school.studentCount || '資料未提供'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">學校網站</div>
                        <div class="detail-value">${school.website}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">聯絡電話</div>
                        <div class="detail-value">${school.phone}</div>
                    </div>
                </div>
                ${school.mission ? `<p style="margin-top: 15px; font-style: italic; color: #555;">${school.mission}</p>` : ''}
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-language"></i>
                    <h3>中文面試問題</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加中文問題（根據學校教學語言調整數量）
        const chineseCount = school.language === '中文' ? 5 : 4;
        const chineseQuestions = getRandomQuestions('chinese', chineseCount);
        chineseQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-language"></i>
                    <h3>英文面試問題</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加英文問題（根據學校教學語言調整數量）
        const englishCount = school.language === '英文' ? 5 : 4;
        const englishQuestions = getRandomQuestions('english', englishCount);
        englishQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-calculator"></i>
                    <h3>數學面試問題</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加數學問題
        const mathQuestions = getRandomQuestions('math', 4);
        mathQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-users"></i>
                    <h3>品行與個人素質問題</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加品行問題
        const mannerQuestions = getRandomQuestions('manner', 4);
        mannerQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
            <div class="section highlight">
                <div class="section-title">
                    <i class="fas fa-lightbulb"></i>
                    <h3>學校特定問題</h3>
                </div>
                <p>針對 ${school.chineseName} 的特色，準備以下問題：</p>
                <ul class="question-list">
        `;
        
        // 添加學校特定問題
        const specialtyQuestions = getSchoolSpecificQuestions(school.chineseName);
        specialtyQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
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
        
        // 更新DOM
        questionsOutput.innerHTML = html;
        questionsOutput.style.display = 'block';
        loadingIndicator.style.display = 'none';
        
        // 滾動到結果區域
        questionsOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800); // 模擬加載延遲
}

// 搜尋學校
function searchSchools(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    // 清空當前選項
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    // 篩選並添加匹配的學校
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
        option.textContent = school.chineseName;
        
        // 添加英文名稱顯示
        const englishSpan = document.createElement('span');
        englishSpan.className = 'option-chinese';
        englishSpan.textContent = ` (${school.name})`;
        option.appendChild(englishSpan);
        
        schoolSelect.appendChild(option);
    });
    
    // 如果只有一個匹配項，自動選擇
    if (matchedSchools.length === 1) {
        schoolSelect.value = matchedSchools[0].id;
    }
}

// 事件監聽器
generateBtn.addEventListener('click', () => {
    const selectedSchoolId = schoolSelect.value;
    
    if (!selectedSchoolId) {
        alert("請先選擇一所學校。");
        return;
    }
    
    generateQuestions(selectedSchoolId);
});

randomBtn.addEventListener('click', () => {
    if (!schoolsData || schoolsData.schools.length === 0) {
        alert("學校數據尚未加載完成，請稍候再試。");
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * schoolsData.schools.length);
    const randomSchool = schoolsData.schools[randomIndex];
    
    schoolSelect.value = randomSchool.id;
    generateQuestions(randomSchool.id);
});

schoolSearch.addEventListener('input', (e) => {
    if (!schoolsData) return;
    searchSchools(e.target.value);
});

// 頁面加載時初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 同時加載學校數據和問題數據
    await Promise.all([loadSchoolsData(), loadQuestionsData()]);
    
    // 加載後隨機選擇一個學校
    setTimeout(() => {
        if (schoolsData && schoolsData.schools.length > 0) {
            const randomIndex = Math.floor(Math.random() * schoolsData.schools.length);
            schoolSelect.value = schoolsData.schools[randomIndex].id;
            generateQuestions(schoolsData.schools[randomIndex].id);
        }
    }, 500);
});