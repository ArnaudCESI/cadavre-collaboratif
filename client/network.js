'use strict';

const server = 'https://cadavres-api.herokuapp.com'

function setDeath(x, y, path, level) {
	$.ajax({
		type:'POST',
		url:server+'/api/cadavres/add', 
		data:{
			x: x,
			y: y,
			path: path,
			level: level,
		}, 
		success: data => {
			console.log(data);
		},
		error: (msg) => {
			console.log('error:'+JSON.stringify(msg));
		}, 
		dataType:'json'
	});
}

/*
getDeaths(deaths => {
	let myDeaths = deaths;
});
*/
function getDeaths(date, level, callback) {
	$.ajax({
		type:'GET',
		url:server+'/api/cadavres', 
		data:{
			date: date,
			level: level,
		}, 
		success: data => {
			console.log(data);
			callback(data);
		},
		error: (msg) => {
			console.log('error:'+JSON.stringify(msg));
		}, 
		dataType:'json'
	});
}

/*
getMap(map => {
	let myMap = map;
});
*/
function getMap(callback, level) {
	$.ajax({
		type:'GET',
		url:server+'/api/map', 
		data:{
			level: level
		}, 
		success: data => {
			console.log(data);
			callback(data);
		},
		error: (msg) => {
			console.log('error:'+JSON.stringify(msg));
		}, 
		dataType:'json'
	});
}