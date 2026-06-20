// Project.js

// ----------------- Sidebar and Popups -----------------
let isOpen = false;

function openMenu() {
    let sidebar = document.getElementById("sidebar");

    if (isOpen) {
        sidebar.classList.remove("active");
        isOpen = false;
    } else {
        sidebar.classList.add("active");
        isOpen = true;
    }
}
function openLogin() {
    document.getElementById("loginPopup").style.display = "block";
}

function openRegister() {
    document.getElementById("registerPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("registerPopup").style.display = "none";
}

// ----------------- Slider Logic -----------------
let currentPosition = 0;

function moveSlider(direction) {
    const track = document.getElementById('javaSlider');
    const cards = document.querySelectorAll('.slider-card');
    const cardWidth = cards[0].offsetWidth + 15; // Width + gap
    const visibleWidth = document.querySelector('.slider-wrapper').offsetWidth;
    const totalWidth = track.scrollWidth;

    currentPosition += (direction * cardWidth);

    // Clamp values so it doesn't slide into empty space
    if (currentPosition > 0) {
        currentPosition = 0;
    } else if (Math.abs(currentPosition) > (totalWidth - visibleWidth)) {
        currentPosition = -(totalWidth - visibleWidth);
    }

    track.style.transform = `translateX(${currentPosition}px)`;
}

function toggleTopicMenu(){
    let sidebar = document.querySelector(".s-sidebar");
    let content = document.querySelector(".s-content");

    sidebar.classList.toggle("active");
    content.classList.toggle("active"); 
}

// ----------------- Subject Quiz Logic -----------------
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");

// Only run quiz logic if we are actually on the quiz page (subject exists)
if (subject && document.getElementById("quizTitle")) {
    
    document.getElementById("quizTitle").innerText = subject.toUpperCase() + " Quiz";

    // Grab the specific quiz data from the external quizData.js file
    const quizData = allQuestions[subject];

    if (quizData) {
        let currentQuestion = 0;
        let score = 0;

        const questionEl = document.getElementById("question");
        const optionsEl = document.querySelector(".options");
        const nextBtn = document.querySelector(".next-btn");

function copyAndOpen() {
    const promptText = "You are an expert educator, examiner, learning coach, and adaptive assessment system. Your AI name is Gemini. Use the URL provided by the user as the primary source of study material: https://pastebin.com/bBF69v3T. Starting Rule: Your FIRST response must be exactly 'Study Point X Gemini'. Do not say Hello. Do not introduce yourself. Do not explain the syllabus first. Do not summarize the content first. Immediately begin with Question 1. Quiz Mode: MCQ questions only, one at a time. Wait for the user's answer before continuing. Never reveal the correct answer before the user answers. Assessment Strategy: Track mastery for every topic. After each answer, evaluate correctness, identify the concept, update mastery, give a brief explanation, and immediately ask the next MCQ. Exam Difficulty: Assume the user is preparing for a real examination. Final Report: After sufficient assessment, generate a report including Total Score, Topic-wise Performance, and Recommended Revision Plan.";
    
    // 1. Copy to clipboard
    navigator.clipboard.writeText(promptText).then(() => {
        // 2. Open Gemini in a new tab
        window.open('https://gemini.google.com', '_blank');
    }).catch(err => {
        alert("Permission denied. Please tap the button again or ensure clipboard access is allowed.");
    });
}

        function loadQuestion(){
            document.getElementById("questionNumber").innerText = 
                `Question ${currentQuestion + 1} of ${quizData.length}`;

            const q = quizData[currentQuestion];
            questionEl.innerText = q.question;
            optionsEl.innerHTML = "";

            q.options.forEach((option, index) => {
                const btn = document.createElement("button");
                btn.classList.add("option");
                btn.innerText = option;
                btn.onclick = () => selectAnswer(index);
                optionsEl.appendChild(btn);
            });
        }

        function selectAnswer(selected){
            const correct = quizData[currentQuestion].answer;
            const buttons = document.querySelectorAll(".option");

            buttons.forEach(btn => btn.disabled = true);

            if(selected === correct){
                score++;
                buttons[selected].style.background = "green";
                buttons[selected].style.color = "white";
            } else {
                buttons[selected].style.background = "red";
                buttons[selected].style.color = "white";
                buttons[correct].style.background = "green";
                buttons[correct].style.color = "white";
            }
        }

        nextBtn.addEventListener("click", () => {
            currentQuestion++;

            if(currentQuestion < quizData.length){
                loadQuestion();
            } else {
                const percentage = Math.round((score / quizData.length) * 100);
                document.querySelector(".question-box").innerHTML = `
                    <h2>Quiz Completed 🎉</h2>
                    <h3>Score: ${score}/${quizData.length}</h3>
                    <h3>Percentage: ${percentage}%</h3>
                    <button onclick="location.reload()" class="next-btn">Restart Quiz</button>
<br>
<br>
<div style="text-align: center;">
    <a href="https://gemini.google.com" target="_blank"onclick="copyAndOpen()">
        
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg"alt="Gemini" style="width: 50px; height: 50px; cursor: pointer; border-radius: 8px;">
    </a>
    <a href="https://chatgpt.com/?prompt=You%20are%20an%20expert%20educator%2C%20examiner%2C%20learning%20coach%2C%20web%20researcher%2C%20and%20adaptive%20assessment%20system.%0A%0AYour%20task%20is%20to%20use%20the%20URL%20provided%20by%20the%20user%20as%20the%20PRIMARY%20source%20of%20study%20material.%0A%0AURL%3A%20https%3A%2F%2Fpastebin.com%2FbBF69v3T%0A%0AIMPORTANT%20URL%20ACCESS%20RULES%0A%0A1.%20Always%20attempt%20to%20access%20the%20URL%20before%20responding.%0A2.%20If%20the%20URL%20is%20a%20Pastebin%20link%2C%20automatically%20try%20BOTH%20the%20normal%20URL%20and%20the%20raw%20URL%20version.%0A3.%20If%20the%20URL%20is%20an%20API%20endpoint%2C%20fetch%20and%20analyze%20all%20available%20data.%0A4.%20If%20the%20URL%20contains%20topic%20IDs%20or%20related%20endpoints%2C%20automatically%20explore%20them%20to%20gather%20additional%20educational%20content.%0A5.%20Never%20claim%20the%20URL%20is%20inaccessible%20without%20first%20attempting%20alternative%20versions.%0A6.%20If%20access%20temporarily%20fails%2C%20ask%20for%20the%20raw%20version%2C%20the%20content%20itself%2C%20or%20an%20alternative%20mirror.%0A7.%20Do%20not%20invent%20or%20assume%20content%20that%20was%20not%20successfully%20retrieved.%0A%0ASTEP%201%20%E2%80%94%20CONTENT%20EXTRACTION%0AExtract%20and%20organize%20topics%2C%20subtopics%2C%20definitions%2C%20concepts%2C%20examples%2C%20formulas%2C%20procedures%2C%20facts%2C%20tables%2C%20diagrams%20and%20important%20exam%20points.%0A%0ASTEP%202%20%E2%80%94%20KNOWLEDGE%20ASSESSMENT%0ABegin%20with%20%22Study%20Point%20X%20(ChatGPT)%22%20and%20ask%20one%20question%20at%20a%20time.%0A%0ASTEP%203%20%E2%80%94%20ADAPTIVE%20LEARNING%0AAnalyze%20every%20answer%2C%20identify%20weak%20areas%2C%20and%20adjust%20difficulty.%0A%0ASTEP%204%20%E2%80%94%20EXAM%20MODE%0ATrack%20strong%20topics%2C%20weak%20topics%2C%20mistakes%2C%20and%20revision%20needs.%0A%0ASTEP%205%20%E2%80%94%20FINAL%20REPORT%0AGenerate%20mastery%20scores%2C%20exam%20readiness%2C%20and%20a%20personalized%20study%20plan%20when%20requested.%0A%0AUse%20only%20information%20successfully%20retrieved%20from%20the%20provided%20URL">
        
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/1280px-OpenAI_logo_2025_%28symbol%29.svg.png"alt="chatgpt" style="width: 50px; height: 50px; cursor: pointer; border-radius: 8px;">
</a>
</div>
                `;
            }
        });

        loadQuestion();
    } else {
        document.querySelector(".question-box").innerHTML = `<h2>Quiz data not found for this subject.</h2>`;
    }
}
