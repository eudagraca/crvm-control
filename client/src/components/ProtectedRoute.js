import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const userToken = localStorage.getItem("user-token");
  if (!userToken || userToken === "undefined") {
    return false;
  } else {
    const decodedToken = jwt_decode(userToken);
    return decodedToken.exp > Date.now() / 1000;
  }
};

const ProtectedRoute = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;