import React, { useState, useEffect } from 'react';
import { submit } from '../../redux/actions/appActions';
import { connect } from 'react-redux';
import socket from '../../socket';
import './Home.scss';

const Home = props => {
  useEffect(() => {
    if (props.name !== null) {
      socket.emit('usrm', props.name);
      props.history.push(`/channel`);
    }
  }, [props.name]);
  const [form, setForm] = useState({
    name: ''
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.submit(form);
  };
  return (
    <div className='home'>
      <h2>Welcome to chat app</h2>
      <p>Please enter your name</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name='name' type='text' />
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    name: state.app.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(submit(data))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
