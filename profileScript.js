// Profile Page JavaScript Functionality

// User Data (In a real application, this would come from a backend/database)
let userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '👤',
  joinedDate: 'April 15, 2024',
  memberStatus: 'Premium Member',
  totalCourses: 6,
  lessonsCompleted: 24,
  quizzesTaken: 18,
  averageScore: '85%',
  learningStreak: 7
};

let subjectProgress = [
  { name: 'HTML', percentage: 75, lessons: 15 },
  { name: 'CSS', percentage: 60, lessons: 12 },
  { name: 'JavaScript', percentage: 45, lessons: 9 },
  { name: 'Java', percentage: 30, lessons: 6 },
  { name: 'DBMS', percentage: 50, lessons: 10 },
  { name: 'OS', percentage: 65, lessons: 13 },
  { name: 'Math', percentage: 55, lessons: 11 }
];

let achievements = [
  { id: 1, icon: '🏆', title: 'Quick Learner', desc: 'Completed 3 courses', unlocked: true },
  { id: 2, icon: '⭐', title: 'Top Scorer', desc: '90%+ in quizzes', unlocked: true },
  { id: 3, icon: '🔥', title: 'On Fire', desc: '7-day streak', unlocked: true },
  { id: 4, icon: '🎯', title: 'Goal Setter', desc: 'Completed 10 lessons', unlocked: true },
  { id: 5, icon: '💡', title: 'Problem Solver', desc: 'Mastered 5 concepts', unlocked: false },
  { id: 6, icon: '🚀', title: 'Speed Runner', desc: 'Completed 50+ lessons', unlocked: false }
];

let certificates = [
  { id: 1, title: 'HTML Fundamentals', date: 'March 10, 2024' },
  { id: 2, title: 'CSS Mastery', date: 'April 5, 2024' },
  { id: 3, title: 'JavaScript Basics', date: 'May 20, 2024' }
];

let recentActivity = [
  { time: '2 hours ago', description: 'Completed JavaScript Quiz' },
  { time: '1 day ago', description: 'Earned "Top Scorer" achievement' },
  { time: '3 days ago', description: 'Completed CSS course' },
  { time: '5 days ago', description: 'Started Java course' },
  { time: '1 week ago', description: 'Joined Studypoint' }
];

let userSettings = {
  emailNotif: true,
  courseUpdates: true,
  weeklySummary: false,
  publicProfile: true,
  showAchievements: true,
  autoPlayVideos: true,
  darkMode: false
};

// Initialize profile on page load
document.addEventListener('DOMContentLoaded', function() {
  loadUserProfile();
  loadAchievements();
  loadSubjectProgress();
  loadCourseList();
  loadCertificates();
  loadActivityTimeline();
  loadUserSettings();
  loadDarkModePreference();
});

// Load User Profile Data
function loadUserProfile() {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userAvatar = document.getElementById('userAvatar');
  const userBadge = document.getElementById('userBadge');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const joinedDate = document.getElementById('joinedDate');
  
  const totalCourses = document.getElementById('totalCourses');
  const lessonsCompleted = document.getElementById('lessonsCompleted');
  const quizzesTaken = document.getElementById('quizzesTaken');
  const averageScore = document.getElementById('averageScore');

  if (userName) userName.textContent = userData.name;
  if (userEmail) userEmail.textContent = userData.email;
  if (userAvatar) userAvatar.textContent = userData.avatar;
  if (userBadge) userBadge.textContent = userData.memberStatus;
  
  if (fullName) fullName.textContent = userData.name;
  if (email) email.textContent = userData.email;
  if (phone) phone.textContent = userData.phone;
  if (joinedDate) joinedDate.textContent = userData.joinedDate;
  
  if (totalCourses) totalCourses.textContent = userData.totalCourses;
  if (lessonsCompleted) lessonsCompleted.textContent = userData.lessonsCompleted;
  if (quizzesTaken) quizzesTaken.textContent = userData.quizzesTaken;
  if (averageScore) averageScore.textContent = userData.averageScore;
}

