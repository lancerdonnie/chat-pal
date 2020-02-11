const initialState = {
  name: null,
  rooms: [],
  userRooms: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT':
      return {
        ...state,
        name: action.payload.name
      };
    case 'ADDROOMMESSAGE':
    case 'ADDMESSAGE':
      const nState = state.rooms.map(x => {
        if (x.room === action.payload.room) {
          x.messages.push(action.payload.message);
        }
        return x;
      });
      return {
        ...state,
        rooms: nState
      };
    case 'ADDROOM':
      return {
        ...state,
        rooms: [...state.rooms, { room: action.payload, messages: [] }]
      };
    case 'ADDNEWROOM':
      return {
        ...state,
        roomList: [...state.roomList, action.payload]
      };

    case 'GETUSERROOMS':
      return {
        ...state,
        userRooms: action.payload
      };

    default:
      return state;
  }
};

export default appReducer;
