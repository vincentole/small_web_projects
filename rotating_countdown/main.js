const numbersAll = document.querySelectorAll(".numbers > span");
const btn = document.querySelector(".btn");
const getReady = document.querySelector(".get-ready");
const letsGo = document.querySelector(".lets-go");

btn.onclick = handleReset;

handleRotate();

async function handleRotate() {
    for (let number of numbersAll) {
        await timeout(1000);
        number.classList.add("spinning");

    }
    
    await timeout(1000);

    for (let number of numbersAll) {
        number.classList.remove("spinning");
    }
    
    getReady.classList.add("shrink");
    await timeout(200);
    getReady.classList.add("hidden");
    
    letsGo.classList.remove("hidden");
    letsGo.classList.remove("shrink");
    
    await timeout(1000);
    btn.classList.remove("hidden");
    btn.classList.remove("shrink");


}



async function handleReset() {
    letsGo.classList.add("shrink");
    btn.classList.add("shrink");
    await timeout(200);
    letsGo.classList.add("hidden");
    btn.classList.add("hidden");
    
    await timeout(500);
    getReady.classList.remove("hidden");
    getReady.classList.remove("shrink");
    handleRotate();
}


// Utility functions

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}