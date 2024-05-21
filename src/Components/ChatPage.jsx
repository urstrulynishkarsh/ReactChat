import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router";
import MessageTemplate from "./MessageTemplate";
import LocationTemplate from "./LocationTemplate";
import Swal from "sweetalert2";
import Mustache from "mustache";
import moment from "moment";
import Qs from "qs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import MobileMenu from "./MobileMenu";
import ShareBox from "./ShareBox";
import { FaMicrophone, FaShare } from "react-icons/fa";
import MicroPhone from "./MicroPhone";
import Avatar from 'react-avatar';

// const socket = io('ws://localhost:8080/', { transports: ['websocket'] });

// wss://reactchat-production-f378.up.railway.app/
// dev mode http://localhost:5000
const socket = io("wss://reactchat-production-f378.up.railway.app/", {
  transports: ["websocket"],
});

const ChatPage = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesContainerRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isMicOpen, setMicOpen] = useState(false);

  const [micHide, setMicHide] = useState(false);
  const [showShareBox, setShowShareBox] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [iamTyping, setIamTyping] = useState(false);
  const typingTimeOut = useRef();
  const [userTyping, setUserTyping] = useState({
    isTyping: false,
    data: "",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Options
  // this will work only if there is ? mark in url
  const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // useEffect(() => {
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from the server');
  //     navigate('/');
  //   });

  //   return () => {
  //     socket.off('disconnect');
  //   };
  // }, []);

  useEffect(() => {
    const localusername = localStorage.getItem("username");
    const localroom = localStorage.getItem("room");

    if (localusername !== username || localroom !== room) {
      return navigate("/");
    }
    socket.emit("join", { username, room }, (data) => {
      if (!data.status) {
        // Display popup if the user is already in a room
        Swal.fire({
          title: "Already in Room",
          text: "You are already in a room. Redirecting to home page...",
          icon: "info",
          showConfirmButton: false,
          timer: 2000, // Adjust the timer as needed
          willClose: () => {
            navigate("/"); // Redirect to home page
          },
        });
        // console.log("new part")
      } else {
        setHasError(false);
        toast.success(`${username} joined the room!`);
      }
    });
  }, []);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: message.username,
          message: message.text,
          createdAt: moment(message.createdAt).format("h:mm a"),
        },
      ]);
      scrollToBottom();
    });

    socket.on("locationMessage", (message) => {
      console.log(messages);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: message.username,
          url: message.url,
          createdAt: moment(message.createdAt).format("h:mm a"),
        },
      ]);
      scrollToBottom();
    });

    socket.on("roomData", ({ room, users }) => {
      setUsers(users);
      console.table(users);
      console.log("room", room);
    });

    return () => {
      socket.off("message");
      socket.off("locationMessage");
      socket.off("roomData");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    if (message.trim() === "") {
      return;
    }
    socket.emit("sendMessage", message, (error) => {
      if (error) {
        console.log(error);
      } else {
        setInputMessage("");
        setTypingUsers([]);
        console.log("Message delivered!");
      }
    });
  };

  const handleTyping = (e) => {
    setInputMessage(e.target.value);
    const message = e.target.value.trim();

    if (!iamTyping) {
      socket.emit("START_TYPING");
      setIamTyping(true);
    }

    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);

    typingTimeOut.current = setTimeout(() => {
      socket.emit("STOP_TYPING");
      setIamTyping(false);
    }, [500]);
  };

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        "sendLocation",
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        () => {
          console.log("Location shared!");
        }
      );
    });
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleTypingStart = (data) => {
      setUserTyping({
        ...userTyping,
        isTyping: true,
        data,
      });
    };

    const handleTypingStop = (data) => {
      // console.log("STOP TYPING>>>", data);
      setUserTyping({
        ...userTyping,
        isTyping: false,
        data: "",
      });
    };

    // Add event listeners when component mounts
    socket?.on("USER_TYPING_START", handleTypingStart);
    socket?.on("STOP_USER_TYPING", handleTypingStop);

    // Clean up event listeners when component unmounts
    return () => {
      socket?.off("USER_TYPING_START", handleTypingStart);
      socket?.off("STOP_USER_TYPING", handleTypingStop);
    };
  }, [socket]);

  // window.onbeforeunload = function () {
  //   // This string won't actually be shown in modern browsers, but returning it triggers the confirmation dialog
  //   return "Do you really want to leave?";
  // };

  function handleDisconnectConfirmation() {
    Swal.fire({
      title: "Disconnect Chat",
      text: "Are you sure you want to disconnect from the chat?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (socket) {
          localStorage.clear("username");
          localStorage.clear("room");
          socket.disconnect(); // Disconnect the socket connection
          console.log("Disconnected from the chat server!");
          window.location.href = "/";
        } else {
          console.log("No active chat connection to disconnect.");
        }
      }
    });
  }

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicHide(true);
      return;
    }
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("Speech recognition service has started");
      setMicOpen(true);
    };

    recognition.onaudioend = () => {
      console.log("Audio capturing ended");
      setMicOpen(false);
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      console.log(currentTranscript);
      setMicOpen(false);
      setInputMessage((prev) => prev + currentTranscript);
    };

    recognition.start();
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-[250px] h-[100vh] hidden xl:block lg:block md:block sm:block   bg-[#6674cc] items-center text-white  rounded-md bg- border ">
        <h2
          className="font-normal text-[20px] bg-[#eae4f6] text-richblack-900 p-[24px] flex items-center justify-between"
          onClick={() => {
            setShowShareBox(true);
          }}
        >
          ROOM NO: {room}
          <FaShare className="text-[#6674cc] ml-2" size={30} />
        </h2>
        <h3
          className="font-[500px] text-[18px] mb-[4px]"
          style={{ padding: "12px 24px 0 24px" }}
        >
          Users
        </h3>
        <ul className="users">
          {users.map((user, index) => (
            <div
              key={index}
              className="ml-2"
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "5px",
                margin:'10px',
              }}
            >
              <Avatar
                size={40}
                name={user.username}
                round={true}
              />
              <div>
                {user.username}
                <div
                  style={{
                    color: "#2ecc71",
                   fontWeight:'800'
                  }}
                >
                  Online
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div
        className=" flex  flex-col brosize  max-h-screen"
        style={{ flexGrow: 1 }}
      >
        <div
          id="messages"
          className=" overflow-y-auto "
          ref={messagesContainerRef}
          style={{
            flexGrow: 1,
            padding: "12px 24px 0 24px",
            overflowAnchor: "bottom",
          }}
        >
          <div className="right-8 absolute top-3 ">
            <div className=" flex">
              <button className="mr-4 sm:hidden" onClick={toggleMenu}>
                {isMenuOpen ? (
                  /* If menu is open, display close icon */
                  <AiOutlineClose
                    className="w-10    rounded-md bg-headText py-[2px] transition-all duration-300"
                    fontSize={50}
                    fill="#AFB2BF"
                  />
                ) : (
                  /* If menu is closed, display menu icon */
                  <AiOutlineMenu
                    className="w-10  rounded-md bg-headText py-[2px] transition-all duration-300"
                    fontSize={50}
                    fill="#AFB2BF"
                  />
                )}
              </button>
              <button
                onClick={handleDisconnectConfirmation}
                className="focus:outline-none relative  focus:ring-2 focus:ring-brand focus:ring-offset-2 cursor-pointer rounded-md bg-brand text-[#fff] bg-[#6674cc] border-brand font-rubik xl:text-lg border px-6 h-12 py-2 flex items-center gap-3 text-lg lg:h-[4rem]"
              >
                Disconnect
              </button>
            </div>
          </div>

          {messages.map((msg, index) =>
            msg.url ? (
              <LocationTemplate
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                key={index}
                username={msg.username}
                createdAt={msg.createdAt}
                url={msg.url}
              />
            ) : (
              <MessageTemplate
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                key={index}
                username={msg.username}
                createdAt={msg.createdAt}
                message={msg.message}
              />
            )
          )}
        </div>
        {userTyping.isTyping && (
          <p className="pl-4 text-[#6674cc] font-bold">{userTyping.data}</p>
        )}

        <div className="compose">
          <form
            id="message-form"
            className="flex items-center"
            onSubmit={handleSubmit}
          >
            <input
              name="message"
              placeholder="Message"
              className="rounded-lg"
              value={inputMessage}
              onChange={handleTyping}
              required
            />
            {!micHide && (
              <FaMicrophone
                size={40}
                className={`m-2 mr-3 ${
                  darkMode ? "text-white" : "text-pure-greys-600"
                }`}
                onClick={startListening}
              />
            )}
            <button
              type="submit"
              className="focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 cursor-pointer rounded-md bg-brand text-[#fff] bg-[#6674cc] border-brand font-rubik xl:text-lg border xl:px-6 lg:px-6 md:px-6 sm:px-6 h-12 py-2 flex items-center gap-3 text-lg lg:h-[4rem]"
            >
              Send
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <desc></desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="10" y1="14" x2="21" y2="3"></line>
                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg>
            </button>
          </form>
          <button
            id="send-location"
            onClick={handleSendLocation}
            className="focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 cursor-pointer rounded-md bg-brand text-[#fff] bg-[#6674cc] border-brand font-rubik xl:text-lg border xl:px-6 lg:px-6 md:px-6 sm:px-6 h-12 py-2 flex items-center gap-3 text-lg lg:h-[4rem]"
          >
            Send location
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <desc></desc>
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="10" y1="14" x2="21" y2="3"></line>
              <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"></path>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu users={users} room={room} darkMode={darkMode} />
      )}
      {showShareBox && (
        <ShareBox
          showShareBox={setShowShareBox}
          link={`https://reactchatio.vercel.app?room=${room}`}
        />
      )}
      {isMicOpen && <MicroPhone />}
    </div>
  );
};

export default ChatPage;
