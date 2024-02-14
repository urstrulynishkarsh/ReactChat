import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";


function App() {
  
  return (
    <div className="w-screen min-h-screen bg-[#ededed] flex flex-col font-inter ">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
