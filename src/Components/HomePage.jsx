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

  useEffect(() => {
    const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
    if (room) {
      setFormData({ ...formData, room })
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
    setRoomDetail(formData.username)
    navigate(`chat?username=${formData.username}&room=${formData.room}`);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="centered-form__box">
        <h1 className="text-[2rem]">Join</h1>
        <form onSubmit={handleSubmit}>
          <label>Display name</label>
          <input
            className=" w-[100%]  p-[12px] outline-none border-1 border-solid border-gray-300"
            type="text"
            name="username"
            placeholder="Display name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Room</label>
          <input
            className="mb-[16px] w-[100%]  p-[12px] outline-none border-1 border-solid border-gray-300"
            type="text"
            name="room"
            placeholder="Room"
            value={formData.room}
            onChange={handleChange}
            required
          />
          <button className="w-[100%] cursor-pointer p-[12px] bg-[#7C5CBF] border-none font-[16px]  text-white text-base transition duration-300 ease-in-out hover:bg-[#6b47b8] disabled:cursor-default disabled:bg-[#7c5cbf94] ">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
