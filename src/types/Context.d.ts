import { UserDetailsInit } from "../../server/types/Users";

export interface RoomContext {
  setRoomDetail: React.Dispatch<React.SetStateAction<UserDetailsInit>>;
  roomDetail: UserDetailsInit;
}
