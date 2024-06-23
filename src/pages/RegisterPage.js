import React, { useState } from "react";
import medichatLogo from "../assets/logo/medichat.png";
import InputField from "../components/InputField";
import Checkbox from "../components/CheckBox";
import { useAuth } from "../services/AuthContext";
import { isStrongPassword } from "../services/Utils";

function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [termsValue, setTermsValue] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [IsconfirmPasswordVisible, setIsconfirmPasswordVisible] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTermsValue(checked);
    } else {
      if (name === "username") setUsername(value);
      if (name === "password") setPassword(value);
      if (name === "confirmPassword") setconfirmPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsconfirmPasswordVisible(!IsconfirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var msg = "";

    if (password !== confirmPassword) {
      msg += "Passwords doesn't match!\n";
    }

    // if (!isStrongPassword(password)) {
    //   msg += "Password must be strong!\n";
    // }

    if (!termsValue) {
      msg += "Please accept terms and conditions!\n";
    }

    if (msg !== "") {
      setMessage({ text: msg, type: "error" });
      return;
    }

    const { success, message: error_msg } = await register(username, password);

    if (success) {
      setMessage({ text: error_msg, type: "success" });
    } else {
      setMessage({ text: error_msg, type: "error" });
    }
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4">
      <div className="bg-white max-w-md w-full mx-auto border border-gray-300 rounded-md p-6">
        <div className="text-center mb-12">
          <span>
            <img src={medichatLogo} alt="logo" className="w-20 inline-block" />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <InputField
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter username"
              iconName="user"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              iconName="eye"
              onIconClick={togglePasswordVisibility}
              isPasswordVisible={isPasswordVisible}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Enter confirm password"
              iconName="eye"
              onIconClick={toggleConfirmPasswordVisibility}
              isPasswordVisible={IsconfirmPasswordVisible}
            />
            <Checkbox
              label={
                <>
                  I accept the{" "}
                  <a
                    href="/"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </>
              }
              checked={termsValue}
              onChange={handleChange}
            />
          </div>
          <div className="!mt-10">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Create an account
            </button>
          </div>
        </form>
        <p className="text-sm mt-6 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Login here
          </a>
        </p>
        {message.text && (
          <div
            className={`font-bold text-md mt-6 text-center ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text.split("\n").map((str, index) => (
              <p key={index}>{str}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
