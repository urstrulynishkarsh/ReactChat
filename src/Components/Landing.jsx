import React from 'react'
import { useNavigate } from "react-router-dom";
import './HomePage.css'
const Landing = () => {
    let navigate = useNavigate(); 
    const gotocreate = () =>{ 
    let path = `/createroom`; 
    navigate(path);
  }
    const gotojoin = () =>{ 
    let path = `/joinroom`; 
    navigate(path);
  }
  return (
    <>
        <div className="containner">
        <div className="create">
        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={gotocreate}
        >
            Create a new room
        </button>
        </div>
        <div className="join">
        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={gotojoin}
        >
            Join an existing room
        </button>
        </div>
        </div>
    </>
  )
}

export default Landing