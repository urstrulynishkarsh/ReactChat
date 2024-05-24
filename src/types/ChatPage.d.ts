export interface DataInit {
  status: number;
}

export interface MessageInit {
  username: string;
  message: string;
  createdAt: string | number;
}

export type USERS = {
  username: string;
};

export interface RoomUserInit {
  room: string;
  users: USERS | USERS[];
}

export interface TypingInit {
  isTyping: boolean;
  data: string;
}

export interface DarkModeInit {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}