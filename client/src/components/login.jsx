import React, {useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from './TodoContext';




function Login() {
  const { userLogin } = useContext(TodoContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!username) {
        setError('Please enter a username');
        return;}
      if(!password) {
        setError('Please enter a password');
        return;
      }

      const response = await userLogin({ username, password });
      if (!response.success) {
        setError(response.error); // Display the error message from the backend
    } else {
        setError(''); // Clear any previous error
        console.log('User logged in successfully:', response.data);
        // Store the user data in local storage or context if needed
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.user.id); // Store user ID if needed
        // Redirect or perform further actions after successful login
        navigate('/home'); // Redirect to the todos page
    }
  }

    return (
      <div className="Auth">
        <div className="modal-header-auth">
            <h2>Login</h2>
            <p style={{ display: error ? 'block' : 'none', color: 'red', marginLeft: '20px'}}>{error}</p>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="submit" type="submit" onClick={handleSubmit}>Login</button>
            <p>Don't have an account? <a>SignUp</a></p>


        </div>
      </div>
    );
  
}
  export default Login;