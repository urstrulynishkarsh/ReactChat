import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import AnimatedCursor from "react-animated-cursor";


function App() {
  
  return (
    <div className="w-screen min-h-screen bg-[#ededed] flex flex-col font-inter ">
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
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
