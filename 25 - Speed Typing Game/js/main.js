window.addEventListener('load', populatesLvels);

//Avalible Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

let currentLevel = levels.easy

let time = currentLevel;
let score = 0;
let isPlaying;

const startBtn = document.querySelector('#start');
const selectTime = document.querySelector('#selectTime')
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
let timerInterval;

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
];

function populatesLvels() {
    selectTime.innerHTML = Object.entries(levels)
        .map(entry => {
            let key = entry[0];
            let value = entry[1];
            return `<option value="${value}">${key}</option>`
        })
        .join('');
}

function setLevel(e) {
    currentLevel = +e.target.value;
    seconds.innerHTML = currentLevel;
}

selectTime.addEventListener('change', setLevel);
startBtn.addEventListener('click', init)

function init() {
    clearInterval(timerInterval);
    time = currentLevel;
    timeDisplay.innerHTML = time

    document.querySelector('#game-block').classList.remove('hidden');
    wordInput.value = ""
    wordInput.focus()
    seconds.innerHTML = currentLevel;
    showWord(words);

    wordInput.addEventListener('input', startMatch)
    timerInterval = setInterval(countDown, 1000);
    setInterval(checkStatus, 500);
}

function showWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randomIndex]
}

function startMatch() {
    if (matcWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++
    }
    scoreDisplay.innerHTML = score === -1 ? 0 : score;
}

function matcWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!'
        return true
    } else {
        message.innerHTML = '';
        return false
    }
}

function countDown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false
    }
    timeDisplay.innerHTML = time
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = `Game Over! Your score is ${scoreDisplay.textContent}`;
        score = -1;
    }
}

