
// Пароль для входа
const correctPassword = 'iloveyou'; 



function createFallingHearts() {
    const heartsBackground = document.getElementById('heartsBackground');
    const heartSymbols = ['♥', '❤', '💕', '💖'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('pixel-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 8 + 10) + 's'; 
        heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
        
        heartsBackground.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 18000);
    }
    
    setInterval(() => {
        createHeart();
    }, 800);
}

createFallingHearts();


const passwordInput = document.getElementById('passwordInput');
const enterBtn = document.getElementById('enterBtn');
const passwordPage = document.getElementById('passwordPage');
const welcomeModal = document.getElementById('welcomeModal');

// Check password
function checkPassword() {
    const enteredPassword = passwordInput.value.toLowerCase().trim();
    
    if (enteredPassword === correctPassword) {
        passwordPage.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            passwordPage.style.display = 'none';
            welcomeModal.classList.remove('hidden');
        }, 500);
    } else {
        // Wrong password - show alert
        alert('Oops! Wrong magic sentence, my sunshine ❤️');
        passwordInput.value = '';
    }
}

// Event listeners for password
enterBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// ============================================
// WELCOME MODAL FUNCTIONALITY
// ============================================

const startBtn = document.getElementById('startBtn');
const mainPage = document.getElementById('mainPage');

startBtn.addEventListener('click', () => {
    // Hide welcome modal and show main page
    welcomeModal.style.animation = 'fadeOut 0.5s';
    setTimeout(() => {
        welcomeModal.style.display = 'none';
        mainPage.classList.remove('hidden');
    }, 500);
});

// ============================================
// TAB NAVIGATION FUNCTIONALITY
// ============================================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(tabName + 'Tab').classList.add('active');
    });
});

// ============================================
// LOVE ZONE - "I LOVE YOU TOO" BUTTON
// ============================================

const loveResponseBtn = document.getElementById('loveResponseBtn');
const letterContent = document.getElementById('letterContent');

loveResponseBtn.addEventListener('click', () => {
    // Show the letter content
    letterContent.classList.remove('hidden');
    // Scroll to the letter smoothly
    setTimeout(() => {
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});

// ============================================
// FADE OUT ANIMATION
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// MUSIC PLAYER FUNCTIONALITY
// ============================================

const musicPlayer = document.getElementById('musicPlayer');
const musicItems = document.querySelectorAll('.music-item');
let currentPlayingBtn = null;

musicItems.forEach(item => {
    const playBtn = item.querySelector('.play-btn');
    const songPath = item.getAttribute('data-song');
    
    playBtn.addEventListener('click', () => {
        // Если нажали на уже играющую песню - поставить на паузу
        if (currentPlayingBtn === playBtn && !musicPlayer.paused) {
            musicPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            currentPlayingBtn = null;
        } else {
            // Остановить предыдущую песню
            if (currentPlayingBtn) {
                currentPlayingBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            // Запустить новую песню
            musicPlayer.src = songPath;
            musicPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            currentPlayingBtn = playBtn;
        }
    });
});

// Когда песня закончилась, вернуть иконку Play
musicPlayer.addEventListener('ended', () => {
    if (currentPlayingBtn) {
        currentPlayingBtn.innerHTML = '<i class="fas fa-play"></i>';
        currentPlayingBtn = null;
    }
});
