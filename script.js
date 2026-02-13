document.addEventListener('DOMContentLoaded', function() {
    // Create falling hearts background
    createFallingHearts();
});

// Function to create falling hearts
function createFallingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟'];
    
    // Create initial hearts
    for (let i = 0; i < 50; i++) {
        createHeart(container, heartSymbols);
    }
    
    // Continuously create new hearts
    setInterval(() => {
        createHeart(container, heartSymbols);
    }, 200);
}

function createHeart(container, heartSymbols) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Random positioning
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration
    const duration = Math.random() * 3 + 4; // 4-7 seconds
    heart.style.animationDuration = duration + 's';
    
    // Random size
    const size = Math.random() * 15 + 15; // 15-30px
    heart.style.fontSize = size + 'px';
    
    // Random delay
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Function when Yes button is clicked
function sayYes() {
    // Hide question section
    document.querySelector('.question-section').style.display = 'none';
    
    // Show response
    const response = document.getElementById('response');
    response.classList.add('show');
    
    // Create celebration hearts
    createCelebrationHearts();
}

// Function to move the "Maybe" button
function moveNo() {
    const noBtn = document.querySelector('.no-btn');
    const container = document.querySelector('.container');
    
    // Get container bounds
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random position within container
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;
    
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    noBtn.textContent = 'Pretty Please? 🥺';
    
    // Make button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = (currentSize + 2) + 'px';
}

// Function to create celebration hearts when Yes is clicked
function createCelebrationHearts() {
    const container = document.getElementById('floatingHearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💞', '💟', '🥰', '😘', '💝'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 30);
    }
}

// Add some extra interactivity - click anywhere to create hearts
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) return;
    
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.animationDuration = '2s';
    heart.style.fontSize = '25px';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
});
