const displayPara = document.querySelector(".timer");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");

let prevTime;
let elapsedTime = 0;
let timer;

startBtn.onclick = () => {
    if (!timer) {
        timer = setInterval(intervalLogic, 50);   
    }
}

pauseBtn.onclick = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    prevTime = null;
}
resetBtn.onclick = () => {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    displayTime();
}

function intervalLogic() {
    if (!prevTime) {
        prevTime = Date.now();
    }
    elapsedTime += Date.now() - prevTime;
    prevTime = Date.now();
    displayTime();
}


function displayTime() {
    let timeDiffHours = (elapsedTime * 0.001) / 3600;
    let minutesRemaining = (timeDiffHours % 1) * 60;
    let secondsRemaining = (minutesRemaining % 1) * 60; 
    let millisecondsRemaining = (secondsRemaining % 1) * 1000;

    let hours = Math.floor(timeDiffHours);
    let minutes = Math.floor(minutesRemaining);
    let seconds = Math.floor(secondsRemaining);
    let milliseconds = Math.floor(millisecondsRemaining);

    let timeString =  `${formatTimeDigit(hours)}:${formatTimeDigit(minutes)}:${formatTimeDigit(seconds)}:${formatTimeDigit(milliseconds)}`;
    displayPara.textContent = timeString;
}

function formatTimeDigit(digit) {
    if (String(digit).length < 2) {
        return "0" + digit;
    }
    else if (String(digit).length > 2) {
        return digit.toString().slice(0,2);
    }
    else {
        return String(digit);
    }
}





