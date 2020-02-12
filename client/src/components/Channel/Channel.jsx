import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Channel.scss';
import Chat from './Chat/Chat';
import AddNewRoom from './AddNewRoom/AddNewRoom';
import {
  addRoom,
  addNewRoom,
  joinToRoom
} from '../../redux/actions/appActions';
import socket from '../../socket';

const Channel = props => {
  useEffect(() => {
    console.log('receive roomies effect');
    if (props.name === null) props.history.push('/');
  }, []);
  const [show, setShow] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [room, setRoom] = useState('');
  const [id, setId] = useState('');
  const makeroom = e => {
    setRoom(e.target.getAttribute('name'));
    //create room with messages store
    setId(e.target.getAttribute('uid'));
    props.addRoom(e.target.getAttribute('uid'));
    setShow(true);
  };
  const handleSubmit = (message, obj) => {
    socket.emit(`sendroommessage`, { message, room: obj });
  };
  return (
    <div>
      <h3>welcome {props.name}</h3>
      {showFab && (
        <AddNewRoom
          name={props.name}
          addNewRoom={props.addNewRoom}
          joinToRoom={props.joinToRoom}
          setShowFab={() => {
            setShowFab(false);
          }}
        />
      )}
      <div className='channel'>
        <div className='online'>
          <h3>Online Users</h3>
          <ul>
            {props.online.map((user, i) => {
              if (user.user === props.name) return;
              return <li key={i}>{user.user}</li>;
            })}
          </ul>
        </div>
        <div className='rooms'>
          <ul>
            {props.roomList.map((x, i) => {
              return (
                <li key={i} name={x.name} uid={x.id} onClick={makeroom}>
                  {x.name}
                  <br />
                  {x.id}
                </li>
              );
            })}
          </ul>
        </div>

        {show && (
          <Chat
            messages={props.rooms.find(rm => rm.room === id)}
            name={props.name}
            room={room}
            obj={props.roomList.find(rm => {
              return rm.id === id;
            })}
            submit={handleSubmit}
          />
        )}
      </div>
      <div
        onClick={() => {
          setShowFab(!showFab);
        }}
        className='fab'
      >
        <i className='fas fa-plus'></i>
      </div>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    name: state.app.name,
    rooms: state.app.rooms,
    roomList: state.app.userRooms,
    online: state.app.online
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    addRoom: room => dispatch(addRoom(room)),
    addNewRoom: (name, room) => dispatch(addNewRoom(name, room)),
    joinToRoom: (name, id, roomName) => {
      dispatch(joinToRoom(name, { id, roomName }));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Channel);