// Load Subject Progress
function loadSubjectProgress() {
  const container = document.getElementById('subjectProgressContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  subjectProgress.forEach(subject => {
    const progressCard = document.createElement('div');
    progressCard.className = 'subject-progress-card';
    progressCard.innerHTML = `
      <div class="subject-progress-title">${subject.name}</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${subject.percentage}%;"></div>
      </div>
      <div style="font-size: 12px; color: #666; margin-top: 8px; display: flex; justify-content: space-between;">
        <span>${subject.percentage}% Completed</span>
        <span>${subject.lessons} lessons</span>
      </div>
    `;
    container.appendChild(progressCard);
  });
}

// Load Achievements
function loadAchievements() {
  const container = document.getElementById('achievementsGrid');
  if (!container) return;
  
  container.innerHTML = '';
  
  achievements.forEach(achievement => {
    const achievementCard = document.createElement('div');
    achievementCard.className = `achievement-card ${!achievement.unlocked ? 'locked' : ''}`;
    achievementCard.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-title">${achievement.title}</div>
      <div class="achievement-desc">${achievement.desc}</div>
    `;
    achievementCard.style.cursor = 'pointer';
    achievementCard.onclick = () => showAchievementDetails(achievement);
    container.appendChild(achievementCard);
  });
}

// Show Achievement Details
function showAchievementDetails(achievement) {
  if (achievement.unlocked) {
    showNotification(`${achievement.icon} ${achievement.title} - ${achievement.desc} ✅`);
  } else {
    showNotification(`🔒 ${achievement.title} - ${achievement.desc} (Keep learning!)`);
  }
}

// Load Course List
function loadCourseList() {
  const courseList = document.getElementById('courseList');
  if (!courseList) return;
  
  courseList.innerHTML = '';
  
  const courses = [
    { name: 'HTML Fundamentals', status: 'Completed' },
    { name: 'CSS Styling', status: 'Completed' },
    { name: 'JavaScript Basics', status: 'In Progress' },
    { name: 'Java Programming', status: 'In Progress' },
    { name: 'Database Management', status: 'Not Started' },
    { name: 'Operating Systems', status: 'In Progress' }
  ];
  
  courses.forEach(course => {
    const courseItem = document.createElement('li');
    courseItem.className = 'course-item';
    const statusColor = course.status === 'Completed' ? '#4CAF50' : course.status === 'In Progress' ? '#2196F3' : '#999';
    courseItem.innerHTML = `
      <div class="course-name">${course.name}</div>
      <div class="course-status" style="background: ${statusColor};">${course.status}</div>
    `;
    courseList.appendChild(courseItem);
  });
}

// Load Certificates
function loadCertificates() {
  const container = document.getElementById('certificateContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (certificates.length === 0) {
    container.innerHTML = '<div class="no-certificates">No certificates yet. Keep learning to earn certificates!</div>';
    return;
  }
  
  certificates.forEach(cert => {
    const certDiv = document.createElement('div');
    certDiv.className = 'certificate';
    certDiv.innerHTML = `
      <div class="certificate-icon">🎓</div>
      <div class="certificate-title">${cert.title}</div>
      <div class="certificate-date">Earned on ${cert.date}</div>
    `;
    certDiv.onclick = () => downloadCertificate(cert);
    container.appendChild(certDiv);
  });
}

// Download Certificate
function downloadCertificate(cert) {
  showNotification(`📥 Certificate for "${cert.title}" ready to download!`);
}

// Load Activity Timeline
function loadActivityTimeline() {
  const container = document.getElementById('activityTimeline');
  if (!container) return;
  
  container.innerHTML = '';
  
  recentActivity.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <div class="activity-time">${activity.time}</div>
      <div class="activity-description">${activity.description}</div>
    `;
    container.appendChild(activityItem);
  });
}

