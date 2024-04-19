import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import AnimatedCursor from "react-animated-cursor";
import { DarkModeToggle } from "dark-mode-toggle";
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";


function App() {
    // Retrieve dark mode state from local storage or default to false
    const [darkMode, setDarkMode] = useState(() => {
      const savedDarkMode = localStorage.getItem("darkMode");
      return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
  
    // Update local storage when dark mode state changes
    useEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);


  const hanldeDarkMode=()=>{
    setDarkMode(!darkMode);
  }
  
  return (
    <div className={`w-screen min-h-screen ${darkMode ? 'bg-black' : ''} bg-[#ededed] flex flex-col font-inter`}>
    
      <div className="App">
      <AnimatedCursor 
        innerSize={8}
        outerSize={8}
        color='193, 11, 111'
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link'
        ]}
      />
    </div>

    <button className="flex justify-end absolute translate-x-40 z-40 " onClick={hanldeDarkMode}>
        {darkMode ? <MdModeNight className="text-7xl text-white" />: <WiDaySunny  className=" text-7xl"/> }
      </button>
  
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="chat" element={<ChatPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>

      </div>
    
  );
}

export default App;
