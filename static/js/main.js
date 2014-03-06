var myID = undefined;
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

multiplayer.init();

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

    var velocity = {};
    var haveSomethingToSend = false;
    //Sprite movement
    //UP
    if (KEY.pressedKey[KEY.UP] && !KEY.pressedKey[KEY.DOWN]){
        velocity.vy = -5;
        haveSomethingToSend = true;
    }
    //DOWN
    if (KEY.pressedKey[KEY.DOWN] && !KEY.pressedKey[KEY.UP]){
        velocity.vy = 5;
        haveSomethingToSend = true;
    }
    //LEFT
    if (KEY.pressedKey[KEY.LEFT] && !KEY.pressedKey[KEY.RIGHT]){
        velocity.vx = -5;
        haveSomethingToSend = true;
    }
    //RIGHT
    if (KEY.pressedKey[KEY.RIGHT] && !KEY.pressedKey[KEY.LEFT]){
        velocity.vx = 5;
        haveSomethingToSend = true;
    }

    //Set velocity to zero if none of the key are being pressed
    if(!KEY.pressedKey[KEY.UP] && !KEY.pressedKey[KEY.DOWN]){
        velocity.vy = 0;
    }
    if (!KEY.pressedKey[KEY.LEFT] && !KEY.pressedKey[KEY.RIGHT]){
        velocity.vx = 0;
    }

    if(haveSomethingToSend){
        //send new pos
        var js = {
            messageType: "shipPosition",
            uid: myID,
            vx:velocity.vx,
            vy:velocity.vy
        }
        multiplayer.sendMessage(js);
    }
    //Render
    render.render();
}

