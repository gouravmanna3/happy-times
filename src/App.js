import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from "./utils/ProtectedRoutes";
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';

function App() {


  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path="/login" 
          element={
            <Login
            />} 
        />
        <Route exact 
          path="/"
          element={
            <ProtectedRoute user='gourav' redirectLink="/login" >
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
