const startBtn = document.querySelector('.start-btn');
const gameBtns = document.querySelectorAll('.buttons button');
const score = document.querySelector('#score');

function getRandom(max) {
    return Math.floor(Math.random() * (max + 1));
}

function timeout(ms) {
    return new Promise( (resolve) => setTimeout(resolve, ms))
}

async function replayColors() {
    for (let i of gameHistory) {
        gameBtns[i].classList.add('light');
        await timeout(500);
        gameBtns[i].classList.remove('light')
        await timeout(500);
    }
}

let gameHistory = [];
let gameStarted = false;
let gameCopy = null;
async function handleStart() {
    startBtn.disabled = true;
    gameBtns.forEach((btn) => (btn.disabled = true));
    document.body.classList.add('loading');
    await timeout(1000);

    gameHistory.push(getRandom(3));
    await replayColors();
    gameCopy = gameHistory.slice();

    // await timeout(500);
    document.body.classList.remove('loading');
    gameBtns.forEach((btn) => (btn.disabled = false));
}

startBtn.addEventListener('click', handleStart);

async function handleColorBtns(event, i) {
    if (gameHistory.length === 0) return;
    
    // Game Over
    if (i !== gameCopy[0]) {
        gameHistory = [];
        gameCopy = null;
        score.textContent = 0;
        startBtn.disabled = false;
        document.body.classList.add('game-over');
        setTimeout(() => document.body.classList.remove('game-over'), 1000);
    }

    // Correct Intermediate Button
    else if ( i === gameCopy[0] && gameCopy.length > 1) {
        gameCopy.shift();
        document.body.classList.add('success');
        setTimeout(() => document.body.classList.remove('success'), 100);
    }

    //  Next Round
    else if ( i === gameCopy[0] && gameCopy.length <= 1) {
        document.body.classList.add('success');
        setTimeout(() => document.body.classList.remove('success'), 100);
        score.textContent = gameHistory.length;
        await timeout(1000);
        handleStart();
        
    }
}

gameBtns.forEach( (clrBtn, i) => {
    clrBtn.addEventListener('click', event => handleColorBtns(event, i));
});