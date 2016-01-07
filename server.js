var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var val = 0, playmap = {};

io.on('connection', function(socket){
  // socket.broadcast.emit('a user connected');
	var clientIpAddress = socket.request.socket.remoteAddress;
	var sid = socket.client.id;

	if (playmap[clientIpAddress]) {
		socket.emit('initial', 'welcome back ' + sid);
		playmap[clientIpAddress].sid = sid;
	} else {
		socket.emit('initial', 'welcome  ' + sid);
		playmap[clientIpAddress] = { sid:sid, val:val };
	}

	console.log(playmap); // Debugging open socket connections
	
  socket.on('action', function(val) {
  	console.log('val', val);
  	io.emit('action', val + 1);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});