var Colors = {
    RED: "#F00",
    GREEN: "#7CFC00"
}

var Utility = {
    drawFavicon: function(color){
        var canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(16,16,16,0,2*Math.PI);
        ctx.fill();

        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL("image/x-icon");
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}