// Variables
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

const resetButton = document.querySelector(".resetButton")

let guessCount = 1;


// Functions
const checkGuess = () => {
    let userGuess = Number(guessField.value);
    // Display user guesses
    if (guessCount === 1) guesses.textContent = "Previous guesses: ";
    guesses.textContent += userGuess + " ";

    // Check user guesses
    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.classList.remove("failure");
        lastResult.classList.add("success");
        lowOrHi.textContent = "";
        setGameOver();
    }
    else if (guessCount === 10) {
        lastResult.textContent = ">> Game Over <<";
        lowOrHi.textContent = "";
        setGameOver();
    }
    else {
        lastResult.textContent = "Wrong!";
        lastResult.classList.add("failure");
        if (userGuess < randomNumber) {lowOrHi.textContent = "Last guess was too low!"}
        else if (userGuess > randomNumber) {lowOrHi.textContent = "Last guess was too high!"}
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

const setGameOver = () => {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.classList.remove("hidden");
    resetButton.addEventListener("click", resetGame)
}

const resetGame = () => {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (let p in resetParas) {
        p.textContent = "";
    }

    resetButton.classList.add("hidden");

    guesses.textContent = "";
    lastResult.textContent = "";
    //lowOrHi.textContent = "";

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.classList.remove("failure", "success");

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Events
guessSubmit.addEventListener("click", checkGuess);