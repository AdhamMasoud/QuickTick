import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function NewTodo({ closeModal }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  const colors = ['White', 'Black', 'Red', 'Green', 'Blue', 'Magenta', 'Yellow']

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to create a new todo (e.g., send a POST request to the server)
    console.log('New Todo:', title);
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
}

export default NewTodo;