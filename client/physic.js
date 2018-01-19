'use strict';

let cadavreCluster = [];

function applyPhysic(obj){

    // gravity
    obj.vector.x += obj.gravity.x;
    obj.vector.y += obj.gravity.y;


    for(let point of obj.points) {

    }

    //Check limite
    if(obj.vector.x > CST.SPEEDLIMIT){
        obj.vector.x = CST.SPEEDLIMIT;
    }

    if(obj.vector.x < -CST.SPEEDLIMIT){
        obj.vector.x = -CST.SPEEDLIMIT;
    }

    if(obj.vector.y > CST.SPEEDLIMIT){
        obj.vector.y = CST.SPEEDLIMIT;
    }

    if(obj.vector.y < -CST.SPEEDLIMIT){
        obj.vector.y = -CST.SPEEDLIMIT;
    }

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
    return {
        x: x,
        y: y,
        size: size,
        vector: vector,
        points: points,
        gravity: {
            x:0,
            y: CST.GRAVITY
        }
    }
}

function addCadavretoCluster(cadavre) {
	
}