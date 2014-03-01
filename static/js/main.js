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
    //if alphanumeric pressed send chat message, Else move ship.
    if (event.keyCode >= 48 && event.keyCode <= 90){
        document.title = event.keyCode;
    }
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

//create sprite
var playerShip = Object.create(Blueprints.shipObject);
multiplayer.getID();
console.log("----ID: "+playerShip.id);
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

            /* After the  translate  method moves the drawing surface to the sprite’s center point, that point will become the
            drawing surface’s new 0,0 position. That means if you want the sprite to be centered on that point, you have to
            move it half its height upward and half its height to the left.
            */
            drawingSurface.drawImage(
                shipImage,
                sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight,
                Math.floor(-sprite.width/2), Math.floor(-sprite.height/2), sprite.width, sprite.height
            );

            //Draw text
            if (sprite.text){
                drawingSurface.fillText(sprite.text+" "+sprite.x+"; "+_ID, -sprite.width/2, sprite.height);
            };

            //Restore the drawing surface before rotation
            drawingSurface.restore();
        }
    }
}
