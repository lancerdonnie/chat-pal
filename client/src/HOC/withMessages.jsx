import React, { useEffect, useState } from 'react';
import socket from '../socket';

//passes on new messages as props
const withMessage = Component => {
  const NewComp = props => {
    const [data, setData] = useState();
    useEffect(() => {
      socket.on('receivemessage', ({ message }) => {
        setData(message);
      });
      socket.on('receiveroommessage', ({ room, message }) => {
        setData(message);
      });
    }, []);
    return <Component data={data} {...props} />;
  };
  return NewComp;
};

export default withMessage;
