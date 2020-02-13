import React, { useState, useEffect, useRef } from 'react';
import socket from '../../../socket';
import './Chat.scss';

const Chat = props => {
  const messagesEndRef = useRef();
  useEffect(() => {
    socket.emit('joinroom', { name: props.name, room: props.obj });
  }, [props.room]);
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const [message, setMessage] = useState('');
  const handleChange = e => {
    setMessage(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.submit(message, props.obj);
    setMessage('');
  };

  return (
    <div className='chats'>
      <h4>You are in {props.room} chat</h4>
      {props.messages &&
        props.messages.messages.map((el, i) => {
          let styles;
          if (el.type === 'general') {
            styles = 'style1';
          } else if (el.type === 'others') {
            styles = 'style2';
          } else {
            styles = 'style3';
          }
          return (
            <p key={i} className={styles}>
              <span>{el.message}</span>
              {el.from && el.from !== props.name && <span>-{el.from}</span>}
            </p>
          );
        })}
      <div ref={messagesEndRef} />
      <form className='chatinp' onSubmit={handleSubmit}>
        <input value={message} onChange={handleChange} type='text' />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default Chat;
