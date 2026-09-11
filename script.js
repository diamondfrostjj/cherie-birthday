// =================================================================
// 1. CONFIGURATION & STATE
// =================================================================

let score = 0;
let questionsAnswered = 0;

// =================================================================
// 2. INITIALIZATION ON LOAD
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    startCounter();
});

// =================================================================
// 3. FLOATING HEARTS GENERATOR
// =================================================================
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartEmojis = ['💖', '💕', '💗', '🌸', '✨'];
    const totalHearts = 15;

    for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Randomize placement, animation speed, and sizing
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${6 + Math.random() * 6}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${1 + Math.random() * 1.2}rem`;

        container.appendChild(heart);
    }
}

// =================================================================
// 4. LIVE "DAYS TOGETHER" COUNTER
// =================================================================
// Set your anniversary date (June 7, 2025)
const ANNIVERSARY_DATE = new Date('2025-06-07T00:00:00'); 

function startCounter() {
    function updateCounter() {
        const now = new Date();
        const difference = now - ANNIVERSARY_DATE;

        if (difference < 0) return; // Prevent negative values if date is in the future

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}


// =================================================================
// 5. QUIZ LOGIC & INTERACTION
// =================================================================
function checkAnswer(buttonElement, isCorrect) {
    const questionCard = buttonElement.closest('.quiz-card');
    const allButtons = questionCard.querySelectorAll('.quiz-btn');

    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
        btn.style.opacity = '0.7';
    });

    if (isCorrect) {
        buttonElement.style.backgroundColor = '#2ecc71';
        buttonElement.style.color = '#ffffff';
        buttonElement.style.opacity = '1';
        score++;
    } else {
        buttonElement.style.backgroundColor = '#e74c3c';
        buttonElement.style.color = '#ffffff';
        buttonElement.style.opacity = '1';
    }

    questionsAnswered++;

    const totalQuestions = document.querySelectorAll('.quiz-card').length;
    if (questionsAnswered === totalQuestions) {
        setTimeout(showCompletion, 600);
    }
}

function showCompletion() {
    const successElement = document.getElementById('quiz-success');
    if (successElement) {
        successElement.classList.remove('hidden');
        successElement.scrollIntoView({ behavior: 'smooth' });
    }
    triggerConfetti();
}

// =================================================================
// 6. GROWING HEART LOGIC
// =================================================================
let heartClicks = 0;
const maxClicks = 5;

function growHeart() {
    const heart = document.getElementById('growing-heart');
    const message = document.getElementById('heart-final-message');
    const instruction = document.querySelector('.heart-instruction');

    heartClicks++;

    const scale = 1 + (heartClicks * 0.45);
    heart.style.transform = `scale(${scale})`;

    if (heartClicks >= maxClicks) {
        heart.style.transform = `scale(${scale * 1.8})`;
        heart.style.opacity = '0';
        heart.style.transition = 'all 0.3s ease-out';

        setTimeout(() => {
            heart.style.display = 'none';
            if (instruction) instruction.style.display = 'none';
            message.classList.remove('hidden');
            message.scrollIntoView({ behavior: 'smooth' });
            triggerConfetti();
        }, 300);
    }
}

// =================================================================
// 7. CONFETTI EFFECT
// =================================================================
function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}