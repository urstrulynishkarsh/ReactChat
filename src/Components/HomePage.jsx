import React, { useEffect, useState , useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Qs from "qs";
import { io } from "socket.io-client";
import "./HomePage.css";
import { useAuth } from "../Context/UserAuthContext";
import q from "../assets/light_svg.svg";
import s from "../assets/svg.svg";
import { Tilt } from "react-tilt";
import audio from '../assets/sparkle_sound.mp3';

const HomePage = ({ darkMode }) => {
  const socket = io("wss://reactchat-production-f378.up.railway.app/", {
    transports: ["websocket"],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    room: "",
  });


  const audioRef = useRef(new Audio(audio));

 
  // Mickey Mouse Clock function -----------------------------------------
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fortuneMessage, setFortuneMessage] = useState();
  const [initial_message] = useState("Hover over Micky Mouse🐭 for a surprise Fortune !!!!!")
  // Fortune messages array
  const fortunes = [
    "You will have a great day!",
    "Good news is coming your way!",
    "You will find what you are looking for!",
    "Happiness is around the corner!",
    "Expect the unexpected!",
  ];

  const { setRoomDetail } = useAuth();

  useEffect(() => {
    const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
    if (room) {
      setFormData((prevData) => ({ ...prevData, room }));
    }
  }, [location.search]);

  // Timer function for clock------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  // Change fortune message on hover
  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setFortuneMessage(fortunes[randomIndex]);
    audioRef.current.play(); 
  };

  const handleMouseLeave = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setFortuneMessage(initial_message);
  };



  // ------------------------------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", formData.username);
    localStorage.setItem("room", formData.room);
    setRoomDetail({ username: formData.username, room: formData.room });
    navigate(`chat?username=${formData.username}&room=${formData.room}`);
  };

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 100, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  // Clock Feature or user interactive functionality addition.----------------------------------------------
  // functionality addition by -- Black shadow

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // ------------------------------------------------------

  return (
    <div className="w-screen h-screen flex flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-row relative">
      <div className="w-1/2 h-full flex justify-center items-center flex-col">
        {/*----------------------- Micky Mouse positioned at the top of the title ---------------------------- */}
        {/* Mickey Mouse digital clock */}
        <div  className="mickey-clock-container"  data-fortune={fortuneMessage}>

          <div 
            className="mickey-clock"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="ears left-ear"></div>
            <div className="ears right-ear"></div>
            <div className="face">
              <div className="time">{formatTime(currentTime)}</div>
            </div>
          </div>
        </div>
        <div className="initial-message" style={{ animation: 'initial-message-animation 5s infinite' }} >
          {initial_message}
        </div>
        {/*------------------------- thus it is overlapping with the dark theme thats why positioned at the top of the title --------------- */}

        <div className="form xl:h-[35vw] xl:w-[35vw] lg:h-[35vw] lg:w-[35vw] p-[3px] bg-transparent">
          <h1
            className={`join text-[2.5rem] flex justify-center items-center mb-12 font-semibold ${
              darkMode ? "text-white" : "text-customgrey"
            }`}
          >
            JOIN ROOM
          </h1>
          <form onSubmit={handleSubmit} className="input w-full h-full">
            <label
              className={`text-[1.1rem] font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Display Name
            </label>

            <input
              className={`mb-10 w-full p-[28px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label
              className={`text-[1.1rem] font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Room No.
            </label>
            <input
              className={`mb-12 w-full p-[28px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
              type="text"
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-[100%] cursor-pointer p-[28px] bg-[#FF713E] border-none text-white text-2xl transition duration-300 ease-in-out hover:bg-[#e45622] disabled:cursor-default disabled:bg-[#7c5cbf94] rounded-lg"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="img w-1/2 flex justify-center items-center" style={{ paddingRight: "3vw" }}>
        <Tilt options={defaultOptions}>
          <img
            className="image-class"
            src={darkMode ? s : q}
            alt="svgimage not found"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Tilt>
      </div>
    </div>
  );
};

export default HomePage;
