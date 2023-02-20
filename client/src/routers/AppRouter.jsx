import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import CarIndex from "../views/cars/Index";
import CarCreate from "../views/cars/Create";
import SupplyCreate from "../views/supply/Create";
import SupplyIndex from "../views/supply/Index";
import SignIn from "../views/auth/signin";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import UserCreate from "../views/user/Create";
import UserIndex from "../views/user/Index";
import CarDetails from "../views/cars/Details";
import SupplyDetails from "../views/supply/Details";
import UserDetails from "../views/user/Details";
export function AppRouter() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<App />} />
          <Route path="cars" element={<CarIndex />} />
          <Route path="cars/create" element={<CarCreate />} />
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="supplies/create" element={<SupplyCreate />} />
          <Route path="supplies" element={<SupplyIndex />} />
          <Route path="supplies/:id" element={<SupplyDetails />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/" element={<UserIndex />} />
          <Route path="users/:id" element={<UserDetails />} />
        </Route>
        <Route
          path="/auth/signin"
          element={<PublicRoute component={SignIn} />}
        />
        {/* <PublicRoute exact path="/auth/signin" component={SignIn} /> */}
      </Routes>
    </Router>
  );
}
