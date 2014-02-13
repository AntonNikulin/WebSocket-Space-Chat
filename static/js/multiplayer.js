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
            this.webSocket.send(message)
        }
    },

    handleOnOpen: function(){
        console.log("conn open");
    },

    handleOnMessage: function(msg){
        console.log(msg.data);
    }

}
