// --- 遊戲數據結構：戰爭與和平 (第6冊 第4課) ---
const QUIZ_DATA = [
    // === Round 1: 戰爭是甚麼？ (10 題) ===
    {
        round: 1,
        type: 'mc', // Multiple Choice
        question: 'Q1. 根據課文，戰爭是一種甚麼樣的方法？',
        options: ['和平溝通的方法', '以武力解決紛爭的方法', '體育競賽的方法'],
        answer: '以武力解決紛爭的方法',
        summary: null,
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
        question: 'Q3. 看看課本第 31 頁的圖片，士兵們正在使用甚麼武器？',
        options: ['水槍', '鮮花', '大炮'],
        answer: '大炮',
        summary: null,
    },
    {
        round: 1,
        type: 'mc',
        question: 'Q4. 戰爭會讓人感到甚麼情緒？',
        options: ['興奮', '快樂', '害怕'],
        answer: '害怕',
        summary: null,
    },
    {
        round: 1,
        type: 'mc',
        question: 'Q5. 本單元主題「住在地球村」提示我們應該怎樣與世界各地的人相處？',
        options: ['互相攻擊', '和平共處', '互不理睬'],
        answer: '和平共處',
        summary: null,
    },
    {
        round: 1,
        type: 'tf',
        question: 'Q6. 戰爭通常是因為人們意見不同，卻選擇用武力來解決。',
        options: ['正確', '錯誤'],
        answer: '正確',
        summary: null,
    },
    {
        round: 1,
        type: 'mc',
        question: 'Q7. 戰爭圖片中的環境通常看起來是怎樣的？',
        options: ['荒涼且危險', '熱鬧且充滿節日氣氛', '整潔且安全'],
        answer: '荒涼且危險',
        summary: null,
    },
    {
        round: 1,
        type: 'mc',
        question: 'Q8. 下列哪一個詞語**不適合**用來形容戰爭帶來的感覺？',
        options: ['殘酷', '危險', '無助'],
        answer: '殘酷', // 這是個陷阱題，殘酷適合，但三個選項中殘酷最貼切，讓學生重新思考
        // 修正為：
        question: 'Q8. 下列哪一個詞語**不適合**用來形容戰爭帶來的感覺？',
        options: ['殘酷', '溫暖', '無助'],
        answer: '溫暖',
        summary: null,
    },
    {
        round: 1,
        type: 'tf',
        question: 'Q9. 戰爭是一種以非武力手段解決紛爭的行為。',
        options: ['正確', '錯誤'],
        answer: '錯誤',
        summary: null,
    },
    {
        round: 1,
        type: 'tf',
        question: 'Q10. 只有大人需要關心戰爭，小學生不需要了解。',
        options: ['正確', '錯誤'],
        answer: '錯誤',
        summary: '恭喜完成 Round 1！小總結：戰爭是一種以武力解決紛爭的方法。無論遇到任何糾紛，都不應該用武力解決。',
    },

    // === Round 2: 戰火為何燃起？ (10 題) ===
    {
        round: 2,
        type: 'mc',
        question: 'Q11. 「別國對我國豐富的石油虎視眈眈。」這屬於哪一種戰爭起因？',
        options: ['宗教糾紛', '經濟利益', '領土紛爭'],
        answer: '經濟利益',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q12. 「你我信仰不同，你們必須離開！」這是因為甚麼原因而發生衝突？',
        options: ['爭奪土地', '擴張勢力', '宗教糾紛'],
        answer: '宗教糾紛',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q13. 第一次世界大戰發生在哪個年份區間？',
        options: ['1914 - 1918 年', '1939 - 1945 年', '2003 - 2011 年'],
        answer: '1914 - 1918 年',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q14. 爭奪領土是為了甚麼？',
        options: ['領土紛爭', '經濟利益', '宗教糾紛'],
        answer: '領土紛爭',
        summary: null,
    },
    {
        round: 2,
        type: 'tf',
        question: 'Q15. 第二次世界大戰發生在 1939-1945 年。',
        options: ['正確', '錯誤'],
        answer: '正確',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q16. 南北韓戰爭發生在甚麼時候？',
        options: ['1950 - 1953 年', '1955 - 1975 年', '1980 - 1988 年'],
        answer: '1950 - 1953 年',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q17. 課本中提到的戰爭裡，哪一場發生的時間**最近**？',
        options: ['第一次世界大戰', '南北韓戰爭', '伊拉克戰爭'],
        answer: '伊拉克戰爭',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q18. 戰爭起因中的「擴張勢力」是指什麼？',
        options: ['擴大交友圈', '佔領其他國家', '發展經濟'],
        answer: '佔領其他國家',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q19. 兩伊戰爭是發生在哪兩個國家之間？',
        options: ['中國與日本', '越南與美國', '伊朗與伊拉克'],
        answer: '伊朗與伊拉克',
        summary: null,
    },
    {
        round: 2,
        type: 'mc',
        question: 'Q20. 越南戰爭大約持續了多久？',
        options: ['4 年', '8 年', '20 年'],
        answer: '20 年',
        summary: '恭喜完成 Round 2！小總結：領土紛爭、經濟利益、宗教糾紛、擴張勢力等都是導致戰爭的主要原因。',
    },

    // === Round 3: 戰爭帶來的傷痕 (10 題) ===
    {
        round: 3,
        type: 'mc',
        question: 'Q21. 伊拉克戰爭造成人命傷亡外，還破壞了供水和電力等甚麼設施？',
        options: ['高級設施', '基礎設施', '娛樂設施'],
        answer: '基礎設施',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q22. 越南戰爭的「地雷」問題導致農地荒廢，這屬於戰爭的哪一種影響？',
        options: ['短期影響', '長期影響', '宗教影響'],
        answer: '長期影響',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q23. 戰爭中的炮火會破壞甚麼珍貴的歷史文化遺產？',
        options: ['學校的書本', '歷史古蹟和文物', '士兵的制服'],
        answer: '歷史古蹟和文物',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q24. 敘利亞內戰造成大規模流亡潮，這些人被稱為？',
        options: ['移民', '旅客', '難民'],
        answer: '難民',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q25. 難民因為親人失散，會承受巨大的哪種創傷？',
        options: ['身體創傷', '心靈創傷', '經濟創傷'],
        answer: '心靈創傷',
        summary: null,
    },
    {
        round: 3,
        type: 'tf',
        question: 'Q26. 戰爭只會造成士兵的傷亡，對普通市民的房屋沒有影響。',
        options: ['正確', '錯誤'],
        answer: '錯誤',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q27. 越南農夫不敢在土地上耕種的主要原因是？',
        options: ['政府禁止', '害怕地雷爆炸', '泥土太肥沃'],
        answer: '害怕地雷爆炸',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q28. 戰爭會導致自然環境被破壞，其中一個例子是？',
        options: ['大量農地荒廢', '樹木被種植', '空氣變清新'],
        answer: '大量農地荒廢',
        summary: null,
    },
    {
        round: 3,
        type: 'tf',
        question: 'Q29. 難民流亡潮發生時，他們面對的最大問題通常是親人失散和心靈創傷。',
        options: ['正確', '錯誤'],
        answer: '正確',
        summary: null,
    },
    {
        round: 3,
        type: 'mc',
        question: 'Q30. 戰爭的哪一種影響會持續數十年，甚至上百年？',
        options: ['設施破壞', '地雷和未爆彈', '士兵疲勞'],
        answer: '地雷和未爆彈',
        summary: '恭喜完成 Round 3！小總結：戰爭造成龐大的人命傷亡，並破壞基礎設施、歷史古蹟和自然環境，且帶來大規模難民潮和難以磨滅的心靈創傷。',
    },

    // === Round 4: 和平的守護者 (11 題) ===
    {
        round: 4,
        type: 'mc',
        question: 'Q31. 哪個國際組織的主要目標是「維護世界和平」及「調解各國紛爭」？',
        options: ['國際奧委會', '聯合國', '無國界醫生'],
        answer: '聯合國',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q32. 聯合國其中一項重要工作是消除甚麼武器，以避免造成大規模傷亡？',
        options: ['運動武器', '儀式武器', '大殺傷力武器'],
        answer: '大殺傷力武器',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q33. 哪個國際組織的宗旨是向受戰火或災難影響的人提供**醫療**人道救援？',
        options: ['世界衛生組織', '無國界醫生', '國際貿易組織'],
        answer: '無國界醫生',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q34. 無國界醫生曾獲頒哪個國際獎項？',
        options: ['諾貝爾科學獎', '諾貝爾和平獎', '奧斯卡金像獎'],
        answer: '諾貝爾和平獎',
        summary: null,
    },
    {
        round: 4,
        type: 'tf',
        question: 'Q35. 聯合國設有專門的機構（難民署 UNHCR）來處理難民援助工作。',
        options: ['正確', '錯誤'],
        answer: '正確',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q36. 為了維持和平，各國之間最理想的相處方式是？',
        options: ['互不干涉', '彼此衷誠合作', '互相比較軍備'],
        answer: '彼此衷誠合作',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q37. 要維護世界和平，國際間需要彼此 \_\_\_\_\_\_ 和互諒互讓。',
        options: ['對抗', '尊重', '競爭'],
        answer: '尊重',
        summary: null,
    },
    {
        round: 4,
        type: 'tf',
        question: 'Q38. 無國界醫生在戰爭地區提供救援時，會只幫助特定政治立場的傷者。',
        options: ['正確', '錯誤'],
        answer: '錯誤',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q39. 聯合國通過監察武裝組織的活動，是希望達成什麼目標？',
        options: ['鼓勵發展軍備', '確保世界局勢穩定和平', '讓他們互相開戰'],
        answer: '確保世界局勢穩定和平',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q40. 「互諒互讓」對於避免戰爭有什麼重要性？',
        options: ['堅持己見', '尋求雙方都滿意的方案', '訴諸武力'],
        answer: '尋求雙方都滿意的方案',
        summary: null,
    },
    {
        round: 4,
        type: 'mc',
        question: 'Q41. 聯合國難民署（UNHCR）的主要職責是？',
        options: ['提供醫療服務', '調解貿易糾紛', '保障難民權益和人道援助'],
        answer: '保障難民權益和人道援助',
        summary: '恭喜完成 Round 4！小總結：聯合國是維護世界和平的主力，它致力於調解紛爭和消除大殺傷力武器；而如無國界醫生等非政府組織則提供關鍵的人道援助。維護和平最終需要國際間的衷誠合作、彼此尊重與互諒互讓。',
    },

    // === Round 5: Boss Round (終極挑戰) (3 題) ===
    {
        round: 5,
        type: 'mc',
        question: 'Q42. [終極考驗] 下列哪一項是解決國際紛爭的**最理想**方法？',
        options: ['以武力威嚇對方', '透過聯合國進行對話和衷誠合作', '搶奪對方的經濟資源'],
        answer: '透過聯合國進行對話和衷誠合作',
        summary: null,
    },
    {
        round: 5,
        type: 'mc',
        question: 'Q43. [終極考驗] 為了長遠維持世界和平，國際間需要彼此尊重，並且互諒 \_\_\_\_\_\_？',
        options: ['爭', '讓', '鬥'],
        answer: '讓',
        summary: null,
    },
    {
        round: 5,
        type: 'mc',
        question: 'Q44. [終極考驗] 總結本課，人類應該透過什麼方式來解決彼此間的衝突？',
        options: ['訴諸武力', '和平對話', '互不理會'],
        answer: '和平對話',
        summary: '🏆 恭喜你，Smart Boy！你已經完成了所有挑戰，成為地球村守衛者！你已掌握了戰爭的禍害及和平的重要性，記得在日常生活中實踐互相尊重，互諒互讓的精神！',
    },

];


