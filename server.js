var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const uuidv4 = require('uuid/v4');
const path = require('path');

const rooms = [{ name: 'General', id: uuidv4() }];
const users = [{ name: 'test', rooms: [...rooms] }];
let online = [];

const checkUser = name => {
  return users.some(user => {
    return user.name === name;
  });
};
const checkRoom = (name, room) => {
  users.forEach(user => {
    if (user.name === name) {
      const isRoom = user.rooms.find(rm => {
        return rm.id === room.id;
      });
      if (!isRoom) user.rooms.push({ name: room.roomName, id: room.id });
    }
  });
};
const getUserRooms = name => {
  return users.find(user => {
    return user.name === name;
  }).rooms;
};

io.on('connection', socket => {
  // socket.on('sendmessage', ({ message }) => {
  //   online.push({ user: message, id: socket.id });
  //   io.emit('receivemessage', {
  //     message: online
  //   });
  // });

  socket.on('getonlineusers', ({ message }) => {
    online.push({ user: message, id: socket.id });
    io.emit('receiveonlineusers', {
      message: online
    });
  });
  socket.on('disconnect', () => {
    online = online.filter(user => {
      return user.id !== socket.id;
    });
    socket.broadcast.emit('receivemessage', {
      message: online
    });
  });
  socket.on('joinroom', ({ name, room }) => {
    socket.join(room.id);
    socket.emit('receivemessage', {
      message: `you have joined room ${room.name}`
    });
    io.to(room.id).emit('receivemessage', {
      room: room.id,
      message: `${name} has just joined room ${room.name}`
    });
  });
  socket.on(`sendroommessage`, ({ message, room, from }) => {
    io.in(room.id).emit(`receiveroommessage`, {
      room: room.id,
      message,
      from
    });
  });
  //2.register new user room
  socket.on('addtoroom', ({ name, roomName }) => {
    users.forEach(user => {
      if (user.name === name) {
        user.rooms.push({ name: roomName, id: uuidv4() });
      }
    });
    let usRooms = getUserRooms(name);
    socket.emit('userrooms', usRooms);
  });
  //join existing user room
  socket.on('jointoroom', ({ name, room }) => {
    checkRoom(name, room);
    let usRooms = getUserRooms(name);
    socket.emit('userrooms', usRooms);
  });
  //1.get user rooms
  socket.on('usrm', name => {
    const isUser = checkUser(name);
    if (isUser) {
      let usRooms = getUserRooms(name);
      socket.emit('userrooms', usRooms);
    } else {
      users.push({ name, rooms: [...rooms] });
      let usRooms = getUserRooms(name);
      socket.emit('userrooms', usRooms);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

http.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
