var multiplayer ={
    webSocketHost: "ws://localhost:8000/ws",
    webSocket: undefined,

    init : function(){
        this.webSocket = new WebSocket(this.webSocketHost);
        this.webSocket.onopen = multiplayer.handleOnOpen;
        this.webSocket.onmessage = multiplayer.handleOnMessage;
    },

    handleOnOpen: function(){
        console.log("conn open");
    },

    handleOnMessage: function(msg){
        console.log(msg.data);
    }

}
