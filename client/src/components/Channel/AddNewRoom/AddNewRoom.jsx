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
    setInput('');
  };
  const handleSubmit2 = e => {
    e.preventDefault();
    props.joinToRoom(props.name, input2, input3);
    setInput2('');
  };
  return (
    <div>
      <form className='chatinp' onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} type='text' />
        <button type='submit'>create room</button>
      </form>
      <form className='chatinp' onSubmit={handleSubmit2}>
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
        <button type='submit'>add chat</button>
      </form>
    </div>
  );
};

export default AddNewRoom;
