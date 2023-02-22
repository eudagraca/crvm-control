import React from "react";
const { useNavigate, Navigate } = require("react-router-dom");

export default function SignOut() {
  const navigate = useNavigate();
  localStorage.clear();
  return <Navigate to="/auth/signin" replace />;
}
