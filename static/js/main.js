var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ship =
{
    image: "static/assets/sprites/Ship1.png"
}

var shipImage = new Image();
shipImage.addEventListener("load", imageLoadHandler, false);
shipImage.src=ship.image;

function imageLoadHandler(){
    drawingSurface.drawImage(shipImage, 0, 0);
}
