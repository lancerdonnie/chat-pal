var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const rooms = [];

io.on('connection', socket => {
  socket.emit('receivemessage', `${socket.id} has connected`);
  socket.on('sendmessage', message => {
    socket.broadcast.emit('receivemessage', message);
  });
  socket.on('joinroom', ({ name, room }) => {
    socket.join(room);
    socket.emit('receivemessage', `you have joined room ${room}`);
    io.to(room).emit('receivemessage', `${name} has just joined room ${room}`);
    if (rooms.includes(room)) {
    } else {
      rooms.push(room);
    }
    socket.on(`sendroommessage`, ({ message, room }) => {
      console.log(message);
      io.in(room).emit(`receiveroommessage`, { room, message });
    });
  });
});

http.listen(5000, function() {
  console.log('listening on port 5000');
});
