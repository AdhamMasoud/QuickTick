import React, {useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from './TodoContext';

function Login() {
  const { userLogin, userSignup, getTodos } = useContext(TodoContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username) {
      setError('Please enter a username');
      return;
    }
    if(!password) {
      setError('Please enter a password');
      return;
    }

    const response = isLogin 
      ? await userLogin({ username, password })
      : await userSignup({ username, password });

    if (!response.success) {
      setError(response.error);
    } else {
      setError('');
      console.log(`User ${isLogin ? 'logged in' : 'signed up'} successfully:`, response.data);
      localStorage.setItem('authToken', response.data.token);
      if (response.data.user) {
        localStorage.setItem('userId', response.data.user.id);
      }
      getTodos();
      navigate('/home');
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="Auth">
      <div className="left-content">
        <h1 className='webTitle'>Welcome to QuickTick</h1>
        <p className='Intro'>Stay organized, stay ahead.
          QuickTick helps you manage your tasks effortlessly whether it's a quick reminder or your entire day's plan. Log in and start ticking things off!</p>
      </div>
      <div className="modal-header-auth">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <p style={{ display: error ? 'block' : 'none', color: 'red', marginLeft: '20px'}}>{error}</p>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
               document.querySelector('input[type="password"]').focus();
            }
          }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(e);
              }
          }}
        />
        <button className="submit" type="submit" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a onClick={toggleMode}>{isLogin ? 'Sign Up' : 'Login'}</a>
        </p>
      </div>
    </div>
  );
}

export default Login;