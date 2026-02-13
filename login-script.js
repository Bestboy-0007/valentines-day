// Login credentials - CHANGE THESE!
const CORRECT_USERNAME = "love"; // Change to your girlfriend's name/nickname
const CORRECT_PASSWORD = "love"; // Change to your secret word

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const wrongShake = document.getElementById('wrongShake');
const loginCard = document.querySelector('.login-card');

// Initialize background hearts on load
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundHearts();
    addKeyboardEffects();
});

// Create floating hearts background
function createBackgroundHearts() {
    const container = document.getElementById('bgHearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '🥰', '😘', '💝'];
    
    // Create initial hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart(container, heartSymbols);
        }, i * 200);
    }
    
    // Continuously create new hearts
    setInterval(() => {
        createHeart(container, heartSymbols);
    }, 300);
}

function createHeart(container, heartSymbols) {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 5 + 5;
    heart.style.animationDuration = duration + 's';
    
    const size = Math.random() * 15 + 15;
    heart.style.fontSize = size + 'px';
    
    heart.style.animationDelay = Math.random() * 5 + 's';
    
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
    
    // Check credentials (case-insensitive)
    if (enteredUsername === CORRECT_USERNAME && enteredPassword === CORRECT_PASSWORD) {
        // Success! Show celebration and redirect
        showSuccess();
    } else {
        // Wrong credentials - show error
        showError();
    }
});

function showSuccess() {
    // Add loading class
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = '<span class="btn-text">Opening 💕</span>';
    
    // Create celebration
    createCelebration();
    
    // Redirect after animation
    setTimeout(() => {
        // Store login status
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', usernameInput.value);
        
        // Show the Valentine's Day page
        window.location.href = 'index.html';
    }, 1500);
}

function showError() {
    // Shake the card
    loginCard.style.animation = 'none';
    loginCard.offsetHeight; // Trigger reflow
    loginCard.style.animation = 'shake 0.5s ease-in-out';
    
    // Change button temporarily
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.innerHTML = 'Try Again 💔';
    loginBtn.style.background = 'linear-gradient(135deg, #666, #888)';
    
    setTimeout(() => {
        loginBtn.innerHTML = '<span class="btn-text">Enter 💕</span><span class="btn-heart">❤️</span>';
        loginBtn.style.background = 'linear-gradient(135deg, #e91e63, #ff4081)';
        passwordInput.value = '';
    }, 1500);
}

function createCelebration() {
    const container = document.body;
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '🥰', '😘', '💝', '🎉', '✨'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.style.position = 'fixed';
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = '-50px';
            element.style.fontSize = (Math.random() * 20 + 20) + 'px';
            element.style.animation = 'fallDown 2s ease-out forwards';
            element.style.zIndex = '1000';
            element.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            container.appendChild(element);
            
            setTimeout(() => {
                element.remove();
            }, 2000);
        }, i * 30);
    }
}

// Add fallDown animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fallDown {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
