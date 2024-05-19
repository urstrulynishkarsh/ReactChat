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

  const { setRoomDetail } = useAuth();

  useEffect(() => {
    const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
    if (room) {
      setFormData({ ...formData, room });
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

  return (
    <div className="w-screen h-screen flex flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-row relative">
  <div className="w-full xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full h-auto mx-auto my-8 py-8 px-4 flex justify-center items-center">
    <div className="form xl:h-[35vw] xl:w-[35vw] lg:h-[35vw] lg:w-[35vw] p-[3px] bg-transparent">
      <div
        className={`flex flex-col items-center mb-12 ${
          darkMode ? "text-white" : "text-customgrey"
        }`}
      >
        <h1 className="join text-[2.5rem] font-semibold mb-4">JOIN ROOM</h1>
        <p className="text-lg">
          Let's engage and create meaningful connections on this platform.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="input w-full h-full">
        <label
          className={`text-[1.1rem] font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Display Name
        </label>
        <input
          className={`mb-8 w-full p-[15px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-white text-xl ${
            darkMode ? "text-white" : "text-black"
          } focus:border-black`}
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
          className={`mb-8 w-full p-[15px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-white text-xl ${
            darkMode ? "text-white" : "text-black"
          } focus:border-black`}
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full cursor-pointer p-[15px] bg-[#FF713E] border-none text-white text-xl transition duration-300 ease-in-out hover:bg-[#e45622] disabled:cursor-default disabled:bg-[#7c5cbf94] rounded-lg"
        >
          Join
        </button>
      </form>
    </div>
  </div>

  <div className="w-full xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full flex justify-center items-center">
    <Tilt options={defaultOptions}>
      <img
        className="image-class max-w-full max-h-full"
        src={darkMode ? s : q}
        alt="svgimage not found"
        style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
      />
    </Tilt>
  </div>
</div>

  );
};

export default HomePage;
