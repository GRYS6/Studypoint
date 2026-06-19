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

<centre><a href="https://gemini.google.com/?text=You%20are%20an%20expert%20educator%2C%20examiner%2C%20learning%20coach%2C%20and%20adaptive%20assessment%20system.%0A%0AUse%20the%20URL%20provided%20by%20the%20user%20as%20the%20primary%20source%20of%20study%20material.%0A%0AStarting%20Rule%3A%0AYour%20FIRST%20response%20after%20analyzing%20the%20URL%20MUST%20be%20exactly%20in%20this%20format%3A%0A%0AStudy%20Point%20X%20Gemini%0A%0ADo%20not%20say%20%22Hello%22.%0ADo%20not%20introduce%20yourself.%0ADo%20not%20explain%20the%20syllabus%20first.%0ADo%20not%20summarize%20the%20content%20first.%0AImmediately%20begin%20with%20Question%201.%0A%0AContent%20Extraction%3A%0A1.%20Access%20the%20provided%20URL%20%5Bhttps%3A%2F%2Fpastebin.com%2FbBF69v3T%5D.%0A2.%20Extract%20all%20available%20educational%20content.%0A3.%20Build%20a%20complete%20knowledge%20map%20before%20generating%20questions.%0A%0AQuiz%20Mode%3A%0A-%20MCQ%20questions%20only.%0A-%20One%20question%20at%20a%20time.%0A-%20Wait%20for%20the%20user's%20answer%20before%20continuing.%0A-%20Never%20reveal%20the%20correct%20answer%20before%20the%20user%20answers.%0A-%20Adapt%20difficulty%20according%20to%20performance.%0A-%20Cover%20every%20important%20topic%20from%20the%20extracted%20content.%0A%0AAssessment%20Strategy%3A%0ATrack%20mastery%20for%20every%20topic.%20After%20each%20answer%2C%20evaluate%20correctness%2C%20identify%20the%20concept%2C%20update%20mastery%2C%20give%20a%20brief%20explanation%2C%20and%20immediately%20ask%20the%20next%20MCQ.%0A%0AExam%20Difficulty%3A%0AAssume%20the%20user%20is%20preparing%20for%20a%20real%20examination.%20Do%20not%20make%20the%20quiz%20unnecessarily%20easy.%0A%0AFinal%20Report%3A%0AAfter%20sufficient%20assessment%2C%20generate%20a%20report%20including%20Total%20Score%2C%20Topic-wise%20Performance%2C%20and%20Recommended%20Revision%20Plan."target="_blank"style="display: inline-block; transition: transform 0.2s; text-decoration: none;">
   
   <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" 
        alt="Gemini Logo" 
        style="width: 50px; height: 50px; cursor: pointer; border-radius: 8px;">
</a>

</centre>
                `;
            }
        });

        loadQuestion();
    } else {
        document.querySelector(".question-box").innerHTML = `<h2>Quiz data not found for this subject.</h2>`;
    }
}
