const historyEle = document.querySelector(".calculator__history");
const currentEle = document.querySelector(".calculator__current");
const equalsEle = document.querySelector(".calculator__equals");

const btnsContainer = document.querySelector(".calculator__btns");
const btnsAll = document.querySelectorAll(".calculator__btn");

let currNumber = "";
let currHistory = "";
let prevOperator = "";
let result = null;
let hasDot = false;


btnsContainer.onclick = handleButtons;
window.addEventListener("keydown", handleKeyboard)



function handleButtons(e) {
    let type = e.target.dataset.type;
    let value = e.target.dataset.value;
    
    if (type === "number") {
        handleNumbers(value);
    }
    if (type === "operator") {
        handleOperator(e, value);
    }
    if (value === "clear-all") {
        handleClearAll(e);
    }
    if (value === "clear-entry") {
        handleClearEntry();
    }
    if(type === "equal") {
        handleEqual(e);
    }
}


function handleNumbers(value) {
    if (value === "." && !hasDot) hasDot = true;
    else if (value === "." && hasDot) return;

    currNumber += value;
    currentEle.textContent = currNumber;
}



function handleOperator(e, value) {
    let operator = value;

    if (!currNumber) return;
    hasDot = false;

    if (currHistory && currNumber && prevOperator) {
        calculate();
    }
    else result = parseFloat(currNumber);

    updateDisplay(operator);
    
    removeActiveOperator();
    e.target.classList.add("active");
    
    prevOperator = operator;
}


function handleEqual() {
    if (!currHistory || !currNumber) return;
    hasDot = false;
    calculate();
    updateDisplay();
    currentEle.textContent = result;
    equalsEle.textContent = "";
    currNumber = result;
    currHistory = "";
    removeActiveOperator();
}


function handleClearAll() {
    currentEle.textContent = "";
    historyEle.textContent = "0";
    equalsEle.textContent = "0";
    currNumber = "";
    currHistory = "";
    result = null;
    hasDot = false;
    removeActiveOperator();
}


function handleClearEntry() {
    currentEle.textContent = "";
    currNumber = "";

}


function updateDisplay(operationName = "") {
    currHistory += `${currNumber} ${operationName} `;
    historyEle.textContent = currHistory;
    currentEle.textContent = "";
    currNumber = "";
    equalsEle.textContent = result;
}

function calculate() {
    const firstNumber  = parseFloat(result);
    const secondNumber = parseFloat(currNumber);

    if (prevOperator === "+") result = firstNumber + secondNumber;
    if (prevOperator === "-") result = firstNumber - secondNumber;
    if (prevOperator === "÷") result = firstNumber / secondNumber;
    if (prevOperator === "×") result = firstNumber * secondNumber;
    if (prevOperator === "%") result = firstNumber % secondNumber;
}

function removeActiveOperator() {
    let classActive = document.querySelector(".active");
    if (classActive) {
        classActive.classList.remove("active");
    }
}


function handleKeyboard(e) {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "%" ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === "="

        ) {
        clickBtnEl(e.key);
    }
    else if (e.key === "/") clickBtnEl("÷");
    else if (e.key === "*") clickBtnEl("×");
    else if (e.key === "Enter") clickBtnEl("=");
}


function clickBtnEl(key) {
    btnsAll.forEach( btn => {
        if (btn.dataset.value === key) btn.click();
    });
}