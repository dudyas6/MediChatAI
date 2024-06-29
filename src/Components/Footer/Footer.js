import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#aed4ff] mt-20 p-6 md:px-16">
      <div className="max-w-[1250px] m-auto flex justify-center gap-14 flex-wrap md:flex-nowrap">
      <img width={50} src={null} alt="Logo"/>
        <div className="justify-center font-bold">

          <span className="self-center text-sm sm:text-xl font-semibold whitespace-nowrap dark:text-white">
            MediChat - Your AI Healthcare Consultant
          </span>
          <span className="block text-sm text-gray-500 sm:text-xl sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline">
              MediChat
            </a>
            , All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
