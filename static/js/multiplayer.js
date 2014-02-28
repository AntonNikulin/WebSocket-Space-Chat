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

    getID: function(){
        multiplayer.sendMessage({
            messageType: "getID"
        });
    },

    handleOnOpen: function(){
        document.title = "status: OnLine";
        console.log("conn open");

        Utility.drawFavicon(Colors.GREEN);
    },

    handleOnMessage: function(msg){
        var messageObject = JSON.parse(msg.data);

        switch (messageObject.messageType) {
            case "uid":
                _ID = messageObject.id;
                console.log("id: "+_ID);
                playerShip.id = messageObject.id;
                break;

            case "shipPosition":
                console.log(messageObject);
                if (messageObject.id == _ID){
                    playerShip.setPosition(messageObject);
                };
                break;

            case "connectedShips":
                console.log("---ships---- "+msg.data);
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
        console.log("---ERROR---- "+evt);
    }

}

