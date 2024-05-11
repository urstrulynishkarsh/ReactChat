import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Qs from 'qs';
import { io } from 'socket.io-client';
import './HomePage.css'
const HomePage = () => {
const socket = io('wss://reactchat-production-f378.up.railway.app/', { transports: ['websocket'] });
    const navigate=useNavigate();
    const location=useLocation();
    const [formData, setFormData] = useState({
        username: '',
        room: '',
        password:''
    });
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

    const handleSubmit=(e)=>{
        e.preventDefault();
        let path=`chat?username=${formData.username}&room=${formData.room}`
        navigate(path);
    }
    return (
   <div className="w-screen h-screen flex justify-center items-center">
         <div className="centered-form__box">
         <h1 className='text-[2rem] mb-4'>Create a new room</h1>
         <form onSubmit={handleSubmit} >
                    <label>Enter your display name</label>
                    <input
                     className=' w-[100%]  p-[12px] outline-none border-1 border-solid border-gray-300'
                     type="text"
                     name="username"
                     placeholder="Display name"
                     value={formData.username}
                     onChange={handleChange}
                    required/>
                    <label>Please create a room with a name or id which will be used by others to join the chat.</label>
                    <input className='mb-[16px] w-[100%]  p-[12px] outline-none border-1 border-solid border-gray-300' type="text" name="room" placeholder="Room Number /Name"   value={formData.room}
                     onChange={handleChange} required />
                    <label>Create a password which will be used by others to join your chat</label>
                    <input
                     className=' w-[100%]  p-[12px] outline-none border-1 border-solid border-gray-300'
                     type="password"
                     name="password"
                     placeholder="Create Password"
                     value={formData.password}
                     onChange={handleChange}
                    required/>
                    <button className='w-[100%] mt-7 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '>Create</button>

        </form>
         </div>
    </div>

  )
}

export default HomePage