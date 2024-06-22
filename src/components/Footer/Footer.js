import React from "react";

const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto md:py-4">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
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
