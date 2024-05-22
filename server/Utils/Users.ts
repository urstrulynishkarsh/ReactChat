import { StatusInit, UserInit } from "../types/Users";

// first we create an empty array of users
const users: UserInit[] = [];

// add user into the users array
const addUser: ({ id, username, room }: UserInit) => StatusInit = ({
  id,
  username,
  room,
}) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      status: false,
      error: "Username and room are required!",
      user: {
        username: "NA",
        room: "NA"
      },
    };
  }

  // check for existing User
  const existingUser = users?.find((user) => {
    if (user?.room === room && user?.username === username) {
      return true;
    } else {
      return false;
    }
  });

  // validate
  if (existingUser) {
    return {
      status: false,
      error: "UserName is in Used",
      user: {
        username: "NA",
        room: "NA"
      },
    };
  }

  // push into the array
  const user = { id, username, room };
  users.push(user);
  return { status: true, error: "", user };
};

// remove user by id
const removeUser: (id: number) => UserInit | null = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  return null;
};

// getuser by id
const getUser: (id: number) => UserInit | undefined = (id) => {
  return users.find((user) => user.id === id);
};

// getUsersInRoom by room

const getUsersInRoom: (room: string) => UserInit[] = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

export { addUser, removeUser, getUser, getUsersInRoom };
