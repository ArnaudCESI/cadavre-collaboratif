'use strict';

let canvas;
let ctx;
let width;
let height;
let currentFrame;
let lastTick;
let frameRate;
let deltaTime;
let stopDrawLoop;

let particles;
let obsoleteParticles;

let jumpPressed;
let cadavres;
let player;

let tilesProperties = {
    size: 32
};
let characterProperties = {
    size: 20
}
let levelName = '0';
let offset = {
    x:0,
    y:0,
};
let map;

const CST = {
    PARTICLES: {
        GRAVITY: -0.1,
        SPEED:0.0,
        MAX_SIZE:4,
        ENTROPY: 0.05,
    },
    GRAVITY: 0.5,
    SPEEDLIMIT: 16,
};


function launch() {
    if(!ctx) {
        initCanvas();
    }
    currentFrame = 0;

    particles = [];
    obsoleteParticles = [];

	cadavres = [];
    // launch
    stopDrawLoop = false;

    getMap(function(data){
        map = data;
        map.coord = getMapCoordArray(map);
        map.objects = getMapObjects(map);
        player = initPhysicObject(
            map.objects.begin.x,
            map.objects.begin.y,
            characterProperties.size,
            {x: 0, y:0},
            [
                {
                    dx: characterProperties.size / 2,
                    dy: characterProperties.size / 2
                }
            ]);
    }, levelName);
	

    getNewDeath();

    mainLoop();
}

function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // window events
    window.addEventListener('keypress', keyPressed);
    window.addEventListener('keyup', keyReleased);
    window.onresize = resizeCanvas;

    // canvas size
    width = canvas.width = (window.innerWidth);
    height = canvas.height = (window.innerHeight);
    resizeCanvas();
}


// MAIN LOOP //

function mainLoop() {
    ctx.clearRect(0, 0, width, height);
    //// debug
    ctx.fillStyle = 'white';
    ctx.fillText(
        width+'x'+height+
        ', fps:'+Math.floor(frameRate)+
        ', cf:'+ currentFrame+
        ', key:'+ jumpPressed
        , 50, 50);
    ctx.fillText(
        'offsetx :'+ offset.x +
        ', offsety :'+ offset.y
        , 50, 75);

    // fps
    currentFrame++;
    getFPS();

    // graphics
    if(map) {
        gameFrame();
        drawMap();
        drawEnd(map.objects.end);
        drawCharacter(player);
    }
    if(cadavres) {
        for(let c of cadavres) {
            drawCadavre(c);
        }
    }

    drawParticles();

    if(!stopDrawLoop) {
        requestAnimationFrame(mainLoop);
    }
}

// GAME MECHANICS //
function gameFrame() {
    // player physic
    applyPhysic(player);
}

function onDeath() {
    getNewDeath(new Date());
}

function getNewDeath(date) {
    getDeaths(date, levelName, data=>{
        for(let c of data){
			cadavres.push(c);
			// add to cluster
            addCadavretoCluster(c);
        }
    });
}

// UTILS //
function resizeCanvas() {
    width = canvas.width = (window.innerWidth);
    setTimeout(function() {
        height = canvas.height = (window.innerHeight);
    }, 0);
};


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function min(a1, a2) {
    if(a1<=a2) return a1;
    return a2;
}

function max(a1, a2) {
    if(a1>=a2) return a1;
    return a2;
}

function inbound(x1, y1, x2, y2, size) {
    if(x1 > x2-size/2 && x1 < x2+size/2 &&
        y1 > y2 -size/2 && y1 < y2+size/2) {
        return true;
    }
    return false;
}


function outbound(x,y) {
    if(x<0 || x>width || y<0 || y>height) {
        return true;
    }
    return false;
}


function randomInt(min, max) {
    return Math.floor(Math.random()*max + min);
}


function keyPressed(e) {
    if(e.key == 'z' ||
        e.key == 'ArrowUp' ||
        e.key == ' ') {
        jumpPressed = true;
    }
}

function keyReleased(e) {
    if(e.key == 'z' ||
        e.key == 'ArrowUp' ||
        e.key == ' ') {
        jumpPressed = false;
    }
}

function getFPS() {
    if(!lastTick){
        lastTick = performance.now();
        return;
    }
    deltaTime = (performance.now() - lastTick)/1000;
    lastTick = performance.now();
    frameRate = 1/deltaTime;
}

// PARTICLES //
// public
function drawParticles() {
    for(let i = 0; i<particles.length; i++) {
        // move
        particles[i].diry += CST.PARTICLES.GRAVITY;
        particles[i].x += particles[i].dirx;
        particles[i].y += particles[i].diry;
        particles[i].size -= CST.PARTICLES.ENTROPY;
        // outbound
        if(particles[i].size <= 0 ||
            outbound(particles[i].x, particles[i].y)) {
            obsoleteParticles.push(i);
        }
        // draw
        ctx.beginPath();
        ctx.fillStyle = particles[i].color;
        ctx.fillRect(particles[i].x-offset.x, particles[i].y-offset.y,
            particles[i].size, particles[i].size);
        ctx.fill();
    }
    removeParticles();
}

function addSparkles(x, y, color, size, power) {
    for(let i =0; i<size; i++) {
        addParticle(x, y, color, power);
    }
}

// privates
function removeParticles() {
    for(let i of obsoleteParticles) {
        particles.splice(i, 1);
    }
    obsoleteParticles = [];
}

function addParticle(x, y, color, power) {
    let vector = getRandomVector(CST.PARTICLES.SPEED+power);
    particles.push({
        x: x,
        y: y,
        dirx: vector.x,
        diry: vector.y,
        color: color,
        size: Math.random()*CST.PARTICLES.MAX_SIZE+1,
    });
}

function getRandomVector(magMax) {
    let angle = Math.random() * Math.PI * 2;
    let mag = Math.random() * magMax - magMax;
    return {
        x: Math.cos(angle) * mag,
        y: Math.sin(angle) * mag,
    }
}

function getMapCoordArray(jsonMap) {

    let coordArray = [];

    const jsonData = jsonMap.layers[0].data;

    for (let i = 0; i < jsonData.length; i++){
        if(i%jsonMap.width==0) {
            coordArray[i/jsonMap.width] = [];
        }
        coordArray[(i - i % jsonMap.width) / jsonMap.width][i % jsonMap.width] = jsonData[i];
    }

    return coordArray;
}

function getMapObjects(jsonMap) {
    let objects = {};
    // get objects layers
    for(let layer of jsonMap.layers){
        if(layer.type=='objectgroup') {
            for(let obj of layer.objects) {
                objects[obj.type] = obj;
            }
        }
    }
    return objects;
}