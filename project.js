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
java: [
{question:"Java is a ?",options:["Database","Programming Language","OS","Browser"],answer:1},
{question:"Java was developed by?",options:["Microsoft","Sun Microsystems","Google","IBM"],answer:1},
{question:"Which method starts a Java program?",options:["run()","start()","main()","init()"],answer:2},
{question:"Java is ?",options:["Platform Independent","Platform Dependent","OS","Compiler"],answer:0},
{question:"JVM stands for?",options:["Java Virtual Machine","Java Variable Method","Joint Virtual Machine","Java Verified Machine"],answer:0},
{question:"Which keyword is used for inheritance?",options:["extends","implements","inherit","super"],answer:0},
{question:"Which package is imported by default?",options:["java.io","java.net","java.lang","java.util"],answer:2},
{question:"Which loop executes at least once?",options:["for","while","do-while","foreach"],answer:2},
{question:"String class belongs to?",options:["java.lang","java.io","java.util","java.net"],answer:0},
{question:"Java supports?",options:["OOP","POP","Both","None"],answer:2}
],

wt: [
{question:"HTML stands for?",options:["Hyper Text Markup Language","High Text Language","Hyper Transfer Markup Language","None"],answer:0},
{question:"CSS is used for?",options:["Styling","Database","Programming","Server"],answer:0},
{question:"JavaScript is a ?",options:["Programming Language","DBMS","OS","Browser"],answer:0},
{question:"Which tag creates a hyperlink?",options:["img","a","p","h1"],answer:1},
{question:"Which tag inserts image?",options:["image","img","src","pic"],answer:1},
{question:"AJAX stands for?",options:["Asynchronous JavaScript and XML","Advanced JS XML","Async Java XML","None"],answer:0},
{question:"Which property changes text color?",options:["background","font","color","text"],answer:2},
{question:"HTTP stands for?",options:["Hyper Text Transfer Protocol","High Transfer Text Protocol","Hyper Transfer Protocol","None"],answer:0},
{question:"Which HTML tag creates a table row?",options:["td","tr","table","th"],answer:1},
{question:"Which CSS property changes background color?",options:["bg","background-color","color","style"],answer:1}
],

os: [
{question:"OS stands for?",options:["Operating System","Open System","Office System","Output System"],answer:0},
{question:"Which is an OS?",options:["Windows","HTML","SQL","CSS"],answer:0},
{question:"CPU scheduling is done by?",options:["OS","Compiler","DBMS","Browser"],answer:0},
{question:"Deadlock occurs when?",options:["Processes wait forever","CPU idle","RAM full","Disk full"],answer:0},
{question:"FIFO is a ?",options:["Scheduling Algorithm","Language","OS","Compiler"],answer:0},
{question:"Virtual Memory uses?",options:["Hard Disk","Printer","Mouse","Monitor"],answer:0},
{question:"Process means?",options:["Program in Execution","Program","File","Folder"],answer:0},
{question:"Semaphore is used for?",options:["Synchronization","Storage","Printing","Scheduling"],answer:0},
{question:"Thrashing occurs due to?",options:["Excessive Paging","Compilation","Deadlock","CPU Scheduling"],answer:0},
{question:"Round Robin is a ?",options:["Scheduling Algorithm","Language","OS","DBMS"],answer:0}
],

math: [
{question:"Value of π is?",options:["3.14","2.14","4.13","5.14"],answer:0},
{question:"Derivative of x²?",options:["x","2x","x²","2"],answer:1},
{question:"sin 90° = ?",options:["0","1","2","-1"],answer:1},
{question:"Integral of 1 dx?",options:["x","1","0","x²"],answer:0},
{question:"2 + 2 × 3 = ?",options:["12","8","6","10"],answer:1},
{question:"Matrix determinant of identity matrix?",options:["0","1","2","Undefined"],answer:1},
{question:"log₁₀1 = ?",options:["0","1","10","Undefined"],answer:0},
{question:"Area of circle formula?",options:["πr²","2πr","r²","πd"],answer:0},
{question:"Probability range?",options:["0 to 1","1 to 10","0 to 100","-1 to 1"],answer:0},
{question:"tan45° = ?",options:["0","1","√2","2"],answer:1}
],

dsa: [
{question:"DSA stands for?",options:["Data Structures and Algorithms","Database System Algorithm","Data Storage Algorithm","None"],answer:0},
{question:"Stack follows?",options:["LIFO","FIFO","Both","None"],answer:0},
{question:"Queue follows?",options:["LIFO","FIFO","Both","None"],answer:1},
{question:"Binary Search requires?",options:["Sorted Array","Unsorted Array","Stack","Queue"],answer:0},
{question:"Linked List stores data in?",options:["Nodes","Arrays","Tables","Stacks"],answer:0},
{question:"Tree root is?",options:["Top Node","Leaf","Child","Edge"],answer:0},
{question:"Which traversal is Root Left Right?",options:["Preorder","Inorder","Postorder","Level"],answer:0},
{question:"Time complexity of Binary Search?",options:["O(log n)","O(n)","O(n²)","O(1)"],answer:0},
{question:"Array index starts from?",options:["0","1","2","-1"],answer:0},
{question:"Graph consists of?",options:["Vertices and Edges","Nodes only","Edges only","Arrays"],answer:0}
]

};
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
