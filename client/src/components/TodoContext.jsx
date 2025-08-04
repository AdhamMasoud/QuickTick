import React, { createContext, useState, useEffect } from 'react'; 
// Create a Context for the Todo data
// This will allow us to share the Todo data across components without prop drilling
export const TodoContext = createContext();

// This is a provider component that will wrap around the components that need access to the Todo data
// It will fetch the Todo data from the server and provide it to the components
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
      const token = localStorage.getItem('authToken');
      
        try {
          const response = await fetch('http://localhost:5000/todos/todos',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
          if (!token) {
            console.error('No authentication token found. User may need to log in.');
            return;
          }
          if (!response.ok) {
            if (response.status === 401) { //Handle 401 unauthorized status
                console.error('Invalid or expired authentication token.');
                localStorage.removeItem('authToken'); //Remove the invalid token
                //Redirect the user to the login page.
            } else {
                console.error(`HTTP error! status: ${response.status}`); //Handle other errors
            }
            return;
          }
          const jsonData = await response.json();
          setTodos(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };
      // This useEffect will run once when the component mounts
      // It will fetch the Todo data from the server and set it in the state
      useEffect(() => {
        getTodos();
      }, []);

      const addTodo = async (newTodo) => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch('http://localhost:5000/todos/new', {
            // This is the URL of the server endpoint that will handle adding a new Todo
            method: 'POST',
            headers: {
              // this is the content type of the request
              'Content-Type': 'application/json',
              // Include the token in the Authorization header
              'Authorization': `Bearer ${token}`,
            }, 
            // This is the body of the request, which contains the new Todo data
            body: JSON.stringify({ ...newTodo, userId }),
          });
    
          if (response.ok) {
              console.log('Todo added successfully');
              getTodos(); // Refresh the todos after adding a new one
          } else {
          console.error('Failed to add todo:', response.statusText);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

      const delTodo = async (id) => {
        const token = localStorage.getItem('authToken');

        try{
          if (!token) {
            console.log('Authentication token is missing.');
            // Redirect user to login page or handle unauthenticated request
            return;
          }
          const response = await fetch(`http://localhost:5000/todos/del/${id}`, {
            method: 'DELETE',
            headers: {
              // this is the content type of the request
              'Content-Type': 'application/json',
              // Include the token in the Authorization header
              'Authorization': `Bearer ${token}`,
            }, 
            body: JSON.stringify({ id}), // Include the userId in the request body
          });
          if (response.ok) {
            console.log('Todo deleted successfully');
            getTodos(); // Refresh the todos after deleting one
          } 
          }catch (err) {
            console.error(err.message);
          }
        };

      const editTodo = async (id, updatedTodo) => {
        try {
          const response = await fetch(`http://localhost:5000/todos/edit/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(updatedTodo),
          });
    
          if (response.ok) {
            console.log('Todo updated successfully');
            getTodos(); // Refresh the todos after updating one
          }
        } catch (err) {
          console.error(err.message);
        }
      }
      const userLogin = async (user) => {
        try {
          const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          if (!response.ok) {
            // If the response is not OK, parse the error message
            const error = await response.json();
            return { success: false, error: error.error }; // Return the error message
        }
        
        const data = await response.json();
        return { success: true, data };
        } catch (err) {
          console.error(err.message);
          return { success: false, error: 'Server error' }; // Return a generic server error message
        }
      };

      const userSignup = async (user) => {
        try {
          const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.error };
          }
          
          const data = await response.json();
          return { success: true, data };
        } catch (err) {
          console.error(err.message);
          return { success: false, error: 'Server error' };
        }
      };
    
      return (
        <TodoContext.Provider value={{ todos, addTodo, delTodo, editTodo, userLogin, userSignup, getTodos }}>
          {children}
        </TodoContext.Provider>
      );
    };