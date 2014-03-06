var multiplayer ={
    webSocketHost: "ws://localhost:8000/ws",
    webSocket: undefined,

    init : function(){
        this.webSocket = new WebSocket(this.webSocketHost);
        this.webSocket.onopen = this.handleOnOpen;
        this.webSocket.onmessage = this.handleOnMessage;
        this.webSocket.onerror = this.handleOnError;
        this.webSocket.onclose = this.handleOnClose;
    },

    sendMessage: function(message){
        if (this.webSocket.readyState === WebSocket.OPEN){
            this.webSocket.send(JSON.stringify(message));
        }
    },

    CreateShip: function(){
        multiplayer.sendMessage({
            messageType: "CreateShip"
        });
    },

    //_____OPEN_____
    handleOnOpen: function(){
        document.title = "status: OnLine";
        console.log("conn open");
        multiplayer.CreateShip();
        Utility.drawFavicon(Colors.GREEN);
    },

    handleOnMessage: function(msg){
        console.log("MSG: "+msg.data);
        var messageObject = JSON.parse(msg.data);

        switch (messageObject.messageType) {
            case "ShipCreated":
                //create sprite
                var playerShip = Object.create(Blueprints.shipObject);
                playerShip.setPosition(messageObject);
                playerShip.id = messageObject.id;
                render.sprites[playerShip.id]=playerShip;
                myID = messageObject.id;
                break;

            case "shipPosition":
                render.sprites[messageObject.id].setPosition(messageObject);
                break;

            case "connectedShips":
                arr = messageObject.ships;
                for (var i=0;i<arr.length;i++){
                    var sh = Object.create(Blueprints.shipObject);
                    sh.x = arr[i].x;
                    sh.y = arr[i].y;
                    sh.id = arr[i].shipId;
                    render.sprites[sh.id]=sh;
                }
                break;

            default:
                console.log("hit default "+msg.data);
                break;
        }
    },

    handleOnClose: function(){
        console.log("----CONNECTION CLOSED-----");
        document.title = "DISCONNECT";

        Utility.drawFavicon(Colors.RED);
    },

    handleOnError: function(evt){
        console.log("WSocket---ERROR---- "+JSON.stringify(evt));
    }

}

