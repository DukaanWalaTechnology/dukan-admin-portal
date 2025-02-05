// App.tsx
// import React from "react";
import { Routes, Route } from "react-router-dom";
// import { SideBarMenue } from "./SideBarMenue";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import ShopRequest from "./pages/ShopRequest";
import { SideBarMenue } from "./components/SideBarMenue";
import SignUp from "./pages/SignUp";
// import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <Routes>
      {/* Sidebar layout */}
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <SideBarMenue />
          </PrivateRoute>
        }
      >
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop-request" element={<ShopRequest />} />
      </Route>
    </Routes>
  );
};

export default App;
