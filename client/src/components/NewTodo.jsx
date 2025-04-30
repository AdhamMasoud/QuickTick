import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TodoContext } from './TodoContext';
function NewTodo({ closeModal }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('White');
  const [error, setError] = useState('');
  const { addTodo } = useContext(TodoContext);
  const colors = ['White', 'Red', 'Green', 'Blue', 'Yellow', 'Purple'];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title) {
      setError('Please enter a title');
      return;
  }
    const newTodo = { title, description, userId: localStorage.getItem('userId')};
    await addTodo(newTodo);

    // Clear the input fields
    setTitle('');
    setDescription('');

    // Close the modal
    closeModal();
  };

  return (
    <div className="NewTodo">
      <div className="modal-header">
        <h2>New Todo</h2>
        <button className="CloseBtn" onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={25}
          />
          <p style={{ display: error ? 'block' : 'none', color: 'red', marginLeft: '20px'}}>{error}</p>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={90}
          />
        </div>
        <div className="form-group">
    <label className='colorLabel' htmlFor="color">Color</label>
    <select
      id="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    >
      {colors.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>
  </div>
        <button className="submit" type="submit">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default NewTodo;

/*}
<div className="NewTodo">
<div className="modal-header">
  <h2>New Todo</h2>
  <button className='CloseBtn' onClick={closeModal}>
    <FontAwesomeIcon icon={faTimes} />
  </button>
</div>
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      maxLength={25}
    />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      maxLength={90}
    />
  </div>
  <div className="form-group">
    <label className='colorLabel' htmlFor="color">Color</label>
    <select
      id="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    >
      {colors.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>
  </div>

  <button className='submit' type="submit">Create Todo</button>
</form>
</div>
);
*/