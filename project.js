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
                `;
            }
        });

        loadQuestion();
    } else {
        document.querySelector(".question-box").innerHTML = `<h2>Quiz data not found for this subject.</h2>`;
    }
}
