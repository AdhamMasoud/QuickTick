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
  const [completed, setCompleted] = useState({});
    useEffect(() => {
  if (Array.isArray(todos)) {
    const initialCompleted = {};
    todos.forEach(todo => {
      initialCompleted[todo.id] = !!todo.completed;
    });
    setCompleted(initialCompleted);
  }
}, [todos]);
    
    const openEdit= (todo) => {
      setCurrentTodo({ ...todo, daily: todo.daily ?? false }) // Set the todo to be edited
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

          const updatedTodo = {
          ...currentTodo,
          daily: currentTodo.daily ?? false,
          completed: !!completed[currentTodo.id] // Default to false if undefined
          };

      editTodo(currentTodo.id, updatedTodo); // Call editTodo with updated data
      closeEdit(); // Close the popup after editing
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked  } = e.target;
      setCurrentTodo({
        ...currentTodo,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  const handleCardCheckbox = (id) => {
    setCompleted(prev => {
      const newCompleted = {
        ...prev,
        [id]: !prev[id]
      };

      // Find the todo being updated
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        // Call editTodo with updated completed status
        editTodo(id, {
          ...todoToUpdate,
          completed: !prev[id], // new value after toggle
          daily: todoToUpdate.daily ?? false // ensure daily is set
        });
      }

      return newCompleted;
    });
  };
    return (
      
      <div className='CardContainer'>
      {todos.length === 0 ? (
      <p className="noTodos">No Todos</p>) : (
      Array.isArray(todos) ? todos : []).map((todo) => (
        <div key={todo.id} className={`Card${todo.daily ? ' daily' : ''}${completed[todo.id] ? ' checked' : ''}`}>
          <label>
            <input
              type="checkbox"
              className="rounded-checkbox"
              checked={!!completed[todo.id]}
              onChange={() => handleCardCheckbox(todo.id)}
            />
            <span className="custom-checkbox"></span>
          </label>
          <div className='Line'></div>
          <h2>{todo.title}</h2>
          <div>
            <button onClick={() => openEdit(todo)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => delTodo(todo.id)}>
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
                    maxLength="24"
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
                    maxLength="60"
                    value={currentTodo.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                <div className='dailyLabel'>
                  <label htmlFor="daily" style={{display : 'inline-block'}}>Daily</label>
                    <input
                      type="checkbox"
                      id="daily"
                      name="daily"
                      checked={currentTodo.daily || false}
                      onChange={handleInputChange}
                    />
                </div>
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