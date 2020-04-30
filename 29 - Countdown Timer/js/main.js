let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(sec) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + sec * 1000;

    displayTimerLeft(sec)
    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return
        }
        displayTimerLeft(secondsLeft)
    }, 1000);
}

function displayTimerLeft(sec) {
    const minutes = Math.floor(sec / 60);
    const remainderSec = sec % 60;
    const displayTime = `${minutes}:${remainderSec < 10 ? '0' : ''}${remainderSec}`;
    timerDisplay.textContent = displayTime;
    document.title = displayTime
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours();
    const ajastedHours = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes()
    endTime.textContent = `Be Back time At ${ajastedHours}:${minutes < 10 ? '0' : ''}${minutes}`

}

function startTimer() {
    const seconds = this.dataset.time;
    timer(seconds)
}

buttons.forEach(btn => {
    btn.addEventListener('click', startTimer)
});

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const mins = this.minutes.value;
    timer(mins * 60)
    this.reset()
})