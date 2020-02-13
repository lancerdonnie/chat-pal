const initialState = {
  name: null,
  rooms: [],
  userRooms: [],
  online: []
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
          x.messages.push({
            message: action.payload.message,
            type: action.payload.type,
            from: action.payload.from
          });
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
    case 'ONLINE':
      return {
        ...state,
        online: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
