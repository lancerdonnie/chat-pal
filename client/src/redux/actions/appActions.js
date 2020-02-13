import socket from '../../socket';
//1
export const submit = data => async dispatch => {
  socket.emit('getonlineusers', { message: data.name });
  dispatch({
    type: 'SUBMIT',
    payload: data
  });
};
//4
export const receiveRoomMessage = () => async (dispatch,getStore) => {
  socket.on(`receiveroommessage`, ({ room, message, from }) => {
    console.log('receiveroommessage');
    dispatch({
      type: 'ADDROOMMESSAGE',
      payload: { room, message, type:getStore().app.name!==from? 'others':"you", from }
    });
  });
};
//3
export const receiveMessage = () => async dispatch => {
  socket.on(`receivemessage`, ({ room, message }) => {
    dispatch({
      type: 'ADDMESSAGE',
      payload: { room, message, type: 'general' }
    });
  });
};
export const getOnline = () => async dispatch => {
  socket.on(`receiveonlineusers`, ({ message }) => {
    console.log(message);
    dispatch({
      type: 'ONLINE',
      payload: message
    });
  });
};
//2
export const getUserRooms = () => async dispatch => {
  socket.on(`userrooms`, rooms => {
    console.log(rooms);
    dispatch({
      type: 'GETUSERROOMS',
      payload: rooms
    });
  });
};

export const addRoom = room => async (dispatch, getStore) => {
  const isRoom = getStore().app.rooms.find(x => {
    return x.room === room;
  });
  if (!isRoom) {
    dispatch({
      type: 'ADDROOM',
      payload: room
    });
  }
};
export const addNewRoom = (name, room) => async dispatch => {
  console.log(name, room);
  socket.emit('addtoroom', { name, roomName: room });
};
export const joinToRoom = (name, room) => async dispatch => {
  console.log(name, room);
  socket.emit('jointoroom', { name, room });
};
