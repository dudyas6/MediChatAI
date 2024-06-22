import React, { useState, useEffect } from "react";
import medichatLogo from "../assets/logo/medichat.png";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [termsValue, setTermsValue] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!termsValue) {
      alert("Please accept the terms and conditions!");
      return;
    }

    axios
      .post("http://localhost:3001/users/add", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4">
      <div className="bg-white max-w-md w-full mx-auto border border-gray-300 rounded-md p-6">
        <div className="text-center mb-12">
          <span>
            <img src={medichatLogo} alt="logo" className="w-20 inline-block" />
          </span>
        </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Username</label>
              <input
                name="username"
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter confirm password"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onClick={(e) => setTermsValue(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="/"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                  
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="!mt-10">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              onClick={handleSubmit}
            >
              Create an account
            </button>
          </div>
          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </a>
          </p>
          <p className="text-sm mt-6 text-center">
            ErrorDiv
          </p>
      </div>
    </div>
  );
}

export default RegisterPage;
