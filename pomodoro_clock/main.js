/* eslint-disable no-use-before-define */
const timer1Display = document.querySelector('.display1');
const timer2Display = document.querySelector('.display2');
const timer3Display = document.querySelector('.display3');
const timerDisplayAll = document.querySelectorAll('.display');
const timer1Input = document.querySelector('#inputTimer1');
const timer2Input = document.querySelector('#inputTimer2');
const timer3Input = document.querySelector('#inputTimer3');
const timerInputAll = document.querySelectorAll('input');

const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const stopBtn = document.querySelector('.stop');

// Define timer
class Timer {
    constructor(display, input) {
        this.timerDisplay = display;
        this.ms = input.value * 60000;
        this.startTime = Date.now();
    }

    start() {
        this.interval = setInterval(() => {
            if (!this.startTime) this.startTime = Date.now();
            const currTimer = this.ms - (Date.now() - this.startTime);

            if (currTimer <= 0) {
                clearInterval(this.interval);
                this.timerDisplay.textContent = '00:00';
                return;
            }

            this.timerDisplay.textContent = formatDisplay(currTimer);
        }, 250);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.startTime = null;
        clearInterval(this.interval);
        this.timerDisplay.textContent = formatDisplay(this.ms);
    }
}

// Timers
let Timer1 = null;
let Timer2 = null;
let Timer3 = null;

// Format display and handle input
for (let i = 0; i < timerInputAll.length; i += 1) {
    timerInputAll[i].addEventListener('input', (event) => handleInput(event, i));
}

function handleInput(event, i) {
    const { value } = event.target;
    if (Timer1) Timer1.reset();
    Timer1 = new Timer(timer1Display, timer1Input);
    timerDisplayAll[i].textContent = `${value.toString().padStart(2, 0)}:00`;
}

// Handle Timer
startBtn.addEventListener('click', handleStart);
resetBtn.addEventListener('click', handleReset);
stopBtn.addEventListener('click', handleStop);

function handleStart() {
    Timer1 = new Timer(timer1Display, timer1Input);
    Timer1.start();
}

function handleStop() {
    Timer1.stop();
}

function handleReset() {
    Timer1.reset();
}

// Utility functions
function formatDisplay(ms) {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min.toString().padStart(2, 0)}:${sec.toString().padStart(2, 0)}`;
}
