var myID = undefined;
var chatMessage = "";
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

    //if alphanumeric or space pressed prepare chat message.
    if (event.keyCode >= 48 && event.keyCode <= 90 || event.keyCode === 32){
        document.title = event.keyCode;
        chatMessage += String.fromCharCode(event.keyCode);
        console.log(chatMessage);
    }

    //when ENTER was pressed send chat message
    if (event.keyCode === 13){
        //prepare json and send
        multiplayer.sendMessage({
            messageType: "chatMessage",
            uid: myID,
            chatMessage: chatMessage
        });
        //clear what has been said
        chatMessage = "";
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

//An array to store the images that will be loaded and
//a variable that will used to count them as they load
var assetsToLoad = [];
var assetsLoaded = 0;

//Create the background sprite.
//Position it at the top left corner of the canvas
//and push it into the sprites array
var background = {};
background.sourceWidth = canvas.width;      //CUT image from sprite equal size of the canvas
background.sourceHeight = canvas.height;    //bigger canvas -> bigger image
background.width = canvas.width;
background.height = canvas.height;
background.x = 0;
background.y = 0;

//Create the background image and push it into the images array
var backgroundImage = new Image();
backgroundImage.addEventListener("load", imageLoadHandler, false);
backgroundImage.src = "static/assets/sprites/background.jpg";
assetsToLoad.push(backgroundImage);

//Load ship sprite image
var shipImage = new Image();
shipImage.addEventListener("load", imageLoadHandler, false);
shipImage.src= "static/assets/sprites/Ship1.png";
assetsToLoad.push(shipImage);

function imageLoadHandler(){
//Each time an image loads, 1 is added to assetsLoaded
  assetsLoaded++;

  //When assetsLoaded matches the number of images in the
  //assetsToLoad array, a loop assigns the image to the sprite
  if(assetsLoaded === assetsToLoad.length)
  {
      update();
  }

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

