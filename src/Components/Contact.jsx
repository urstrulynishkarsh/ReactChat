import React, { useState } from "react";

const ContactPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "ENTER_YOUR_API_KEY", // replace it will api key by entering your email at https://web3forms.com/#start
        }),
      });

      if (response.ok) {
        setStatus("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row md:gap-[140px] gap-6 items-center justify-center p-2 ${darkMode ? 'bg-[#263238]' : 'bg-white'} `}>
      <div className="max-w-xl p-4">
        <h3 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-customgrey'} font-inter`}>Why Contact Us?</h3>
        <p className={`mb-2 text-lg ${darkMode ? 'text-white' : 'text-customgrey'} font-inter`}>
          We value your feedback and suggestions. Your input helps us improve our services and better serve your needs.
        </p>
        <p className={`mb-2 text-lg ${darkMode ? 'text-white' : 'text-customgrey'} font-inter`}>
          Feel free to reach out to us for any queries or support. We are here to assist!
        </p>
        <p className={`mb-2 text-lg ${darkMode ? 'text-white' : 'text-customgrey'} font-inter`}>
          Follow us on our social media channels for the latest updates.
        </p>
      </div>
      <div className={`w-full md:w-1/2 p-4 ${darkMode ? 'bg-[#37474f]' : 'bg-white'} rounded shadow-md max-w-md`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-customgrey'} font-inter`}>Contact Us</h2>
        {status && <p className={`mb-4 ${darkMode ? 'text-white' : 'text-customgrey'} font-inter`}>{status}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} font-inter`}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-3 border ${darkMode ? 'border-gray-600 bg-[#37474f] text-white' : 'border-gray-300 bg-transparent text-black'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-inter`}
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} font-inter`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-3 border ${darkMode ? 'border-gray-600 bg-[#37474f] text-white' : 'border-gray-300 bg-transparent text-black'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-inter`}
            />
          </div>
          <div>
            <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} font-inter`}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`mt-1 block w-full p-3 border ${darkMode ? 'border-gray-600 bg-[#37474f] text-white' : 'border-gray-300 bg-transparent text-black'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-inter`}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md shadow font-inter hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
