var Blueprints = {
     shipObject:{
        //Movements
        //rotation: degree
        rotation: 0,

        //velocity
        vx: 0,
        vy: 0,

        //position of source image in sprite
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 35,
        sourceHeight: 37,

        //position of the sprite on the canvas
        x: 0,
        y: 0,
        width: 35,
        height: 37,

        //text which displayed under the ship
        text: "SHiP",

        id: undefined,

        setPosition: function(obj){
            this.x = obj.x;
            this.y = obj.y;
        }
     },

    Background: {

    }
}
