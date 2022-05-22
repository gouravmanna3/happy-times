import React from 'react';
import { Navigate, Route, Outlet } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';

function ProtectedRoute({children, redirectLink}) {
  const authToken = sessionStorage.getItem("authToken");
  if (!authToken) {
    return (
      <Navigate to={redirectLink} />
    );
  }

  return <>{children}</>
}

export default ProtectedRoute;