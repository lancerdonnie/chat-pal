import React, { useState } from 'react';

const AddNewRoom = props => {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleChange2 = e => {
    setInput2(e.target.value);
  };
  const handleChange3 = e => {
    setInput3(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.addNewRoom(props.name, input);
    props.setShowFab();
    setInput('');
  };
  const handleSubmit2 = e => {
    e.preventDefault();
    props.joinToRoom(props.name, input2, input3);
    props.setShowFab();
    setInput2('');
  };
  return (
    <div className='newroom'>
      <form className='chatinp2' onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} type='text' />
        <button type='submit'>Create channel</button>
      </form>
      <form className='chatinp3' onSubmit={handleSubmit2}>
        <input
          placeholder='enter room id'
          value={input2}
          onChange={handleChange2}
          type='text'
        />
        <input
          placeholder='enter preferred name'
          value={input3}
          onChange={handleChange3}
          type='text'
        />
        <button type='submit'>Add chat</button>
      </form>
      <i onClick={props.setShowFab} className='fas fa-times'></i>
    </div>
  );
};

export default AddNewRoom;
