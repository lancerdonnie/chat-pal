import React, { useEffect, useState } from 'react';
import './Test.scss';
import socket from '../../socket';
import withMessage from '../../HOC/withMessages';

const Test = props => {
  useEffect(() => {
    setMessages([...messages, props.data]);
  }, [props.data]);
  useEffect(() => {
    socket.emit('joinroom', { name: props.match.params.name, room: 'bees' });
  }, []);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = e => {
    setMessage(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    //send message to server
    // socket.emit('sendmessage', message);
    socket.emit('sendroommessage', { message, room: 'bees' });
    setMessage('');
  };
  return (
    <div>
      <div className='test'>
        {messages.map((el, i) => {
          return <p key={i}>{el}</p>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={message} onChange={handleChange} type='text' />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default withMessage(Test);
