var multiplayer ={
    webSocketHost: "ws://localhost:8000/ws",
    webSocket: undefined,

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
        /*switch (messageObject.type) {
            case "chat-message":
                multiplayer.SayHi();
        }
         */
        console.log("msg: "+msg.data);
    }

}

