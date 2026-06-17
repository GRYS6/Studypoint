// Sidebar and Popups
let isOpen = false;

function openMenu() {

  let sidebar = document.getElementById("sidebar");

  if (isOpen) {

    sidebar.style.left = "-250px";

    isOpen = false;

  } else {

    sidebar.style.left = "0";

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

// Slider Logic
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
  let content = document.querySelector(".s-content"); // Grab the content area

  sidebar.classList.toggle("active");
  content.classList.toggle("active"); // Toggle active class on content too
}



/*============subjectQuiz JS=========*/
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");

document.getElementById("quizTitle").innerText =
subject.toUpperCase() + " Quiz";

// Sample Questions
const allQuestions = {
   dbms: [

{
question: "What does DBMS stand for?",
options: [
"Database Management System",
"Data Backup Management System",
"Database Main System",
"Data Management Service"
],
answer: 0
},

{
question: "Which language is used to interact with databases?",
options: [
"HTML",
"SQL",
"CSS",
"XML"
],
answer: 1
},

{
question: "Which key uniquely identifies a record?",
options: [
"Foreign Key",
"Primary Key",
"Candidate Key",
"Composite Key"
],
answer: 1
},

{
question: "A table row is called?",
options: [
"Attribute",
"Field",
"Record",
"Column"
],
answer: 2
},

{
question: "Which normal form removes partial dependency?",
options: [
"1NF",
"2NF",
"3NF",
"BCNF"
],
answer: 1
},

{
question: "Which key links two tables?",
options: [
"Primary Key",
"Foreign Key",
"Super Key",
"Candidate Key"
],
answer: 1
},

{
question: "DBMS helps reduce?",
options: [
"Redundancy",
"Security",
"Storage",
"Tables"
],
answer: 0
},

{
question: "SQL stands for?",
options: [
"Structured Query Language",
"System Query Language",
"Simple Query Language",
"Sequential Query Language"
],
answer: 0
},

{
question: "Which command is used to retrieve data?",
options: [
"INSERT",
"DELETE",
"SELECT",
"UPDATE"
],
answer: 2
},

{
question: "ER Model stands for?",
options: [
"Entity Relationship Model",
"Entry Relation Model",
"Entity Record Model",
"Extended Relation Model"
],
answer: 0
}

]
};
const quizData = allQuestions[subject];

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

    q.options.forEach((option,index)=>{

        const btn = document.createElement("button");

        btn.classList.add("option");

        btn.innerText = option;

        btn.onclick = ()=>selectAnswer(index);

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
    }
    else{
        buttons[selected].style.background = "red";
        buttons[selected].style.color = "white";

        buttons[correct].style.background = "green";
        buttons[correct].style.color = "white";
    }
}

nextBtn.addEventListener("click",()=>{

    currentQuestion++;

    if(currentQuestion < quizData.length){

        loadQuestion();

    }else{

      const percentage = Math.round((score / quizData.length) * 100);

document.querySelector(".question-box").innerHTML = `
<h2>Quiz Completed 🎉</h2>

<h3>Score: ${score}/${quizData.length}</h3>

<h3>Percentage: ${percentage}%</h3>

<button onclick="location.reload()" class="next-btn">
Restart Quiz
</button>
`;
    }
});

loadQuestion();
