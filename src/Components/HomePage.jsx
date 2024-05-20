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
  }, [location.search]);

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
    reverse: false,
    max: 100,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <div className="flex flex-col-reverse xl:flex-row lg:flex-row md:flex-row sm:flex-col h-screen w-screen">
      <div className="flex justify-center items-center w-full xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full p-4">
        <div className="bg-transparent p-4 w-full max-w-md mx-auto">
          <div className={`flex flex-col items-center mb-8 ${darkMode ? "text-white" : "text-customgrey"}`}>
            <h1 className="text-3xl font-semibold mb-2">JOIN ROOM</h1>
            <p className="text-lg text-center">
              Let's engage and create meaningful connections on this platform.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                Display Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full p-4 border-2 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} focus:outline-none focus:border-black`}
              />
            </div>
            <div>
              <label className={`block text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                Room No.
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                required
                className={`w-full p-4 border-2 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} focus:outline-none focus:border-black`}
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer p-[15px] bg-[#FF713E] border-none text-white text-xl transition duration-300 ease-in-out hover:bg-[#e45622] disabled:cursor-default disabled:bg-[#7c5cbf94] rounded-lg"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center w-full xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full p-4">
        <Tilt options={defaultOptions}>
          <img
            src={darkMode ? s : q}
            alt="SVG"
            className="max-w-full max-h-full object-contain"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </Tilt>
      </div>
    </div>
  );
};

export default HomePage;
