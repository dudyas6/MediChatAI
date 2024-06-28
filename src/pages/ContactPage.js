import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/toastify-custom.css"; // Import custom CSS
import { useTheme } from '../services/ThemeContext';

function ContactPage() {
  const { isDarkMode } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errorMsg = "";

    if (/[^a-zA-Z]/.test(name)) {
      errorMsg += "Name contains invalid characters!\n";
    }

    if (message.length < 5) {
      errorMsg += "Message is too short!\n";
    }

    setMsg(errorMsg);

    if (errorMsg) return;

    const { success, message: responseMsg } = await postContactRequest(name, email, message);

    if (success) {
      toast.success(responseMsg);
    } else {
      setMsg(responseMsg);
    }
  };

  const postContactRequest = async (name, email, message) => {
    try {
      const res = await axios.post("http://localhost:3001/api/contact/x", {
        name,
        email,
        message,
      });
      console.log(res);
      return { success: true, message: "Report created successfully!" };
    } catch (error) {
      return { success: false, message: error.response.data || "An error occurred!" };
    }
  };

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 py-8 dark:bg-gray-900 dark:text-white ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
      <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-[-2rem] md:mt-[-4rem]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Contact Us
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send Message
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              We value your feedback and will get back to you as soon as possible.
            </p>
          </form>
          {msg && (
            <div className={`mt-4 text-sm ${msg.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {msg}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default ContactPage;
