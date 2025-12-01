// --- 遊戲數據結構 ---
// 為了保持程式碼整潔，我只列出每輪的前幾題和關鍵的小總結。
// 你可以將所有 Round 1-4 的題目（超過 40 題）按這個格式加入 QUIZ_DATA 陣列中。

const QUIZ_DATA = [
    // === Round 1: 戰爭是甚麼？ ===
    {
        round: 1,
        type: 'mc', // Multiple Choice
        question: 'Q1. 根據課文，戰爭是一種甚麼樣的方法？',
        options: ['和平溝通的方法', '以武力解決紛爭的方法', '體育競賽的方法'],
        answer: '以武力解決紛爭的方法',
        summary: '戰爭是一種以武力解決紛爭的方法。無論遇到任何糾紛，都不應該用武力解決。',
    },
    {
        round: 1,
        type: 'tf', // True/False (在 options 中用「正確/錯誤」表示)
        question: 'Q2. 無論遇到任何糾紛，我們都應該用武力來解決，這樣最快。',
        options: ['正確', '錯誤'],
        answer: '錯誤',
        summary: null,
    },
    {
        round: 1,
        type: 'mc',
        question: 'Q3. 下列哪一個詞語不適合用來形容戰爭？',
        options: ['殘酷', '幸福', '恐怖'],
        answer: '幸福',
        summary: null,
    },
    // *** 建議在此處加入更多 Round 1 題目 ***

    // === Round 2: 戰火為何燃起？ ===
    {
        round: 2,
        type: 'mc',
        question: 'Q4. 「別國對我國豐富的石油虎視眈眈。」這屬於哪一種戰爭起因？',
        options: ['宗教糾紛', '經濟利益', '領土紛爭'],
        answer: '經濟利益',
        summary: '領土紛爭、經濟利益、宗教糾紛等都是導致戰爭的主要原因。',
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q5. 第二次世界大戰發生的時間是？',
        options: ['1914 - 1918 年', '1939 - 1945 年', '2003 - 2011 年'],
        answer: '1939 - 1945 年',
        summary: null,
    },
    {
        round: 2,
        type: 'tf',
        question: 'Q6. 越南戰爭持續了多久？ (1955-1975)',
        options: ['約 4 年', '約 20 年'],
        answer: '約 20 年',
        summary: null,
    },
    // *** 建議在此處加入更多 Round 2 題目 ***

    // === Round 3: 戰爭帶來的傷痕 ===
    {
        round: 3,
        type: 'mc',
        question: 'Q7. 越南戰爭的「地雷」問題導致農地荒廢，這屬於戰爭的哪一種影響？',
        options: ['短期影響', '長期影響', '宗教影響'],
        answer: '長期影響',
        summary: '戰爭造成龐大的人命傷亡和破壞，並帶來深遠的影響。',
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q8. 數百萬無家可歸的敘利亞人被稱為甚麼？',
        options: ['移民', '旅客', '難民'],
        answer: '難民',
        summary: null,
    },
    {
        round: 3,
        type: 'tf',
        question: 'Q9. 戰爭只會造成士兵的傷亡，對普通市民的生活設施完全沒有影響。',
        options: ['正確', '錯誤'],
        answer: '錯誤',
        summary: null,
    },
    // *** 建議在此處加入更多 Round 3 題目 ***

    // === Round 4: 和平的守護者 ===
    {
        round: 4,
        type: 'mc',
        question: 'Q10. 哪個國際組織主要目標是「維護世界和平」及「調解各國紛爭」？',
        options: ['國際奧委會', '聯合國', '國際特赦組織'],
        answer: '聯合國',
        summary: '聯合國是維護世界和平的主力，它致力於調解紛爭和消除大殺傷力武器；而如無國界醫生等非政府組織則提供關鍵的人道援助。',
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q11. 哪個組織宗旨是提供醫療人道救援？',
        options: ['聯合國', '無國界醫生', '國際貿易組織'],
        answer: '無國界醫生',
        summary: null,
    },
    {
        round: 4,
        type: 'tf',
        question: 'Q12. 為了長遠維持世界和平，國際間需要彼此尊重，並且互諒互讓。',
        options: ['正確', '錯誤'],
        answer: '正確',
        summary: null,
    },
    // *** 建議在此處加入更多 Round 4 題目 ***
    
    // === Boss Round (R5) 終極挑戰 ===
    {
        round: 5,
        type: 'mc',
        question: 'Q13. 下列哪一項是解決國際紛爭的**最理想**方法？',
        options: ['以武力威嚇對方', '透過聯合國進行對話和衷誠合作', '搶奪對方的經濟資源'],
        answer: '透過聯合國進行對話和衷誠合作',
        summary: '恭喜！你完成了所有挑戰，成為地球村守衛者！\n你已掌握了戰爭的禍害及和平的重要性，記得在日常生活中實踐互相尊重，互諒互讓的精神！',
    },

];


// --- 遊戲狀態管理 ---
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = QUIZ_DATA.length;
let selectedOption = null;
let gameActive = false;

