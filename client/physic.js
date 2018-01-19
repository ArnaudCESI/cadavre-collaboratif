'use strict';

let cadavreCluster = [];

function applyPhysic(obj){

    // gravity
    obj.vector.x += obj.gravity.x;
    obj.vector.y += obj.gravity.y;

    //Check collisions
    for(let point of obj.points) {

        if(iscollided(point.dx + obj.x + obj.vector.x, point.dy + obj.y + obj.vector.y)){

            obj.vector.x = 0;
            obj.vector.y = 0;
        }
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

function iscollided(x, y){

    if(map.coord[Math.floor(y / tilesProperties.size)][Math.floor(x / tilesProperties.size)] === 1){
        return true;
    }

    return false;
}