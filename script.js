// Пароль для входа
const correctPassword = '6';

const passwordInput = document.getElementById('passwordInput');
const enterBtn = document.getElementById('enterBtn');
const passwordPage = document.getElementById('passwordPage');
const welcomeModal = document.getElementById('welcomeModal');
const startBtn = document.getElementById('startBtn');
const mainPage = document.getElementById('mainPage');
const letterToggle = document.getElementById('letterToggle');
const letterContent = document.getElementById('letterContent');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

const state = {
    musicPlaying: false,
};

function createMagicDust() {
    const dustContainer = document.getElementById('magicDust');
    const dustSymbols = ['✦', '✧', '✶', '✺'];

    function createDust() {
        const dust = document.createElement('span');
        dust.classList.add('dust');
        dust.textContent = dustSymbols[Math.floor(Math.random() * dustSymbols.length)];
        dust.style.left = Math.random() * 100 + '%';
        dust.style.animationDuration = (Math.random() * 10 + 12) + 's';
        dust.style.fontSize = (Math.random() * 10 + 14) + 'px';
        dust.style.opacity = (Math.random() * 0.4 + 0.3).toFixed(2);

        dustContainer.appendChild(dust);

        setTimeout(() => {
            dust.remove();
        }, 22000);
    }

    setInterval(createDust, 900);
}

createMagicDust();

function checkPassword() {
    const enteredPassword = passwordInput.value.toLowerCase().trim();

    if (enteredPassword === correctPassword) {
        passwordPage.classList.add('fade-out');
        setTimeout(() => {
            passwordPage.style.display = 'none';
            welcomeModal.classList.remove('hidden');
        }, 500);
    } else {
        alert('Неверная цифра. Попробуй еще раз ✨');
        passwordInput.value = '';
    }
}

enterBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function startMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.35;

    bgMusic.play()
        .then(() => {
            state.musicPlaying = true;
            musicToggle.classList.add('is-playing');
            musicToggle.querySelector('.music-text').textContent = 'Музыка: вкл';
        })
        .catch(() => {
            state.musicPlaying = false;
            musicToggle.classList.remove('is-playing');
            musicToggle.querySelector('.music-text').textContent = 'Музыка: выкл';
        });
}

startBtn.addEventListener('click', () => {
    welcomeModal.classList.add('fade-out');
    setTimeout(() => {
        welcomeModal.style.display = 'none';
        mainPage.classList.remove('hidden');
        mainPage.classList.add('fade-in');
        musicToggle.classList.remove('hidden');
        startMusic();
    }, 400);
});

musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;

    if (state.musicPlaying) {
        bgMusic.pause();
        state.musicPlaying = false;
        musicToggle.classList.remove('is-playing');
        musicToggle.querySelector('.music-text').textContent = 'Музыка: выкл';
    } else {
        startMusic();
    }
});

if (letterToggle && letterContent) {
    letterToggle.addEventListener('click', () => {
        letterContent.classList.toggle('hidden');
        letterToggle.textContent = letterContent.classList.contains('hidden')
            ? 'Развернуть письмо'
            : 'Свернуть письмо';
    });
}

const scrollButtons = document.querySelectorAll('[data-scroll]');

scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-scroll');
        if (!target) return;
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
