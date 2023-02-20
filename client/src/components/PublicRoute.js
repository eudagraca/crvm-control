import React from "react";
import { Navigate, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

function isAuthenticated() {
  // Get the token from local storage
  const token = localStorage.getItem("user-token");

  // Check if the token exists and is not expired
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.exp > Date.now() / 1000;
  } else {
    return false;
  }
}
export default function PublicRoute({ component: Component }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Component />;
}
