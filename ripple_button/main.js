const btnRipple = document.querySelector(".btn-ripple");


btnRipple.onclick = handleRipple;


function handleRipple(e) {
    const left = e.clientX - e.target.offsetLeft;
    const top = e.clientY - e.target.offsetTop;

    const circle = document.createElement("div");
    circle.style.top = top + "px";
    circle.style.left = left + "px";
    circle.classList.add("btn-ripple__effect");

    btnRipple.appendChild(circle);

    setTimeout( () => circle.remove(),500);
}