const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});
const PORT = 8080;
const DATA_COLLECTION = [];

//APP
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.use('/',express.static(__dirname + '/'));
server.listen(PORT,function(){console.log(`Listening on ${ PORT }`)});


//SOCKET
io.sockets.on('connection',function(socket){
	
	//USER CONNECT
	console.log('A socket has connected to the server');
	
	//USER SEND
	socket.on('main_data',function(data){
		console.log(data);
		DATA_COLLECTION.push(data);
		socket.emit('main_data_collection',DATA_COLLECTION);
		
	});
	
	//USER DISCONNECT
	socket.on('disconnect',function(){
		console.log("A user has disconnected to the server");
	});
	
	setInterval(function(){socket.emit('main_data_collection',DATA_COLLECTION);},1000);
	
});

