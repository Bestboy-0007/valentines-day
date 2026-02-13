document.addEventListener('DOMContentLoaded', function() {
    createFallingHearts();
    createSparkles();
    startTypingEffect();
});

const loveMessages = [
    "My dearest love,",
    "You are my everything 💕",
    "Every moment with you is precious",
    "I love you more than yesterday",
    "You make my life complete",
    "Forever yours 💍"
];

let messageIndex = 0;

function createFallingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '💝', '🫀'];
    
    for (let i = 0; i < 60; i++) {
        createHeart(container, heartSymbols);
    }
    
    setInterval(() => {
        createHeart(container, heartSymbols);
    }, 150);
}

function createHeart(container, heartSymbols) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, (Math.random() * 3 + 5) * 1000);
}

function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 30; i++) {
        createSparkle(container);
    }
    setInterval(() => { createSparkle(container); }, 300);
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.width = (Math.random() * 3 + 2) + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(sparkle);
    setTimeout(() => { sparkle.remove(); }, 4000);
}

function startTypingEffect() {
    const typedText = document.getElementById('typedText');
    let fullText = "My love, you are my everything! 💕";
    let index = 0;
    
    function type() {
        if (index < fullText.length) {
            typedText.textContent += fullText.charAt(index);
            index++;
            setTimeout(type, 80);
        } else {
            setTimeout(() => {
                messageIndex = (messageIndex + 1) % loveMessages.length;
                typedText.textContent = '';
                fullText = loveMessages[messageIndex];
                index = 0;
                type();
            }, 3000);
        }
    }
    setTimeout(type, 1000);
}

function sayYes() {
    document.querySelector('.question-section').style.display = 'none';
    const response = document.getElementById('response');
    response.classList.add('show');
    createCelebrationHearts();
    createSuperCelebration();
}

function moveNo() {
    const noBtn = document.querySelector('.no-btn');
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width - 60;
    const maxY = containerRect.height - btnRect.height - 60;
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    const texts = ['Pretty Please? 🥺', "Don't break my heart 😢", 'I love you! 💕', 'Please say yes 🥺', "You're my everything 💖", 'Say YES! 😍', 'I adore you! 💝'];
    noBtn.textContent = texts[Math.floor(Math.random() * texts.length)];
    
    const currentSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = (currentSize + 2) + 'px';
    
    noBtn.style.animation = 'btnShake 0.5s ease-in-out';
    setTimeout(() => { noBtn.style.animation = ''; }, 500);
}

function createCelebrationHearts() {
    const container = document.getElementById('floatingHearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '🥰', '😘', '💝', '👑', '💍'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heart.style.fontSize = (Math.random() * 25 + 25) + 'px';
            container.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 5000);
        }, i * 20);
    }
}

function createSuperCelebration() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.background = '#ff69b4';
            container.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 3000);
        }, i * 30);
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) return;
    if (e.target.tagName === 'IMG') return;
    
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const hearts = ['❤️', '💕', '💖', '💗', '💘', '💞'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.animationDuration = '2s';
    heart.style.fontSize = '30px';
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 2000);
});

const style = document.createElement('style');
style.textContent = `@keyframes btnShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }`;
document.head.appendChild(style);
