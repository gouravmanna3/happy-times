import { Routes, Route } from "react-router-dom";

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from "./utils/ProtectedRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import './App.css';

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
