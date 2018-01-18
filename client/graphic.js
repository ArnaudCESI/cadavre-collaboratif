'use strict';

let graphic = (function(){
	
	function setShadow(size, color) {
		ctx.shadowBlur = size;
		if(color) ctx.shadowColor = color;
	}
	
	return {
		setShadow
	}
})();

function drawCharacter(x, y, life) {
	ctx.fillStyle = 'pink';
	graphic.setShadow(10, 'pink');
	ctx.fillRect(x-10, y-10, 20, 20);
	graphic.setShadow(5, 'red');
	ctx.fillStyle = 'red',
	ctx.fillRect(x-3, y-3, 6, 6);
	graphic.setShadow(0);
    particles.push({
        x: x+Math.random()*20-10,
        y: y+Math.random()*20-10,
        dirx: 0,
        diry: 0,
        color: 'pink',
        size: Math.random()+0.1+1,
    });
}

function drawTile(x, y) {
	ctx.fillStyle = '#4444EE';
	graphic.setShadow(5, ctx.fillStyle);
	ctx.fillRect(x, y, tilesProperties.size, tilesProperties.size);
	graphic.setShadow(0);
}

function drawEnd(x, y) {
	ctx.fillStyle = 'white';
	graphic.setShadow(10, ctx.fillStyle);
	ctx.fillRect(x-20, y-20, 40, 40);
	graphic.setShadow(0);
}
