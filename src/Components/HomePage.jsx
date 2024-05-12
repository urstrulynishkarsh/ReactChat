import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Qs from "qs";
import { io } from "socket.io-client";
import "./HomePage.css";
import { useAuth } from "../Context/UserAuthContext";

const HomePage = () => {
  const socket = io("wss://reactchat-production-f378.up.railway.app/", {
    transports: ["websocket"],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    room: "",
  });

  const { setRoomDetail } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomDetail(formData.username)
    navigate(`chat?username=${formData.username}&room=${formData.room}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[470px]">
        <div className="bg-white p-10 rounded-xl shadow-md border-gray-50">
          <h1 className="text-4xl font-bold text-center">Welcome to ChatApp!</h1>
          <p className="font-medium text-lg text-gray-500 mt-2 text-center">The effortless way to chat is here</p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <label>Display name</label>
              <input
                className='w-full border border-gray-300 p-3 rounded-xl bg-transparent py-3'
                type="text"
                name="username"
                placeholder="Display name"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <div className="mt-4 mb-8">
                <label>Room</label>
                <input
                  className='w-full border border-gray-300 p-3 rounded-xl bg-transparent py-3'
                  type="text"
                  name="room"
                  placeholder="Room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="w-[100%] rounded-xl cursor-pointer p-[12px] bg-[#7C5CBF] border-none font-[16px]  text-white text-base transition duration-300 ease-in-out hover:bg-[#6b47b8] disabled:cursor-default disabled:bg-[#7c5cbf94] ">
                Enter Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
