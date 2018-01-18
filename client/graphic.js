'use strict';

function drawCharacter(x, y, life) {
	ctx.fillStyle = 'pink';
	ctx.fillRect(x-10, y-10, 20, 20);
	ctx.fillStyle = 'red',
	ctx.fillRect(x-3, y-3, 6, 6);
}

function drawTile(x, y) {
	ctx.fillStyle = 'blue';
	ctx.fillRect(x, y, tilesProperties.size, tilesProperties.size);
}

function drawEnd(x, y) {
	ctx.fillStyle = 'purple';
	ctx.fillRect(x-20, y-20, 40, 40);
	ctx.fillStyle = 'pink';
	ctx.fillRect(x-3, y-3, 6, 6);
}