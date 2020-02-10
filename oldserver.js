var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const users = [];
const channels = [];

io.on('connection', socket => {
  socket.emit('welcome', 'Welcome to Chat App');
  //receive user data
  socket.on('join', data => {
    //adds name and creates room
    //joins room
    console.log(data);
    const isUser = users.some(x => {
      return x.id === socket.id;
    });
    if (!isUser) {
      users.push({ id: socket.id, name: data.name });
    } else {
    }
    if (!channels.includes(data.channel)) {
      channels.push(data.channel);
    }
    socket.emit('data', { id: socket.id, name: data.name });
    socket.join(data.channel);
    //broadcast that user joined
  });

  socket.on('sendmessage', ({ id, channel, message }) => {
    const user = users.find(x => {
      return x.id === id;
    });
    console.log(id, channel, message);
    socket.to(channel).emit('message', { user, message });
  });
});

http.listen(5000, function() {
  console.log('listening on port 3000');
});
