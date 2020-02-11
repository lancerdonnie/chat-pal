var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const uuidv4 = require('uuid/v4');

const rooms = [
  { name: 'main', id: uuidv4() },
  { name: 'bees', id: uuidv4() }
];
const users = [{ name: 'jide', rooms: [...rooms] }];

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
// const addRoom=(roomname)
const getUserRooms = name => {
  return users.find(user => {
    return user.name === name;
  }).rooms;
};

io.on('connection', socket => {
  socket.emit('receivemessage', `${socket.id} has connected`);
  socket.on('sendmessage', message => {
    socket.broadcast.emit('receivemessage', message);
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
  socket.on(`sendroommessage`, ({ message, room }) => {
    io.in(room.id).emit(`receiveroommessage`, { room: room.id, message });
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
    console.log(users);
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

http.listen(5000, function() {
  console.log('listening on port 5000');
});
