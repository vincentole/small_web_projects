const mathGenExercise = document.querySelector(".math-gen__exercise");
const mathGenAnswerInput = document.querySelector("#math-gen__answer-input");

const mathGenStartBtn = document.querySelector(".math-gen__start-btn");

mathGenStartBtn.onclick = handleMathGenStartBtn;
mathGenAnswerInput.addEventListener("input", handleAnswerInput);

let firstNumber;
let secondNumber;
let result;
let [exerciseMin, exerciseMax, currentOperation] = [3, 10, "divideInt"];

function handleMathGenStartBtn(e) {
    
    updateExercise(exerciseMin, exerciseMax, currentOperation);
}

async function handleAnswerInput(e) {
    if (parseFloat(e.target.value) === result)  {
        updateExercise(exerciseMin, exerciseMax, currentOperation);
        mathGenAnswerInput.value = "";
        mathGenAnswerInput.focus();
        mathGenAnswerInput.classList.add("success");
        setTimeout(() => {mathGenAnswerInput.classList.remove("success")}, 300);
        // 
    }
}















function updateExercise(min, max, operation) {
    let exerciseStr = getExercise(min, max, operation);
    mathGenExercise.textContent = exerciseStr;
}

function getExercise(min, max, operation) {
    firstNumber = getRandomIntInclusive(min, max);
    secondNumber = getRandomIntInclusive(min, max);
    result = null;
    let operationStr = "";

    if (operation === "add")      result = firstNumber + secondNumber, operationStr = "+";
    if (operation === "subtract") result = firstNumber - secondNumber, operationStr = "-"; 
    if (operation === "multiply") result = firstNumber * secondNumber, operationStr = "×";
    if (operation === "divide")   result = firstNumber / secondNumber, operationStr = "÷";
    if (operation === "divideInt") {
        let tempResult = firstNumber * secondNumber;
        result = firstNumber;
        firstNumber = tempResult;
        operationStr = "÷";
    }

    return `${firstNumber} ${operationStr} ${secondNumber} =`
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }


