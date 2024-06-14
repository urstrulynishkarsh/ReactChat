import { ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/UserAuthContext";

export function PrivateRoute({ children }) {
  let username = localStorage.getItem("username");
  let room = localStorage.getItem("room");
  const { roomDetail } = useAuth();

  return room !== null && username !== null ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
}
