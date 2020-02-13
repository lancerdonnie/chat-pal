import io from 'socket.io-client';

const socket = io(`http://localhost:${process.env.PORT || 5000}`);

export default socket;
