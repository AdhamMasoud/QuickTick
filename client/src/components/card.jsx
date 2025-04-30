import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, {useContext, useEffect, useState } from 'react';
import { TodoContext } from './TodoContext';
function Card() {
  const { todos, delTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [error, setError] = useState('');
  const colors = ['White', 'Red', 'Green', 'Blue', 'Yellow', 'Purple'];
  
    const openEdit= (todo) => {
      setCurrentTodo(todo) // Set the todo to be edited
      setIsEditing(true); // Open the popup
    };

    const closeEdit = () => {
      setIsEditing(false); // Close the popup
      setCurrentTodo(null); // Clear the current todo
    };
    

    const EditSubmit = (e) => {
      e.preventDefault();

      if (!currentTodo.title) {
        setError('Please enter a title');// Alert if title is empty
        return;}

      editTodo(currentTodo.id, currentTodo); // Call editTodo with updated data
      closeEdit(); // Close the popup after editing
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentTodo({ ...currentTodo, [name]: value }); // Update the current todo state
    };

    return (
      <div className='CardContainer'>
      {(Array.isArray(todos) ? todos : []).map((todo) => (
        <div key={todo.id} className="Card">
          <h2>{todo.title}</h2>
          <div>
            <button onClick={() => openEdit(todo)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => delTodo(todo.id , todo.user_id = localStorage.getItem('userId'))}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <p>{todo.description}</p>
        </div>
      ))}
      {isEditing && (
        <div className="EditPopup">
              <div className="modal-header">
                <h2>Edit Todo</h2>
                <button className="CloseBtn" onClick={closeEdit}>
                <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={EditSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentTodo.title}
                    onChange={handleInputChange}
                  />
                  <p style={{ display: error ? 'block' : 'none', color: 'red', marginLeft: '20px'}}>{error}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentTodo.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
            <label className='colorLabel' htmlFor="color">Color</label>
            <select
              id="color"
              name="color" 
              value={currentTodo.color || 'White'}
              onChange={handleInputChange}
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
                <button className="submit" type="submit">
                  Edit Todo
                </button>
              </form>
            </div>
      )}
    </div>
    );
  }
  
  export default Card;

  
  /*
  style={{ backgroundColor: `rgba(${getColorRGBA(todo.color)}` }}

      const getColorRGBA = (color) => {
      const colorMap = {
        White: '255, 255, 255',
        Red: '255, 0, 0',
        Green: '31, 194, 31',
        Blue: '32, 32, 231',
        Yellow: '250, 250, 71',
        Purple: '146, 45, 146',
      };
  
      return colorMap[color] || '255, 255, 255'; // Default to white if color is not found
    };
  */