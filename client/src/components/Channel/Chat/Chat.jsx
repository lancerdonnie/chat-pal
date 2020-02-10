import React, { useState, useEffect } from 'react';
import socket from '../../../socket';

const Chat = props => {
  useEffect(() => {
    setMessages([]);
    socket.emit('joinroom', { name: props.name, room: props.room });
    // socket.on('receivemessage', newMessage => {
    //   setMessages([...messages, newMessage]);
    // });
  }, []);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const handleChange = e => {
    setMessage(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.submit(message);
    setMessage('');
  };
  return (
    <div className='chats'>
      <h4>we are on {props.room} room</h4>
      {props.messages &&
        props.messages.messages.map((el, i) => {
          return <p key={i}>{el}</p>;
        })}
      <form className='chatinp' onSubmit={handleSubmit}>
        <input value={message} onChange={handleChange} type='text' />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default Chat;
