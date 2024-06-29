import React, { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "Assets/Style/toastify-custom.css"; // Import custom CSS

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value); // Corrected here
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMsg = "";

    if (/[^a-zA-Z]/.test(name)) {
      errorMsg += "Name contains invalid characters!\n";
    }

    if (message.length < 5) {
      errorMsg += "Message is too short!\n";
    }

    setMsg(errorMsg);

    if (errorMsg) return;

    const { success, message: responseMsg } = await postContactRequest(
      name,
      email,
      message
    );

    if (success) {
      toast.success(responseMsg);
    } else {
      setMsg(responseMsg.error);
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
      return { success: true, message: "Message sent, we'll be soon in touch!" };
    } catch (error) {
      return {
        success: false,
        message: error.response.data || "An error occurred!",
      };
    }
  };

  return (
    <SectionWrapper id="contact">
      <h2 className="text-4xl font-bold text-center mb-10">Contact Us!</h2>
      <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-5">
        <div className="lg:min-w-[345px]">
          <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-blue-400"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400"></div>

            <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
              <div className="text-center flex flex-col items-center justify-center">
                <img
                  src="https://readymadeui.com/signin-image.webp"
                  alt=""
                  className="shrink-0 w-5/6"
                />
              </div>

              <form className="rounded-tl-3xl rounded-bl-3xl" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-6">
                  Let us know what you think!
                </h2>
                <div className="max-w-md mx-auto space-y-3 relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Name"
                    className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email"
                    className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                    onChange={handleChange}
                  />
                  {/* <input
                    type="email"
                    placeholder="Phone No."
                    className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                  /> */}
                  <textarea
                    placeholder="Message"
                    name="message"
                    id="message"
                    required
                    rows="6"
                    className="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-blue-600 focus-within:bg-transparent"
                    onChange={handleChange}
                  >

                  </textarea>

                  <button
                    type="submit"
                    className="text-white w-full relative bg-blue-500 hover:bg-blue-700 rounded-md text-sm px-6 py-3 !mt-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      fill="#fff"
                      className="mr-2 inline"
                      viewBox="0 0 548.244 548.244"
                    >
                      <path
                        fillRule="evenodd"
                        d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                        clipRule="evenodd"
                        data-original="#000000"
                      />
                    </svg>
                    Send Message
                  </button>
                  <p className="self-center text-center font-bold text-red-600">{msg}</p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SectionWrapper>
  );
}

export default ContactSection;
