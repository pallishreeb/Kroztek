import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuthApi } from "../context/authState";

const ProtectedRoute = ({ element }) => {
  // const { user } = useAuthApi();
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!token && !userString) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
