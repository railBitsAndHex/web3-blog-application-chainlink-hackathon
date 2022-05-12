import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link  } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext"
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <div className="App">
        <Link to="/login">Login Page</Link>
      </div>
    </AuthProvider>
  );
}

export default App;