// --- 遊戲狀態管理 ---
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = QUIZ_DATA.length;
let selectedOption = null;
let gameActive = false;
let userName = 'Smart Boy'; // 設定預設名稱

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
        <p>請輸入你的名字：</p>
        <input type="text" id="user-name-input" placeholder="例如：Max" style="padding: 10px; font-size: 16px; border-radius: 8px; border: 1px solid #ccc; margin-bottom: 15px;">
        <p>準備好接受「戰爭與和平」的挑戰，守護地球村了嗎？</p>
        <p>我們有 ${totalQuestions} 題等著你！</p>
        <button id="start-button" onclick="startApp()">開始挑戰</button>
        <button onclick="showLeaderboard()" style="background-color: #1cb0f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; margin-top: 10px;">查看排名榜</button>
    `;
    document.getElementById('start-button').addEventListener('click', startApp);
}


function startApp() {
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
}

// --- 題目加載與顯示 ---
function loadQuestion() {
    // 檢查是否所有問題都已完成
    if (currentQuestionIndex >= totalQuestions) {
        endGame();
        return;
    }

    const currentQ = QUIZ_DATA[currentQuestionIndex];

    // 如果這是新一輪的開始
    if (currentQuestionIndex === 0 || QUIZ_DATA[currentQuestionIndex - 1].round !== currentQ.round) {
        // 如果不是第一輪，並且上一題有總結，則已經在 showRoundSummary 處理
        // 這裡確保第一輪也能直接開始
        if (currentQ.round === 1) {
             questionDisplay.innerHTML = `Round ${currentQ.round}: ${currentQ.question}`;
        } else {
             // 確保在從 summary 返回時，正常顯示題目
             questionDisplay.innerHTML = `Round ${currentQ.round}: ${currentQ.question}`;
        }
    } else {
        // 正常顯示題目
        questionDisplay.innerHTML = `Round ${currentQ.round}: ${currentQ.question}`;
    }
    
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
    const currentQ = QUIZ_DATA[currentQuestionIndex];
