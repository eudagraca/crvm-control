import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const userToken = localStorage.getItem("user-token");
  const user = localStorage.getItem("user-role");
  if (!userToken || userToken === "undefined") {
    return false;
  } else if ((user === "ROLE_ADMIN" || user === "ROLE_MOD") && userToken) {
    const decodedToken = jwt_decode(userToken);
    return decodedToken.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

const ProtectedAdminOrModRoute = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedAdminOrModRoute;
