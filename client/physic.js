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
			//let col = getCollisionDistance(point.dx + obj.x, point.dy + obj.y, obj.vector, ori, obj);
            let col = getCollisionDistance(point, ori, obj);
			if(col) {
				obj.vector.x = col.x;
				obj.vector.y = col.y;
			}
		}
    }

    // stop the "slooooow" momentum
    if(Math.abs(obj.vector.x) < CST.AUTOMATIC_RUN_ACC) {
        obj.vector.x = 0;
    }
    
    //Check limite
	obj.vector.x = constrain(obj.vector.x, -CST.SPEEDLIMIT.X, CST.SPEEDLIMIT.X);
	obj.vector.y = constrain(obj.vector.y, -CST.SPEEDLIMIT.Y, CST.SPEEDLIMIT.Y);

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
function getCollisionDistance(point, orientation, obj){
	if(orientation == ORI.BOTTOM) {
        let xModifier = point.dx>0?-1:1;
		if(isCollided(point.dx + obj.x + xModifier,(point.dy + obj.y)+obj.vector.y)) {
			jumpAmount = 1; // reset jumps
			obj.state = characterState.DEFAULT;
			return {
				x: obj.vector.x,
				y: Math.floor((point.dy + obj.y+obj.vector.y)/32) * 32 - (point.dy + obj.y),
			};			
		} else {
			obj.state = characterState.JUMPING;
		}
	} else if(orientation == ORI.RIGHT) {
		if(isCollided(point.dx + obj.x+obj.vector.x,point.dy + obj.y-1)) {
			return {
				x: Math.floor((point.dx + obj.x+obj.vector.x)/32) * 32 - (point.dx + obj.x),
				y: obj.vector.y,
			};			
		}
	} else if(orientation == ORI.TOP) {
		if(isCollided(point.dx + obj.x,point.dy + obj.y+obj.vector.y)) {
			return {
				x: obj.vector.x,
				y: Math.floor((point.dy + obj.y+obj.vector.y)/32) * 32 + 32 - point.dy + obj.y,
			};			
		}
	} else if(orientation == ORI.LEFT) {
		if(isCollided(point.dx + obj.x+obj.vector.x,point.dy + obj.y-1)) {
			return {
				x: Math.floor((point.dx + obj.x+obj.vector.x)/32) * 32 + 32- (point.dx + obj.x),
				y: obj.vector.y,
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
