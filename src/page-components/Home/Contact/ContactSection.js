import React, { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.module.css";
import contactImage from "@/assets/Images/contactImage.png"
import Image from "next/image"
import { postContactRequest } from "@/controllers/contact.controller";

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
      setMsg(responseMsg);
    }
  };

  return (
    <SectionWrapper id="contact">
      <h2 className="mb-10 text-4xl font-bold text-center">Contact Us!</h2>
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-5">
        <div className="lg:min-w-[345px]">
          <div className='dark:bg-gray-600 bg-white font-[sans-serif] max-w-6xl mx-auto relative shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4'>
            <div className="absolute w-20 h-20 bg-blue-400 rounded-full -bottom-6 -left-6"></div>
            <div className="absolute w-20 h-20 bg-blue-400 rounded-full -top-6 -right-6"></div>

            <div className="grid gap-8 px-6 py-8 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src={contactImage}
                  width="400 px"
                  height="400 px"
                  alt=""
                  className="w-5/6 shrink-0"
                />
              </div>

              <form className="rounded-tl-3xl rounded-bl-3xl" onSubmit={handleSubmit}>
                <h2 className="mb-6 text-2xl font-bold text-center">
                  Let us know what you think!
                </h2>
                <div className="relative max-w-md mx-auto space-y-3">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Name"
                    className='w-full px-4 py-3 text-sm rounded-md dark:text-black dark:bg-gray-200 bg-background outline-blue-600 focus-within:bg-transparent'
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email"
                    className='w-full px-4 py-3 text-sm rounded-md dark:text-black dark:bg-gray-200 bg-background outline-blue-600 focus-within:bg-transparent'
                    onChange={handleChange}
                  />
                  <textarea
                    placeholder="Message"
                    name="message"
                    id="message"
                    required
                    rows="6"
                    className='w-full px-4 py-3 text-sm rounded-md dark:text-black dark:bg-gray-200 bg-background outline-blue-600 focus-within:bg-transparent'
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
                      className="inline mr-2"
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
                  <p className="self-center font-bold text-center text-red-600 dark:text-red-500">{msg}</p>
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
