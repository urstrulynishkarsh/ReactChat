import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Qs from "qs";
import { io } from "socket.io-client";
import "./HomePage.css";
import { useAuth } from "../Context/UserAuthContext";

import q from "../assets/light_svg.svg";
import s from "../assets/svg.svg";
import { Tilt } from "react-tilt";

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
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);

  const { setRoomDetail } = useAuth();
  let localusername = localStorage.getItem("username");
  let localroom = localStorage.getItem("room");
  useEffect(() => {
    const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
    if (room) {
      setFormData({ ...formData, room });
    }

    if (localroom !== null && localusername !== null) {
      setIsJoinedRoom(true);
    }
  }, []);

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

  const backtoOldRoom = () => {
    navigate(`/chat?username=${localusername}&room=${localroom}`);
  };

  return (
    <div className="w-screen h-screen flex  flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-row   relative ">
      <div className="w-1/2   h-full flex  justify-center items-center">
        <div className="xl:h-[35vw] xl:w-[35vw] lg:h-[35vw] lg:w-[35vw]   p-[3px] bg-transparent">
          <h1
            className={`text-[2.5rem] flex justify-center items-center mb-12  font-semibold ${
              darkMode ? "text-white" : "text-customgrey"
            }`}
          >
            JOIN ROOM
          </h1>

          <form onSubmit={handleSubmit} className="w-full">
            <label
              className={`text-[1.1rem] font-semibold ${
                darkMode ? "text-white" : "text-black"
              } `}
            >
              Display Name
            </label>

            <input
              className={`mb-10 w-full  p-[28px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label
              className={`text-[1.1rem] font-semibold  ${
                darkMode ? "text-white" : "text-black"
              } `}
            >
              Room No.
            </label>
            <input
              className={`mb-12 w-full  p-[28px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${
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
              className="w-[100%] cursor-pointer p-[10px] bg-[#FF713E] border-none  text-white text-2xl transition duration-300 ease-in-out hover:bg-[#e45622] disabled:cursor-default disabled:bg-[#7c5cbf94] rounded-lg"
            >
              Join
            </button>
          </form>
          {isJoinedRoom && (
            <button
              onClick={backtoOldRoom}
              className="w-[50%]  mt-5 cursor-pointer p-[3px] bg-[#FF713E] border-none text-[10px] uppercase text-white  text-base md:text-[12px] transition duration-300 ease-in-out hover:bg-[#fb5c00] disabled:cursor-default disabled:bg-[#7c5cbf94] "
            >
              BAck to old Room
            </button>
          )}
        </div>
      </div>

      <div
        className="w-1/2 flex justify-center items-center "
        style={{ paddingRight: "3vw" }}
      >
        <Tilt options={defaultOptions}>
          <img
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
