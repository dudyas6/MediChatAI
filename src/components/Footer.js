import React from "react";
import medichatLogo from "../assets/logo/medichat.png";

const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto md:py-4">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={medichatLogo}
              class="h-8"
              alt="Medichat Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MediChat - Your AI Healthcare Consultant
            </span>
          </a>
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="/" class="hover:underline">
            MediChat
          </a>
           , All Rights Reserved.
        </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
