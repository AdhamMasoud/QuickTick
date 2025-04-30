import React, {useContext, useEffect, useState } from 'react';
import Login from "../components/login.jsx";
import { TodoContext } from '../components/TodoContext.jsx';

function Auth() {
    return (
      <div>
        <Login/>
      </div>
    );
  }
  
  export default Auth;