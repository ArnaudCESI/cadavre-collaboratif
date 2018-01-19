'use strict';

const server = 'http://localhost:3000'

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
function getDeaths(date, callback) {
	$.ajax({
		type:'GET',
		url:server+'/api/cadavres', 
		data:{
			date: date
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
function getMap(callback) {
	$.get(server+'/api/map', data => {
		// console.log(data);
		callback(JSON.parse(data));
	});
}