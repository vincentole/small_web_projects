const magicBtn = document.querySelector(".magic");
const shuffleBtn = document.querySelector(".shuffle");
const rebuildBtn = document.querySelector(".rebuild");
const boxesContainer = document.querySelector(".boxes");

magicBtn.onclick = () => boxesContainer.classList.toggle("big");
shuffleBtn.onclick = handleShuffle;
rebuildBtn.onclick = handleRebuild;


// Initialize boxes

const rowSize = 4;
const coordinates = [];

for (let i = 0; i < rowSize; i++) {
    for(let j = 0; j < rowSize; j++) {
        coordinates.push([i, j]);
        
        const box = document.createElement("div");

        box.classList.add("box");
        box.style.backgroundPosition = (`${-125 * j}px ${-125 * i}px`);

        boxesContainer.appendChild(box);
    }
}


// Handle Onlick

function handleShuffle() {
    let _coordinates = coordinates.flat();
    const boxesAll = document.querySelectorAll(".box");
    
    boxesAll.forEach((box, i) => {    
        _coordinates = shuffle(_coordinates);
        
        box.style.backgroundPosition = `${-125 * _coordinates.pop()}px ${-125 * _coordinates.pop()}px`;

    });
}

function handleRebuild() {
    const boxesAll = document.querySelectorAll(".box");

    boxesAll.forEach((box, i) => {
        box.style.backgroundPosition = `${-125 * coordinates[i][1]}px ${-125 * coordinates[i][0]}px`;
    });
}


// Utility Functions

function randomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // min and max inclusive
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}