// Load User Settings
function loadUserSettings() {
  const emailToggle = document.querySelector('[onclick="toggleSetting(this, \'emailNotif\')"]');
  const courseToggle = document.querySelector('[onclick="toggleSetting(this, \'courseUpdates\')"]');
  const weeklyToggle = document.querySelector('[onclick="toggleSetting(this, \'weeklySummary\')"]');
  const publicToggle = document.querySelector('[onclick="toggleSetting(this, \'publicProfile\')"]');
  const achieveToggle = document.querySelector('[onclick="toggleSetting(this, \'showAchievements\')"]');
  const autoplayToggle = document.querySelector('[onclick="toggleSetting(this, \'autoPlayVideos\')"]');
  
  if (emailToggle && userSettings.emailNotif) emailToggle.classList.add('active');
  if (courseToggle && userSettings.courseUpdates) courseToggle.classList.add('active');
  if (publicToggle && userSettings.publicProfile) publicToggle.classList.add('active');
  if (achieveToggle && userSettings.showAchievements) achieveToggle.classList.add('active');
  if (autoplayToggle && userSettings.autoPlayVideos) autoplayToggle.classList.add('active');
}

// Tab Switching Function
function switchTab(tabName) {
  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));
  
  // Remove active class from all buttons
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab and activate button
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// Edit Profile Modal Functions
function openEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.classList.add('active');
    document.getElementById('editName').value = userData.name;
    document.getElementById('editEmail').value = userData.email;
    document.getElementById('editPhone').value = userData.phone;
    document.getElementById('editAvatar').value = userData.avatar;
  }
}

function closeEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function saveProfile(event) {
  event.preventDefault();
  
  userData.name = document.getElementById('editName').value;
  userData.email = document.getElementById('editEmail').value;
  userData.phone = document.getElementById('editPhone').value;
  userData.avatar = document.getElementById('editAvatar').value;
  
  loadUserProfile();
  closeEditModal();
  
  showNotification('Profile updated successfully! ✅');
}

// Toggle Settings
function toggleSetting(element, setting) {
  element.classList.toggle('active');
  userSettings[setting] = element.classList.contains('active');
  console.log(`${setting} is now ${userSettings[setting] ? 'enabled' : 'disabled'}`);
}

// Toggle Dark Mode
function toggleDarkMode(element) {
  element.classList.toggle('active');
  document.body.classList.toggle('dark-mode');
  userSettings.darkMode = element.classList.contains('active');
  
  // Save to localStorage
  localStorage.setItem('darkMode', userSettings.darkMode);
  showNotification(`Dark mode ${userSettings.darkMode ? 'enabled' : 'disabled'} ✨`);
}

// Load Dark Mode Preference
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    const darkModeToggle = document.querySelector('[onclick="toggleDarkMode(this)"]');
    if (darkModeToggle) darkModeToggle.classList.add('active');
  }
}

// Reset Progress
function resetProgress() {
  if (confirm('⚠️ This will reset all your learning progress. Are you sure?')) {
    if (confirm('This action cannot be undone. Are you absolutely sure?')) {
      // Reset all progress data
      subjectProgress.forEach(subject => subject.percentage = 0);
      userData.lessonsCompleted = 0;
      userData.quizzesTaken = 0;
      userData.averageScore = '0%';
      
      loadUserProfile();
      loadSubjectProgress();
      
      showNotification('Your progress has been reset! 🔄');
    }
  }
}

// Delete Account
function deleteAccount() {
  if (confirm('⚠️ This will permanently delete your account. Are you sure?')) {
    const userInput = prompt('Type "DELETE" to confirm account deletion:');
    if (userInput === 'DELETE') {
      showNotification('Your account has been deleted. Redirecting...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      showNotification('Account deletion cancelled.');
    }
  }
}

// Logout Function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    showNotification('Logging out... 👋');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

// Notification Function
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #9dfff8, #5cc3b8);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 5000;
    animation: slideInRight 0.3s ease;
    font-weight: 600;
    max-width: 300px;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles if not already present
if (!document.getElementById('profile-animations')) {
  const style = document.createElement('style');
  style.id = 'profile-animations';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('editModal');
  if (modal && event.target === modal) {
    modal.classList.remove('active');
  }
}

// Add keyboard event for ESC key to close modal
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }
});
