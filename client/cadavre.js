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

let tilesProperties = {
	size: 32
};

const CST = {
    CONSTANT_TEST: 'test',
    PARTICLES: {
        GRAVITY: -0.1,
        SPEED:0.0,
        MAX_SIZE:4,
        ENTROPY: 0.05,
    },
};


function launch() {   
    if(!ctx) {
        console.log('launching profile blast');
        initCanvas();
    }
    currentFrame = 0;
    
    particles = [];
    obsoleteParticles = [];
    
	// launch
    stopDrawLoop = false;
    draw();
}

function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // window events
	window.addEventListener('keypress', keyPressed);
    window.onresize = resizeCanvas;
	
    // canvas size
	width = canvas.width = (window.innerWidth);
	height = canvas.height = (window.innerHeight);
    resizeCanvas();
}

// MAIN LOOP //

function draw() {
    ctx.clearRect(0, 0, width, height);
	//// debug
    ctx.fillStyle = 'grey';
	ctx.fillRect(5,5,width-10, height-10);
    ctx.fillStyle = 'white';
    ctx.fillText(
        width+'x'+height+', '+
		'fps:'+Math.floor(frameRate)+', cf:'+
        currentFrame, 50, 50);
	
	drawCharacter(50, 100, 100);
	
	drawEnd(300, 100);
	
	drawTile(100, 100);
	drawTile(132, 100);
	drawTile(164, 100);
	//// 
    // fps
	currentFrame++;
	getFPS();
	
	// graphics
	gameFrame();
    drawParticles();
    
	if(!stopDrawLoop) {
        requestAnimationFrame(draw);
    }
}

// GAME MECHANICS //
function gameFrame() {
	
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
    if(e.key == 'q' || e.key == 'ArrowLeft') {
        
    }
    if(e.key == 'd' || e.key == 'ArrowRight') {
        
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
        ctx.fillRect(particles[i].x, particles[i].y, 
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
