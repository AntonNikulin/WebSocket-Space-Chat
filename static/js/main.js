var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

//full screen canvas
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

//player's Ship object
var ship =
{
    image: "static/assets/sprites/Ship1.png",
    //position of source image in sprite
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 0,
    sourceHeight: 0,

    //position of the sprite on the canvas
    x: 0,
    y: 0,
    width: 64,
    height: 64
}

var shipImage = new Image();
shipImage.addEventListener("load", imageLoadHandler, false);
shipImage.src=ship.image;

function imageLoadHandler(){
    drawingSurface.drawImage(shipImage, 0, 0);
}
