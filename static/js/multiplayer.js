var multiplayer ={
    webSocketHost: "ws://localhost:8000/ws",
    webSocket: undefined,
    id: undefined,

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

    handleOnOpen: function(){
        document.title = "status: OnLine";
        console.log("conn open");
    },

    handleOnMessage: function(msg){
        var messageObject = JSON.parse(msg.data);

        switch (messageObject.messageType) {
            case "uid":
                _ID = messageObject.id;
                console.log("id: "+_ID);
                break;

            case "shipPosition":
                console.log(messageObject);
                //console.log("shipPosition: "+messageObject.x+"  "+messageObject.y);
                playerShip.setPosition(messageObject);
                break;

            default:
                console.log("hit default "+msg);
                break;
        }
    },

    handleOnClose: function(){
        console.log("----CONNECTION CLOSED-----");
        document.title = "DISCONNECT";
    },

    handleOnError: function(evt){
        console.log("---ERROR---- "+evt);
    }

}

