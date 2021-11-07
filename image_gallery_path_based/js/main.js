const mainImage = document.querySelector(".main-image img");
const imageBar = document.querySelector(".image-bar");
const slider = document.querySelector(".slider");

let imgNumber = 8;

// Gallery
for (let i = 1; i <= imgNumber; i++) {
    const newDiv = document.createElement("div");
    const newImage = document.createElement("img");
    let path = `../img/gallery_${i}.jpg`;

    newImage.src = path;

    newDiv.appendChild(newImage);
    imageBar.appendChild(newDiv);
    
    newImage.onclick = e => {
        mainImage.src = e.target.src;
        slider.style.transform = `translateX(${(i-1) * slider.scrollWidth}px)`;
    }
}

