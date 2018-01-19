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
	if(!obj) {
		return;
	}
	ctx.save();
	ctx.translate(obj.x+characterProperties.size/2, obj.y+characterProperties.size/2);
	if(state == characterState.JUMPING) {
		ctx.rotate(charSpiningCurrentTick/4);
		charSpiningCurrentTick++;
	}
	ctx.fillStyle = '#FFBBBB';
	graphic.setShadow(10, '#FFBBBB');
	ctx.fillRect(-characterProperties.size/2,
				-characterProperties.size/2, 
				characterProperties.size,
				characterProperties.size);
	graphic.setShadow(5, 'red');
	ctx.fillStyle = 'red',
	ctx.fillRect(-3, -3, 6, 6);
	graphic.setShadow(0);
	ctx.restore();
	
    particles.push({
        x: obj.x+Math.random()*10-5+characterProperties.size/2,
        y: obj.y+Math.random()*10-5+characterProperties.size/2,
        dirx: 0,
        diry: 0,
        color: '#FFBBBB',
        size: Math.random()+1.5,
    });
}

function drawCadavre(x, y, rot, col) {
	ctx.save();
	ctx.translate(x+characterProperties.size/2, y+characterProperties.size/2);
	ctx.rotate(rot);
	ctx.fillStyle = col;
	ctx.fillRect(-characterProperties.size/2, 
					-characterProperties.size/2,
					characterProperties.size,
					characterProperties.size);
	ctx.restore();
}

function drawTile(x, y) {
	ctx.fillStyle = '#4444EE';
	ctx.fillRect(x, y, tilesProperties.size, tilesProperties.size);
}

function drawEnd(x, y) {
	ctx.fillStyle = 'white';
	graphic.setShadow(10, ctx.fillStyle);
	ctx.fillRect(x-20, y-20, 40, 40);
	graphic.setShadow(0);
}

function drawMap(){

	if(!map || !map.coord){

		return;
	}

	for(let i = 0; i < map.height; i++){

        for(let j = 0; j < map.width; j++){

        	if(map.coord[i][j] == 1){

                drawTile(j*tilesProperties.size, i*tilesProperties.size);
			}
		}
	}
}


