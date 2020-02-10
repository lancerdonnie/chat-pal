import socket from '../../socket';

export const submit = data => async dispatch => {
  dispatch({
    type: 'SUBMIT',
    payload: data
  });
};
export const receiveRoomMessage = data => async dispatch => {
  socket.on(`receiveroommessage`, ({ room, message }) => {
    console.log(message, room);
    dispatch({
      type: 'ADDROOMMESSAGE',
      payload: { room, message }
    });
  });
};
export const addRoom = room => async (dispatch, getStore) => {
  console.log('adding room');
  const isRoom = getStore().app.rooms.find(x => {
    return x.name === room;
  });
  if (!isRoom) {
    dispatch({
      type: 'ADDROOM',
      payload: room
    });
  }
};
