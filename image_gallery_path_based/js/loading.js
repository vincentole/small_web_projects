
const script = document.getElementById("gallery-script");
const gallery = document.querySelector(".container");
const loader = document.querySelector(".lds-roller");

gallery.style.visibility = "hidden";

  
setTimeout( () => {
    gallery.style.visibility = "visible";
    loader.style.display = "none";

}, 1000);


