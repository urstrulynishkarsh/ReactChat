import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Qs from "qs";
import { io } from "socket.io-client";
import "./HomePage.css";
import { useAuth } from "../Context/UserAuthContext";

import q from "../assets/light_svg.svg"
import s from "../assets/svg.svg"

const HomePage = ({darkMode}) => {

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
 


  return (


  <div className="w-screen h-screen flex relative ">
    <div className="w-1/2  h-full flex justify-center items-center">
      <div className="centered-form__box  ">
        <h1 className={`text-[2.5rem] flex justify-center items-center mb-12  font-semibold ${darkMode ? 'text-white':'text-customgrey'}`}>JOIN ROOM</h1>
        <form onSubmit={handleSubmit} className="w-full h-full">
          <label className={`text-[1.1rem] font-semibold ${darkMode ? 'text-white': 'text-black'} `}>Display Name</label>

          <input
            className={`mb-10 w-full  p-[28px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${darkMode ? 'text-white':'text-black'}`}
            type="text"
            name="username"
            
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label className={`text-[1.1rem] font-semibold  ${darkMode ? 'text-white': 'text-black'} `}>Room No.</label>
          <input
            className={`mb-12 w-full  p-[28px] outline-none border-2 border-solid border-pure-greys-300 rounded-lg bg-transparent text-2xl ${darkMode ? 'text-white':'text-black'}`}
            type="text"
            name="room"
            
            value={formData.room}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-[100%] cursor-pointer p-[28px] bg-[#FF713E] border-none  text-white text-2xl transition duration-300 ease-in-out hover:bg-[#e45622] disabled:cursor-default disabled:bg-[#7c5cbf94] rounded-lg">
            Join
          </button>
        </form>
       
      </div>
      </div>

    <div className="w-1/2 flex justify-center items-center " style={{paddingRight: '3vw'}}>
   <img src={darkMode ? s :q } alt="svgimage not found" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
   </div>
  </div>
);
  
};

export default HomePage;
