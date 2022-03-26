import React, { useContext } from 'react';
import './App.css';
import Login from './component/Login/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './component/Register/Register';
import Dashboard from "./component/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
