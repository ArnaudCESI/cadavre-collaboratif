'use strict';

const characterState = {
	DEFAULT: 0,
	JUMPING: 1,
}

let charSpiningCurrentTick = 0;

let graphic = (function(){
	
	function setShadow(size, color) {
		ctx.shadowBlur = size;
		if(color) ctx.shadowColor = color;
	}
	
	return {
		setShadow
	}
})();

/*
state:
	-DEFAULT (default): standing still
	-JUMPING: is in the air
*/
function drawCharacter(obj) {
	ctx.save();
	ctx.translate(obj.x+obj.size/2-offset.x, obj.y+obj.size/2-offset.y);
	if(obj.state == characterState.JUMPING) {
		ctx.rotate(charSpiningCurrentTick/4);
		charSpiningCurrentTick++;
	}
	ctx.fillStyle = '#FFBBBB';
	graphic.setShadow(10, '#FFBBBB');
	ctx.fillRect(-obj.size/2,
				-obj.size/2, 
				obj.size,
				obj.size);
	graphic.setShadow(5, 'red');
	ctx.fillStyle = 'red',
	ctx.fillRect(-3, -3, 6, 6);
	graphic.setShadow(0);
	ctx.restore();
	
    particles.push({
        x: obj.x+Math.random()*10-5+obj.size/2,
        y: obj.y+Math.random()*10-5+obj.size/2,
        dirx: 0,
        diry: 0,
        color: '#FFBBBB',
        size: Math.random()+1.5,
    });
}

function drawCadavre(cadavre) {
	ctx.save();
	ctx.translate(cadavre.x+characterProperties.size/2-offset.x, cadavre.y+characterProperties.size/2-offset.y);
	ctx.rotate(cadavre.rot);
	ctx.fillStyle = cadavre.color;
	ctx.fillRect(-characterProperties.size/2, 
					-characterProperties.size/2,
					characterProperties.size,
					characterProperties.size);
	ctx.restore();
}

function drawTile(x, y) {
	ctx.fillStyle = '#4444EE';
	ctx.fillRect(x-offset.x, y-offset.y, tilesProperties.size, tilesProperties.size);
}

function drawEnd(end) {
	ctx.fillStyle = 'white';
	graphic.setShadow(10, ctx.fillStyle);
	ctx.fillRect(end.x-end.width/2-offset.x, end.y-end.height/2-offset.y, 
	end.width, end.height);
	graphic.setShadow(0);
}

function drawMap(){
	let startTileX = Math.floor(offset.x/tilesProperties.size);
	let startTileY = Math.floor(offset.y/tilesProperties.size);
	
	for(let i = max(0, startTileY) ; i < min(Math.floor(startTileY+height/tilesProperties.size)+1, map.height); i++){

        for(let j = max(0, startTileX) ; j < min(Math.floor(startTileX+width/tilesProperties.size)+1, map.width); j++){

        	if(map.coord[i][j] == 1){
                drawTile(j*tilesProperties.size, i*tilesProperties.size);
			}
		}
	}
}


