import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Qs from "qs";
import { io } from "socket.io-client";
import "./HomePage.css";
import { useAuth } from "../Context/UserAuthContext";
import { Tilt } from "react-tilt";

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
    <div className="w-screen h-screen flex justify-center items-center">
      <Tilt options={defaultOptions}>
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
          {isJoinedRoom && (
            <button
              onClick={backtoOldRoom}
              className="w-[50%] mt-5 cursor-pointer p-[3px] bg-[#7C5CBF] border-none text-[10px] uppercase text-white  text-base md:text-[12px] transition duration-300 ease-in-out hover:bg-[#6b47b8] disabled:cursor-default disabled:bg-[#7c5cbf94] "
            >
              BAck to old Room
            </button>
          )}
        </div>
      </Tilt>
    </div>
  );
};

export default HomePage;