// --- DOM 元素 ---
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');
const questionDisplay = document.getElementById('question-display');
const optionsContainer = document.getElementById('options-container');
const checkButton = document.getElementById('check-button');
const progressBar = document.getElementById('progress-bar');
const appContainer = document.getElementById('app-container');

// --- 遊戲初始化與啟動 ---

// 讓用戶可以從 welcome-screen 點擊開始
if (welcomeScreen) {
    welcomeScreen.innerHTML = `
        <span class="smart-boy-char">👨‍🎓</span>
        <h1>歡迎 Smart Boy！</h1>
        <p>準備好接受「戰爭與和平」的挑戰，守護地球村了嗎？</p>
        <p>我們有 ${totalQuestions} 題等著你！</p>
        <button id="start-button" onclick="startApp()">開始挑戰</button>
        <button onclick="showLeaderboard()" style="background-color: #1cb0f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; margin-top: 10px;">查看排名榜</button>
    `;
    document.getElementById('start-button').addEventListener('click', startApp);
}


function startApp() {
    gameActive = true;
    score = 0;
    currentQuestionIndex = 0;
    
    // 隱藏所有畫面，顯示遊戲畫面
    welcomeScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    loadQuestion();
}

// --- 題目加載與顯示 ---
function loadQuestion() {
    // 檢查是否所有問題都已完成
    if (currentQuestionIndex >= totalQuestions) {
        endGame();
        return;
    }

    const currentQ = QUIZ_DATA[currentQuestionIndex];

    // 如果這是一輪的開始（或小結）
    if (currentQuestionIndex === 0 || QUIZ_DATA[currentQuestionIndex - 1].round !== currentQ.round) {
        showRoundStart(currentQ.round);
        return;
    }


    // 正常顯示題目
    questionDisplay.innerHTML = `Round ${currentQ.round}: ${currentQ.question}`;
    optionsContainer.innerHTML = '';
    
    // 重設按鈕狀態
    checkButton.textContent = '檢查答案';
    checkButton.disabled = true;
    checkButton.classList.remove('next');
    selectedOption = null;


    // 顯示選項
    currentQ.options.forEach(optionText => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = optionText;
        optionDiv.addEventListener('click', () => selectAnswer(optionDiv, optionText));
        optionsContainer.appendChild(optionDiv);
    });

    updateProgressBar();
}

function selectAnswer(element, answerText) {
    if (!gameActive) return;

    // 清除所有選項的 selected 狀態
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        // 如果已經檢查過答案，則不允許再次選擇
        if (element.classList.contains('correct') || element.classList.contains('incorrect')) return;
    });

    // 設定選中的選項
    element.classList.add('selected');
    selectedOption = answerText;
    checkButton.disabled = false;
}


// --- 答題邏輯 ---
checkButton.addEventListener('click', () => {
    if (checkButton.classList.contains('next')) {
        nextQuestion();
    } else {
        checkAnswer();
    }
});

