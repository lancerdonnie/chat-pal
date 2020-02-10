import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Channel.scss';
import Chat from './Chat/Chat';
import { receiveRoomMessage, addRoom } from '../../redux/actions/appActions';
import socket from '../../socket';

const Channel = props => {
  useEffect(() => {
    if (props.name === null) props.history.push('/');
    else {
      props.receiveRoomMessage();
    }
  }, []);
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState('');
  const makeroom = e => {
    setRoom(e.target.getAttribute('name'));
    setShow(false);
    props.addRoom(e.target.getAttribute('name'));
    setShow(true);
  };
  const handleSubmit = message => {
    console.log('1time');
    socket.emit(`sendroommessage`, { message, room });
  };
  return (
    <div>
      <h3>welcome {props.name}</h3>
      <div className='channel'>
        <div className='rooms'>
          <ul>
            <li name='main' onClick={makeroom}>
              main
            </li>
            <li name='bees' onClick={makeroom}>
              bees
            </li>
            <li>mango</li>
            <li>trash</li>
            <li>loyal</li>
          </ul>
        </div>
        {show && (
          <Chat
            messages={props.rooms.find(rm => rm.room === room)}
            name={props.name}
            room={room}
            submit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    name: state.app.name,
    rooms: state.app.rooms
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    receiveRoomMessage: () => dispatch(receiveRoomMessage()),
    addRoom: room => dispatch(addRoom(room))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withRouter(Channel));
