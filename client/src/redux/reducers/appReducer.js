const initialState = {
  name: null,
  rooms: [
    { room: 'egg', messages: [] },
    { room: 'fish', messages: [] }
  ]
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT':
      return {
        ...state,
        name: action.payload.name
      };
    case 'ADDROOMMESSAGE':
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

    default:
      return state;
  }
};

export default appReducer;