function checkAnswer() {
    if (selectedOption === null || !gameActive) return;

    gameActive = false; // 暫停遊戲，直到點擊「下一題」

    const currentQ = QUIZ_DATA[currentQuestionIndex];
    const isCorrect = (selectedOption === currentQ.answer);

    document.querySelectorAll('.option').forEach(opt => {
        // 鎖定所有選項，移除點擊事件
        opt.style.pointerEvents = 'none'; 

        if (opt.textContent === currentQ.answer) {
            // 正確答案標記為綠色
            opt.classList.add('correct');
        } else if (opt.classList.contains('selected')) {
            // 錯誤答案標記為紅色
            opt.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    // 準備跳到下一題
    checkButton.textContent = '下一題 >>';
    checkButton.classList.add('next');
    checkButton.disabled = false;
}

function showFeedback(isCorrect) {
    // 這裡可以增加 Duolingo 式的 feedback 訊息，例如一個小彈窗
    const message = isCorrect ? '✅ 太棒了！ Smart Boy 又答對一題！' : '❌ 不對喔，請再複習一下！';
    
    // 為了簡化，我們先在按鈕下方顯示簡單訊息
    questionDisplay.innerHTML += `<p style="margin-top: 15px; color: ${isCorrect ? '#58cc02' : '#ff4747'};">${message}</p>`;
}

function nextQuestion() {
    gameActive = true;
    currentQuestionIndex++;

    // 檢查是否需要顯示 Round Summary
    if (currentQuestionIndex < totalQuestions && QUIZ_DATA[currentQuestionIndex - 1].summary) {
        showRoundSummary(QUIZ_DATA[currentQuestionIndex - 1].summary, QUIZ_DATA[currentQuestionIndex].round);
    } else {
        loadQuestion();
    }
}

// --- Round 小總結 ---
function showRoundSummary(summaryText, nextRound) {
    gameScreen.classList.add('hidden');
    
    const summaryDiv = document.createElement('section');
    summaryDiv.className = 'summary-content';
    summaryDiv.innerHTML = `
        <span class="smart-boy-char">💡</span>
        <h2>Round ${nextRound - 1} 小總結</h2>
        <p style="white-space: pre-wrap; text-align: left; background: #e6f7ff; padding: 15px; border-radius: 8px;">${summaryText}</p>
        <p style="font-weight: bold; color: #1cb0f6;">準備進入 Round ${nextRound} 挑戰！</p>
        <button id="continue-button" style="background-color: #58cc02; color: white; border: none; padding: 15px 30px; border-radius: 12px; font-size: 18px; margin-top: 20px;">繼續挑戰</button>
    `;
    appContainer.appendChild(summaryDiv);

    document.getElementById('continue-button').addEventListener('click', () => {
        appContainer.removeChild(summaryDiv);
        gameScreen.classList.remove('hidden');
        loadQuestion();
    });

    updateProgressBar();
}

// --- 進度條更新 ---
function updateProgressBar() {
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.setProperty('--progress-width', progress + '%');
    
    // 設置 CSS 變數來控制 ::before 元素的寬度
    const style = document.createElement('style');
    style.innerHTML = `#progress-bar::before { width: ${progress}%; }`;
    document.head.appendChild(style);
}

// --- 遊戲結束與排名榜 ---
function endGame() {
    gameActive = false;
    gameScreen.classList.add('hidden');
    
    // 紀錄成績
    const finalScore = score;
    const today = new Date().toLocaleDateString('zh-HK');
    const newRecord = {
        name: 'Smart Boy', // 固定用戶名稱
        score: finalScore,
        date: today
    };

    saveRecord(newRecord);
    showLeaderboard(finalScore);
}

function saveRecord(record) {
    let records = JSON.parse(localStorage.getItem('duolingoLeaderboard')) || [];
    records.push(record);
    // 只保留最好的 10 個成績
    records.sort((a, b) => b.score - a.score);
    localStorage.setItem('duolingoLeaderboard', JSON.stringify(records.slice(0, 10)));
}

function showLeaderboard(latestScore = null) {
    gameScreen.classList.add('hidden');
    welcomeScreen.classList.add('hidden');
    leaderboardScreen.classList.remove('hidden');

    let records = JSON.parse(localStorage.getItem('duolingoLeaderboard')) || [];
    records.sort((a, b) => b.score - a.score);

    let tableHTML = `
        <span class="smart-boy-char">🏆</span>
        <h2>全球守護者排名榜</h2>
        ${latestScore !== null ? `<p style="color: #58cc02; font-weight: bold;">你的最新成績：${latestScore} / ${totalQuestions}</p>` : ''}
        <table id="leaderboard-table">
            <thead>
                <tr>
                    <th>排名</th>
                    <th>用戶名</th>
                    <th>得分</th>
                    <th>日期</th>
                </tr>
            </thead>
            <tbody>
    `;

    records.forEach((record, index) => {
        tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${record.name}</td>
                <td>${record.score} / ${totalQuestions}</td>
                <td>${record.date}</td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;
    leaderboardScreen.innerHTML = tableHTML;
    
    // 返回主頁按鈕
    const backButton = document.createElement('button');
    backButton.textContent = '返回主頁 / 再玩一次';
    backButton.style.cssText = 'background-color: #1cb0f6; color: white; border: none; padding: 15px 30px; border-radius: 12px; font-size: 18px; margin-top: 20px;';
    backButton.addEventListener('click', () => {
        window.location.reload(); // 最簡單的返回主頁方法
    });
    leaderboardScreen.appendChild(backButton);
}

// 初始化時綁定排名榜按鈕
document.addEventListener('DOMContentLoaded', () => {
    // 確保 startApp() 可以在 index.html 中被調用
    window.startApp = startApp;
    window.showLeaderboard = showLeaderboard;
});

// --- 遊戲狀態管理 ---
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = QUIZ_DATA.length;
let selectedOption = null;
let gameActive = false;
let userName = 'Smart Boy'; // ***新增：設定預設名稱*** // ... (其他 DOM 元素定義)

// --- 遊戲初始化與啟動 ---
function startApp() {
    // ***修改：讀取輸入欄位的值***
    const nameInput = document.getElementById('user-name-input').value.trim();
    if (nameInput) {
        userName = nameInput; // 如果用戶輸入了名字，就更新它
    }
    
    gameActive = true;
    score = 0;
    currentQuestionIndex = 0;
    
    // 隱藏所有畫面，顯示遊戲畫面
    welcomeScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    loadQuestion();
    // --------------------
}

// *** 同時修改 endGame() 函式，將 userName 寫入紀錄 ***
function endGame() {
    gameActive = false;
    gameScreen.classList.add('hidden');
    
    // 紀錄成績
    const finalScore = score;
    const today = new Date().toLocaleDateString('zh-HK');
    const newRecord = {
        name: userName, // ***使用儲存的 userName***
        score: finalScore,
        date: today
    };

    saveRecord(newRecord);
    showLeaderboard(finalScore);
}
