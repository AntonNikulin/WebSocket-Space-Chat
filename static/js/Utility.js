var Colors = {
    RED: "#F00",
    GREEN: "#7CFC00"
}

var Utility = {
    drawFavicon: function(color){
        /*Рисует фавикон отпражающий подключение к серверу. Зеленый или красный круг.*/
        var canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        var ctx = canvas.getContext('2d');
        var grd=ctx.createRadialGradient(16,16,2,16,16,16);
        grd.addColorStop(0,color);
        grd.addColorStop(1,"white");

        ctx.fillStyle=grd;
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