import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Loader from "./Components/Loader";
import { DarkModeToggle } from "dark-mode-toggle";

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if it's the initial load or a reload
    const isReload = sessionStorage.getItem("isReloaded");

    if (isReload) {
      // If it's a reload, disable the loader immediately
      setIsLoading(false);
    } else {
      // If it's the initial load, set a flag in sessionStorage and show the loader
      sessionStorage.setItem("isReloaded", "true");

      // Simulate an async operation (e.g., loading data)
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false when done loading
      }, 2000); // Simulate a 2-second loading time (replace with your actual loading logic)
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <BrowserRouter>
          <App />
          <Toaster />
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
