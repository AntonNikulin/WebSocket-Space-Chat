var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var shipImage = new Image();
shipImage.addEventListener("load", imageLoadHandler, false);
shipImage.src="static/assets/sprites/Ship1.png";

function imageLoadHandler(){
    drawingSurface.drawImage(shipImage, 0, 0);
}
