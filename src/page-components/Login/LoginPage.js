import React, { useState } from "react";
import InputField from "@/components/UI/InputField";
import { useAuth } from "@/components/Services/AuthContext";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { useRouter } from 'next/router';
// import { useTheme } from '@/my-components/Services/ThemeContext';

function LoginPage() {
  const { login } = useAuth();
  // const { isDarkMode } = useTheme(); // Access dark mode state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message: error_msg } = await login(username, password);
    if (success) {
      setMessage({ text: error_msg, type: "success" });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      setMessage({ text: error_msg.error, type: "error" });
    }
  };
  // ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
  // ${isDarkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}
  return (
    <div className={`font-sans `}>
      <div className="sm:mt-20  min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 bg-white items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
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
              </div>
              <div className="!mt-10">
                <button
                  type="submit"
                  className={`w-full py-3 px-4 text-sm font-semibold rounded focus:outline-none  text-black`}
                >
                  Login
                </button>
              </div>
              <ErrorMessage message={message} />
            </form>
          </div>
          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
