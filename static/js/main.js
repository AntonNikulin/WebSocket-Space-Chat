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
//full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render.init(canvas);
//create sprite
var playerShip = Object.create(Blueprints.shipObject);
multiplayer.getID();
console.log("----ID: "+playerShip.id);
render.sprites.push(playerShip);

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
    render.render();
}

