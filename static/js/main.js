var _ID = undefined; //unique id for player ship, we get from server
multiplayer.init();
//Arrow key codes
var KEY = {
    UP:  38,
    DOWN:  40,
    RIGHT:  39,
    LEFT:  37
};
KEY.pressedKey = [];

//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//keyboard listeners
window.addEventListener("keydown", function(event){
    KEY.pressedKey[event.keyCode] = true;
}, false);

window.addEventListener("keyup", function(event){
    KEY.pressedKey[event.keyCode] = false;
}, false);


var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");
drawingSurface.font="20px Georgia"

//full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//array to store the game sprites
var sprites = [];

//players Ship sprite object
var shipObject =
{
    //Movement
    //rotation: degree 0-360
    rotation: 0,
    //velocity
    vx: 0,
    vy: 0,

    //position of source image in sprite
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 35,
    sourceHeight: 37,

    //position of the sprite on the canvas
    x: 0,
    y: 0,
    width: 35,
    height: 37,

    text: "SHiP",

    id: undefined,

    setPosition: function(obj){
        this.x = obj.x;
        this.y = obj.y;
    },

    setID: function(id){
        this.id = id;
    }
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

    //Sprite movement
    //UP
    if (KEY.pressedKey[KEY.UP] && !KEY.pressedKey[KEY.DOWN]){
        playerShip.vy = -5;
        console.log(playerShip.vy);
    }
    //DOWN
    if (KEY.pressedKey[KEY.DOWN] && !KEY.pressedKey[KEY.UP]){
        playerShip.vy = 5;
    }
    //LEFT
    if (KEY.pressedKey[KEY.LEFT] && !KEY.pressedKey[KEY.RIGHT]){
        playerShip.vx = -5;
    }
    //RIGHT
    if (KEY.pressedKey[KEY.RIGHT] && !KEY.pressedKey[KEY.LEFT]){
        playerShip.vx = 5;
    }

    //Set velocity to zero if none of the key are being pressed
    if(!KEY.pressedKey[KEY.UP] && !KEY.pressedKey[KEY.DOWN]){
        playerShip.vy = 0;
    }
    if (!KEY.pressedKey[KEY.LEFT] && !KEY.pressedKey[KEY.RIGHT]){
        playerShip.vx = 0;
    }

    //playerShip.setPosition(p);
    //Move sprite
    //playerShip.x += playerShip.vx;
    //playerShip.y += playerShip.vy;
    //send new pos
    var js = {
        messageType: "shipPosition",
        uid: _ID,
        vx:playerShip.vx,
        vy:playerShip.vy
    }
    multiplayer.sendMessage(js);

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

            drawingSurface.save();

            //Rotate the canvas
            drawingSurface.translate(
                Math.floor(sprite.x + (sprite.width / 2)),
                Math.floor(sprite.y + (sprite.height / 2))
            );
            //degree to radians
            drawingSurface.rotate(sprite.rotation * Math.PI / 180);

            drawingSurface.drawImage(
                shipImage,
                sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight,
                Math.floor(-sprite.width/2), Math.floor(-sprite.height/2), sprite.width, sprite.height
            );

            //Draw text
            if (sprite.text){
                drawingSurface.fillText(sprite.text+" "+sprite.x, -sprite.width/2, sprite.height);
            };

            //Restore the drawing surface before rotation
            drawingSurface.restore();
        }
    }
}
