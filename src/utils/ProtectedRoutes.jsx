import React from 'react';
import { Navigate } from "react-router-dom";

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