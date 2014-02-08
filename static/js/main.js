var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

//array to store the game sprites
var sprites = [];

//full screen canvas
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

//players Ship sprite object
var shipObject =
{
    //position of source image in sprite
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 52,
    sourceHeight: 39,

    //position of the sprite on the canvas
    x: 0,
    y: 0,
    width: 52,
    height: 39
}

//create sprite
var playerShip = Object.create(shipObject);
sprites.push(playerShip);

//Load sprite's image
var shipImage = new Image();
shipImage.addEventListener("load", imageLoadHandler, false);
shipImage.src= "static/assets/sprites/Ship1.png";

function imageLoadHandler(){
    //Update the sprite as soon as the image has been loaded
    update();
}

function update() {
    //Create animation loop
    window.requestAnimationFrame(update, canvas);
    //Render
    render();
}

function render(){
    //Clear previous frame
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

    //Loop through all sprites
    if (sprites.length !== 0){
        for(var i=0; i<sprites.length; i++){
            var sprite = sprites[i];
            drawingSurface.drawImage(
                shipImage,
                sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight,
                Math.floor(sprite.x), Math.floor(sprite.y), sprite.width, sprite.height
            );
        }
    }
}
