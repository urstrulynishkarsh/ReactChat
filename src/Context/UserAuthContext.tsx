import { createContext, useContext, useState, FC, ReactNode, Context } from "react";
import { UserDetailsInit } from "../../server/types/Users";
import { RoomContext } from "../types/Context";

const userAuthContext = createContext<RoomContext | null>(null);

export function useAuth() {
  return useContext(userAuthContext);
}

const UseAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [roomDetail, setRoomDetail] = useState<UserDetailsInit>({
    username: "",
    room: "",
  });

  return (
    <userAuthContext.Provider value={{ setRoomDetail, roomDetail }}>
      {children}
    </userAuthContext.Provider>
  );
}

export default UseAuthProvider;
