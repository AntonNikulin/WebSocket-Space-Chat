var render = {
    //array to store game sprites
    sprites: {},
    drawingSurface: undefined,

    init: function(canvas){
        this.drawingSurface = canvas.getContext("2d");
        this.drawingSurface.font="20px Georgia"

    },

    // render graphics
    render: function(){
        var drawingSurface = this.drawingSurface;
        //Clear previous frame
        drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
        sprites=render.sprites;
        //Loop through all sprites
        if (sprites.length !== 0){
            for(var key in sprites){
                var sprite = sprites[key];

                drawingSurface.save();

                //Rotate the canvas
                drawingSurface.translate(
                    Math.floor(sprite.x + (sprite.width / 2)),
                    Math.floor(sprite.y + (sprite.height / 2))
                );
                //degree to radians
                drawingSurface.rotate(sprite.rotation * Math.PI / 180);

                /* After the  translate  method moves the drawing surface to the sprite’s center point, that point will become the
                drawing surface’s new 0,0 position. That means if you want the sprite to be centered on that point, you have to
                move it half its height upward and half its height to the left.
                */
                drawingSurface.drawImage(
                    shipImage,
                    sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight,
                    Math.floor(-sprite.width/2), Math.floor(-sprite.height/2), sprite.width, sprite.height
                );

                //Draw text
                if (sprite.text){

                    drawingSurface.fillText(sprite.text+" "+sprite.x+"; "+sprite.id, -sprite.width/2, sprite.height);
                };

                //Restore the drawing surface before rotation
                drawingSurface.restore();
            }
        }
    }
}