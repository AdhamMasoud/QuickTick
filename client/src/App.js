import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from './pages/Home'
import Auth from './pages/Auth'
import React, { useState } from 'react';
import { TodoProvider } from './components/TodoContext';
function App() {


  return (
    <div>
    <TodoProvider>
      <HashRouter>
        <Routes>
          <Route index element={<Auth />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </HashRouter>
    </TodoProvider>
    </div>
  );
}

export default App