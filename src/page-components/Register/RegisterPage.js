import React, { useState } from "react";
import InputField from "@/components/UI/InputField";
import Checkbox from "@/components/UI/CheckBox";
import { useAuth } from '@/services/auth.service';
import ErrorMessage from "@/components/UI/ErrorMessage";
import medichatLogo from "Assets/Logos/medichat.png";
import { useTheme } from '@/components/Shared/ThemeContext';

function RegisterPage() {
  const { register } = useAuth();
  // const { isDarkMode } = useTheme(); // Access dark mode state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsValue, setTermsValue] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTermsValue(checked);
    } else {
      switch (name) {
        case "username":
          setUsername(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "confirmPassword":
          setConfirmPassword(value);
          break;
        default:
          break;
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMsg = "";

    if (password !== confirmPassword) {
      errorMsg += "Passwords do not match!\n";
    }

    if (!termsValue) {
      errorMsg += "Please accept terms and conditions!\n";
    }

    if (errorMsg !== "") {
      setMessage({ text: errorMsg, type: "error" });
      return;
    }

    const { success, message: error_msg } = await register(username, password);

    if (success) {
      setMessage({ text: error_msg, type: "success" });
    } else {
      setMessage({ text: error_msg.error, type: "error" });
    }
  };
  // ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-50'}
  // ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
  return (
    <section className="">
      <div className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 `}>
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-[-2rem] md:mt-[-4rem]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                  isPasswordVisible={isConfirmPasswordVisible}
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
                  className={`w-full py-3 px-4 text-sm font-semibold rounded focus:outline-none  text-white`}
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
            <ErrorMessage message={message} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
