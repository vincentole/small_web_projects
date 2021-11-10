const startBtn = document.querySelector(".start");
const winnerEle = document.querySelector(".winner");
const arrowEle = document.querySelector(".arrow");
const motivationELe = document.querySelector(".motivation");

// Draw variabel
let startTime = null;
let rAF;
let rotateCount = 0;

startBtn.onclick = startGame;

function startGame() {
    startBtn.disabled = true;
    draw();
    arrowEle.classList.remove("invisible");
    setTimeout(setEndGame, random(1000, 5000));
}


function draw(timestamp) {
    if (!startTime) startTime = timestamp;
    rotateCount = ((timestamp - startTime) / 4) % 360;
    arrowEle.style.transform = `rotate(${rotateCount}deg)`;
    rAF = requestAnimationFrame(draw);
}

function setEndGame() {
    console.log("Set Endgame");
    cancelAnimationFrame(rAF);
    arrowEle.classList.add("invisible");
    motivationELe.classList.remove("hidden");

    document.body.addEventListener("keydown", keyHandler);

    function keyHandler(e) {
        let isOver = false;

        if (e.key === "a") {
            winnerEle.textContent = "The Winner is: Player 1!"
            isOver = true;
        }
        else if (e.key === "l") {
            winnerEle.textContent = "The Winner is: Player 2!"
            isOver = true;
        }
        if (isOver) {
            document.body.removeEventListener("keydown", keyHandler);
            console.log("is Over");
            winnerEle.classList.remove("hidden");
            startBtn.classList.add("hidden");
            motivationELe.classList.add("hidden");
            setTimeout(reset, 4000);
        }
    }
}

function reset() {
    startBtn.disabled = false;
    winnerEle.classList.add("hidden");
    startBtn.classList.remove("hidden");
}




function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}
