'use strict';

let cadavreCluster = [];
const ORI = {
	BOTTOM: 1,
	RIGHT: 0,
	TOP: 3,
	LEFT: 2,
};

function applyPhysic(obj){

    // gravity
    obj.vector.x += obj.gravity.x;
    obj.vector.y += obj.gravity.y;

    //Check collisions
    for(let point of obj.points) {
		for(let ori of point.orientations) {
			let col = getCollisionDistance(point.dx + obj.x, point.dy + obj.y, obj.vector, ori, obj);
			if(col) {
				obj.vector.x = col.x;
				obj.vector.y = col.y;
			}
		}
    }

    //Check limite
	obj.vector.x = constrain(obj.vector.x, -CST.SPEEDLIMIT, CST.SPEEDLIMIT);
	obj.vector.y = constrain(obj.vector.y, -CST.SPEEDLIMIT, CST.SPEEDLIMIT);

    obj.x += obj.vector.x;
    obj.y += obj.vector.y;
}


/*

points:
[
    dx, // difference sur x par rapport au point de ref
    dy, //                y
]
 */
function initPhysicObject(x, y, size, vector, points) {
    let o = {
        x: x,
        y: y,
        size: size,
        vector: vector,
        points: points,
        gravity: {
            x: 0,
            y: CST.GRAVITY
        }
    };
	physicObjects.push(o);
	return o;
}

function addCadavretoCluster(cadavre) {

}

/*
return false if no collision next tick.
return distance between collision point and point otherwise , as a vector (.x, .y)
*/
function getCollisionDistance(x, y, vector, orientation, obj){
	if(orientation == ORI.BOTTOM) {
		if(isCollided(x-1,y+vector.y)) {
			jumpAmount = 1; // reset jumps
			obj.state = characterState.DEFAULT;
			return {
				x: vector.x,
				y: Math.floor((y+vector.y)/32) * 32 - y,
			};			
		} else {
			obj.state = characterState.JUMPING;
		}
	} else if(orientation == ORI.RIGHT) {
		if(isCollided(x+vector.x,y-1)) {
			return {
				x: Math.floor((x+vector.x)/32) * 32 - x,
				y: vector.y,
			};			
		}
	} else if(orientation == ORI.TOP) {
		if(isCollided(x,y+vector.y)) {
			return {
				x: vector.x,
				y: Math.floor((y+vector.y)/32) * 32 + 32 - y,
			};			
		}
	} else if(orientation == ORI.LEFT) {
		if(isCollided(x+vector.x,y-1)) {
			return {
				x: Math.floor((x+vector.x)/32) * 32 + 32- x,
				y: vector.y,
			};			
		}
	}
	return false;
}

function isCollided(x, y){
	// out of bound
	if(x<0 || y<0 || x/tilesProperties.size>map.width || y/tilesProperties.size>map.height) {
		return false;
	}
	// tiles
    if(map.coord[Math.floor(y / tilesProperties.size)][Math.floor(x / tilesProperties.size)] === 1){
        return true;
    }

    return false;
}
