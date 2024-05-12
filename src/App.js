import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import AnimatedCursor from "react-animated-cursor";
import { DarkModeToggle } from "dark-mode-toggle";
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";
import {UseAuthProvider} from "./Context/UserAuthContext";
import {PrivateRoute} from "./Components/PrivateRoute";


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
    <div className={`w-screen h-[100vh] ${darkMode ? 'bg-black' : ''} bg-[#ededed] flex flex-col font-inter`}>
    
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

    <button className="flex justify-end absolute xl:top-2 xl:right-48 top-16 right-5 sm:top-2 sm:right-48 md:top-2 md:right-48  lg:top-2 lg:right-48 z-40  " onClick={hanldeDarkMode}>
        {darkMode ? <MdModeNight className="xl:text-7xl lg:text-7xl md:text-7xl sm:text-7xl text-6xl  text-white" />: <WiDaySunny  className=" xl:text-7xl lg:text-7xl md:text-7xl sm:text-7xl text-6xl"/> }
      </button>
        <UseAuthProvider>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="chat" element={
                <PrivateRoute>
                    <ChatPage darkMode={darkMode} setDarkMode={setDarkMode} />
                </PrivateRoute>
            } />
          </Routes>
       </UseAuthProvider>

      </div>
    
  );
}

export default App;
