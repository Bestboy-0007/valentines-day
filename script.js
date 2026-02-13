// Login credentials - CHANGE THESE!
const CORRECT_USERNAME = "love";
const CORRECT_PASSWORD = "love";

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const successOverlay = document.getElementById('successOverlay');

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    addKeyboardEffects();
});

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '🥰', '😘', '💝'];
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(container, heartSymbols);
        }, i * 150);
    }
    
    // Continuously create new hearts
    setInterval(() => {
        createHeart(container, heartSymbols);
    }, 400);
}

function createHeart(container, heartSymbols) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 4 + 6;
    heart.style.animationDuration = duration + 's';
    
    const size = Math.random() * 15 + 15;
    heart.style.fontSize = size + 'px';
    
    heart.style.animationDelay = Math.random() * 3 + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Add keyboard effects
function addKeyboardEffects() {
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
}

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const enteredUsername = usernameInput.value.toLowerCase().trim();
    const enteredPassword = passwordInput.value.toLowerCase().trim();
    
    if (enteredUsername === CORRECT_USERNAME && enteredPassword === CORRECT_PASSWORD) {
        showSuccess();
    } else {
        showError();
    }
});

function showSuccess() {
    // Show success overlay
    successOverlay.classList.add('show');
    
    // Create celebration hearts
    createCelebration();
    
    // Redirect after animation
    setTimeout(() => {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', usernameInput.value);
        window.location.href = 'valentine.html';
    }, 2500);
}

function showError() {
    // Shake the form
    const loginCard = document.querySelector('.login-card');
    loginCard.style.animation = 'none';
    loginCard.offsetHeight;
    loginCard.style.animation = 'shake 0.5s ease-in-out';
    
    // Change button temporarily
    const loginButton = document.querySelector('.login-button');
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML = '<span class="btn-text">Try Again</span> <span class="btn-icon">💔</span>';
    loginButton.style.background = 'linear-gradient(135deg, #666, #888)';
    
    setTimeout(() => {
        loginButton.innerHTML = originalText;
        loginButton.style.background = 'linear-gradient(135deg, #e91e63, #ff4081)';
        passwordInput.value = '';
    }, 1500);
}

function createCelebration() {
    const container = document.body;
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '🥰', '😘', '💝', '🎉', '✨'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.style.position = 'fixed';
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = '-50px';
            element.style.fontSize = (Math.random() * 25 + 15) + 'px';
            element.style.animation = 'fallDown 2.5s ease-out forwards';
            element.style.zIndex = '2000';
            element.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            container.appendChild(element);
            
            setTimeout(() => {
                element.remove();
            }, 2500);
        }, i * 25);
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fallDown {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
        20%, 40%, 60%, 80% { transform: translateX(8px); }
    }
`;
document.head.appendChild(style);
