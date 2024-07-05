/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;
