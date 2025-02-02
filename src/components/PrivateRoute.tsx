import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const localStoragedata = localStorage.getItem("userdata");

//   console.log(localStoragedata, "token for pr");

  return localStoragedata ? children : <Navigate to="/sign-up" />;
};

export default PrivateRoute;
