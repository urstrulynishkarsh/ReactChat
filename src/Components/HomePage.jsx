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
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="w-[400px] h-[400px] bg-white p-6 rounded-md shadow-lg flex flex-col items-center">
        <h1 className="text-2xl mb-6">Join</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Display name</label>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded outline-none"
            type="text"
            name="username"
            placeholder="Display name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label className="block mb-2 font-medium">Room</label>
          <input
            className="w-full p-3 mb-6 border border-gray-300 rounded outline-none"
            type="text"
            name="room"
            placeholder="Room"
            value={formData.room}
            onChange={handleChange}
            required
          />
          <button className="w-full p-3 bg-[#18454E] text-white rounded-full hover:bg-[#28717F] disabled:bg-[#7c5cbf94]">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
