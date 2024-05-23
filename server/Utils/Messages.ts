import {
  GenerateLocationMessageInit,
  GenerateMessageInit,
} from "../types/Message";

const generateMessage: (
  username: string,
  text: string
) => GenerateMessageInit = (username, text) => {
  return {
    username,
    message : text,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMessage: (
  username: string,
  url: string
) => GenerateLocationMessageInit = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};

export { generateMessage, generateLocationMessage };
