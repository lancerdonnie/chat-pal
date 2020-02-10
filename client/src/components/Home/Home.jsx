import React, { useState, useEffect } from 'react';
import { submit } from '../../redux/actions/appActions';
import { connect } from 'react-redux';

const Home = props => {
  useEffect(() => {
    if (props.name !== null) {
      props.history.push(`/channel`);
    }
  }, [props.name]);
  const [form, setForm] = useState({
    name: '',
    channel: ''
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
    <div>
      <p>Welcome to chat app</p>
      <p>Please enter your name</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name='name' type='text' />
        {/* <input onChange={handleChange} name='channel' type='text' /> */}
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    // room: state.app.currentRoom
    name: state.app.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(submit(data))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
