'use strict';

const server = 'http://10.169.130.103:3000'

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

function getDeaths(callback) {
	$.get(server+'/api/cadavres', data => {
		console.log(data);
	});
}

