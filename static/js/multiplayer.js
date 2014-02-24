var multiplayer ={
    webSocketHost: "ws://localhost:8000/ws",
    webSocket: undefined,
    id: undefined,

    init : function(){
        this.webSocket = new WebSocket(this.webSocketHost);
        this.webSocket.onopen = this.handleOnOpen;
        this.webSocket.onmessage = this.handleOnMessage;
    },

    sendMessage: function(message){
        if (this.webSocket.readyState === WebSocket.OPEN){
            this.webSocket.send(JSON.stringify(message));
        }
    },

    handleOnOpen: function(){
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
                console.log("shipPosition: "+messageObject.vx+"  "+messageObject.vy);
                break;

            default:
                console.log("hit default "+msg);
                break;
        }
    }

}

