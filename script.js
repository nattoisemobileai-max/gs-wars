// DOM Elements
const schoolSelect = document.getElementById('schoolSelect');
const schoolSearch = document.getElementById('schoolSearch');
const generateBtn = document.getElementById('generateBtn');
const randomBtn = document.getElementById('randomBtn');
const questionsOutput = document.getElementById('questionsOutput');
const noSchoolMessage = document.getElementById('noSchoolMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const schoolCount = document.getElementById('schoolCount');

// 全局變量
let schoolsData = null;
let questionsData = null;

// 加載學校數據
async function loadSchoolsData() {
    try {
        const response = await fetch('schools.json');
        if (!response.ok) throw new Error('學校數據加載失敗');
        schoolsData = await response.json();
        console.log('學校數據加載成功');
        initializeSchoolDropdown();
    } catch (error) {
        console.error('加載學校數據時出錯:', error);
        // 使用硬編碼的學校數據作為備用
        schoolsData = {
            schools: [
                {
                    id: 1,
                    name: "Ying Wa College",
                    chineseName: "英華書院",
                    type: "資助",
                    religion: "基督教",
                    gender: "男校",
                    district: "深水埗區",
                    language: "英文",
                    specialty: "STEM、音樂、體育",
                    website: "www.yingwa.edu.hk",
                    phone: "2380-4331"
                },
                {
                    id: 2,
                    name: "St. Paul's Co-educational College",
                    chineseName: "聖保羅男女中學",
                    type: "資助",
                    religion: "基督教",
                    gender: "男女校",
                    district: "半山區",
                    language: "英文",
                    specialty: "學術卓越、領導才能",
                    website: "www.spcc.edu.hk",
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
                    website: "www.acsks.edu.hk",
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
                    website: "www.plktytc.edu.hk",
                    phone: "2461-9888"
                }
            ]
        };
        initializeSchoolDropdown();
    }
}

// 加載問題數據
async function loadQuestionsData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error('問題數據加載失敗');
        questionsData = await response.json();
        console.log('問題數據加載成功');
    } catch (error) {
        console.error('加載問題數據時出錯:', error);
        // 使用硬編碼的問題數據作為備用
        questionsData = {
            chinese: ["請用三分鐘介紹你自己。", "你為什麼選擇我們學校？"],
            english: ["Tell us about yourself.", "Why choose our school?"],
            math: ["What do you like about math?", "How do you use math?"],
            manner: ["How do you handle disagreements?", "Describe your leadership experience."],
            schoolSpecific: {
                "英華書院": ["你對英華書院了解多少？"],
                "聖保羅男女中學": ["為什麼選擇聖保羅？"],
                "宣道會陳瑞芝紀念中學": ["你對基督教教育有什麼看法？"],
                "保良局董玉娣中學": ["你對科技教育有什麼興趣？"]
            }
        };
    }
}

// 初始化學校下拉選單 - 修復版本
function initializeSchoolDropdown() {
    if (!schoolsData || !schoolsData.schools) {
        console.error('學校數據未加載');
        return;
    }
    
    // 清空現有選項
    schoolSelect.innerHTML = '<option value="">-- 請選擇學校 --</option>';
    
    // 添加學校選項
    schoolsData.schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = `${school.chineseName} (${school.name})`;
        schoolSelect.appendChild(option);
    });
    
    // 更新學校數量顯示
    if (schoolCount) {
        schoolCount.textContent = `共 ${schoolsData.schools.length} 所學校`;
    }
    
    console.log('學校下拉選單初始化完成');
}

// 獲取隨機問題
function getRandomQuestions(category, count = 4) {
    if (!questionsData || !questionsData[category]) {
        return ["問題數據加載中..."];
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
        return [`你為什麼選擇${schoolChineseName}？`];
    }
    
    return [...questionsData.schoolSpecific[schoolChineseName]];
}

// 生成面試題目
function generateQuestions() {
    const selectedSchoolId = schoolSelect.value;
    
    if (!selectedSchoolId) {
        alert("請先選擇一所學校。");
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
    
    // 顯示加載指示器
    loadingIndicator.style.display = 'block';
    questionsOutput.style.display = 'none';
    
    // 模擬加載
    setTimeout(() => {
        // 隱藏"無學校"信息
        noSchoolMessage.style.display = 'none';
        
        // 生成HTML
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
                        <div class="detail-value">${school.website}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">聯絡電話</div>
                        <div class="detail-value">${school.phone}</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-language"></i>
                    <h3>中文面試問題</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加中文問題
        const chineseQuestions = getRandomQuestions('chinese');
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
        
        // 添加英文問題
        const englishQuestions = getRandomQuestions('english');
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
        const mathQuestions = getRandomQuestions('math', 3);
        mathQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <i class="fas fa-users"></i>
                    <h3>品行與個人素質</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加品行問題
        const mannerQuestions = getRandomQuestions('manner');
        mannerQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
            
            <div class="section highlight">
                <div class="section-title">
                    <i class="fas fa-star"></i>
                    <h3>學校特定問題</h3>
                </div>
                <ul class="question-list">
        `;
        
        // 添加學校特定問題
        const schoolSpecificQuestions = getSchoolSpecificQuestions(school.chineseName);
        schoolSpecificQuestions.forEach(question => {
            html += `<li>${question}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
        
        // 更新顯示
        questionsOutput.innerHTML = html;
        questionsOutput.style.display = 'block';
        loadingIndicator.style.display = 'none';
        
        // 滾動到結果
        questionsOutput.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// 搜尋學校
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
}

// 事件監聽器
document.addEventListener('DOMContentLoaded', async () => {
    console.log('頁面加載完成，開始初始化...');
    
    // 加載數據
    await Promise.all([loadSchoolsData(), loadQuestionsData()]);
    
    // 設置事件監聽器
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
            generateQuestions();
        });
    }
    
    if (schoolSearch) {
        schoolSearch.addEventListener('input', (e) => {
            searchSchools(e.target.value);
        });
    }
    
    console.log('應用初始化完成');
});