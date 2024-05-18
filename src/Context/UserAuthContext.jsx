import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

const userAuthContext = createContext();

export function useAuth() {
  return useContext(userAuthContext);
}

export function UseAuthProvider({ children }) {
  const [roomDetail, setRoomDetail] = useState({
    username: "",
    room: "",
  });

  return (
    <userAuthContext.Provider value={{ setRoomDetail, roomDetail }}>
      {children}
    </userAuthContext.Provider>
  );
}
