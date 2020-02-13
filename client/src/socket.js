import io from 'socket.io-client';

const socket = io(`https://lancers-chat-pal.herokuapp.com`);

export default socket;
