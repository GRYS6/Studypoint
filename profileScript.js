// ==========================
// User Data
// ==========================

let userData = {
  name: "Student",
  email: "student@gmail.com",
  college: "",
  course: "",
  phone: "",
  avatar: "👤",

  quizzesTaken: 0,
  highestScore: 0,
  averageScore: "0%",
  notesRead: 0
};

// ==========================
// Load Saved Data
// ==========================

const savedUser = localStorage.getItem("userData");

if (savedUser) {
  userData = JSON.parse(savedUser);
}

// ==========================
// Page Load
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  loadUserProfile();

  loadSubjectProgress();

  loadDarkMode();

});

// ==========================
// Load Profile
// ==========================

function loadUserProfile() {

  document.getElementById("userName").textContent =
    userData.name;

  document.getElementById("userEmail").textContent =
    userData.email;

  document.getElementById("userAvatar").textContent =
    userData.avatar;

  document.getElementById("fullName").textContent =
    userData.name;

  document.getElementById("email").textContent =
    userData.email;

  document.getElementById("college").textContent =
    userData.college || "-";

  document.getElementById("course").textContent =
    userData.course || "-";

  document.getElementById("phone").textContent =
    userData.phone || "-";

  document.getElementById("quizTaken").textContent =
    userData.quizzesTaken;

  document.getElementById("highestScore").textContent =
    userData.highestScore;

  document.getElementById("averageScore").textContent =
    userData.averageScore;

  document.getElementById("notesRead").textContent =
    userData.notesRead;
}

// ==========================
// Tabs
// ==========================

function switchTab(event, tabName) {

  document
    .querySelectorAll(".tab-content")
    .forEach(tab => {
      tab.classList.remove("active");
    });

  document
    .querySelectorAll(".tab-btn")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  document
    .getElementById(tabName)
    .classList.add("active");

  event.target.classList.add("active");
}

// ==========================
// Edit Modal
// ==========================

function openEditModal() {

  document
    .getElementById("editModal")
    .classList.add("active");

  document.getElementById("editName").value =
    userData.name;

  document.getElementById("editEmail").value =
    userData.email;

  document.getElementById("editCollege").value =
    userData.college;

  document.getElementById("editCourse").value =
    userData.course;

  document.getElementById("editPhone").value =
    userData.phone;

  document.getElementById("editAvatar").value =
    userData.avatar;
}

function closeEditModal() {

  document
    .getElementById("editModal")
    .classList.remove("active");
}

// ==========================
// Save Profile
// ==========================

function saveProfile(event) {

  event.preventDefault();

  userData.name =
    document.getElementById("editName").value;

  userData.email =
    document.getElementById("editEmail").value;

  userData.college =
    document.getElementById("editCollege").value;

  userData.course =
    document.getElementById("editCourse").value;

  userData.phone =
    document.getElementById("editPhone").value;

  userData.avatar =
    document.getElementById("editAvatar").value || "👤";

  localStorage.setItem(
    "userData",
    JSON.stringify(userData)
  );

  loadUserProfile();

  closeEditModal();

  alert("Profile Updated Successfully!");
}

// ==========================
// Subject Progress
// ==========================

function loadSubjectProgress() {

  const subjects = [

    { name: "DBMS", progress: 0 },

    { name: "JAVA", progress: 0 },

    { name: "WT", progress: 0 },

    { name: "OS", progress: 0 },

    { name: "DSA", progress: 0 },

    { name: "MATH", progress: 0 }

  ];

  const container =
    document.getElementById(
      "subjectProgressContainer"
    );

  container.innerHTML = "";

  subjects.forEach(subject => {

    container.innerHTML += `

      <div class="subject-progress-card">

        <div class="subject-progress-title">
          ${subject.name}
        </div>

        <div class="progress-bar">

          <div
            class="progress-fill"
            style="width:${subject.progress}%">
          </div>

        </div>

        <p style="margin-top:10px;">
          ${subject.progress}% Completed
        </p>

      </div>

    `;
  });
}

// ==========================
// Dark Mode
// ==========================

function toggleDarkMode(element) {

  element.classList.toggle("active");

  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

function loadDarkMode() {

  const darkMode =
    localStorage.getItem("darkMode");

  if (darkMode === "true") {

    document.body.classList.add(
      "dark-mode"
    );

    const toggle =
      document.querySelector(
        ".toggle-switch"
      );

    if (toggle) {
      toggle.classList.add("active");
    }
  }
}

// ==========================
// Logout
// ==========================

function logout() {

  if (
    confirm("Are you sure you want to logout?")
  ) {

    window.location.href =
      "index.html";
  }
}

// ==========================
// Close Modal
// ==========================

window.onclick = function(event) {

  const modal =
    document.getElementById("editModal");

  if (event.target === modal) {

    closeEditModal();
  }
};