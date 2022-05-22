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
import Navbar from "./components/Navbar";

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        navigate('/')
        sessionStorage.setItem('authToken', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
        console.log(error)
        if(error.code === 'auth/wrong-password'){
          toast.error('Please check the Password');
        }
        if(error.code === 'auth/user-not-found'){
          toast.error('Please check the Email');
        }
      })
  };
  const authToken = sessionStorage.getItem("authToken");

  return (
    <div className="App">
      {authToken && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route exact path="/login" 
          element={
            <Login
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
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
