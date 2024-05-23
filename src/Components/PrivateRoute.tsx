import React, { FC, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/UserAuthContext";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  let username = localStorage.getItem("username");
  let room = localStorage.getItem("room");
  const roomDetail = useAuth()?.roomDetail;

  return room !== null && username !== null ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
