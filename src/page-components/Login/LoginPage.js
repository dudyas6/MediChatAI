import React, { useState } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import { findExistingUser } from '@/controllers/user.controller';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/UI/ErrorMessage';
import InputField from '@/components/UI/InputField';
import { sendEmail } from '@/controllers/contact.controller';
import { toast } from 'react-toastify';

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const { success, message: error_msg } = await login(username, password);
    setLoading(false); // End loading

    if (success) {
      toast.success(error_msg);
      setMessage({ text: error_msg, type: 'success' });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      setMessage({ text: error_msg.error, type: 'error' });
    }
  };

  const handleForgotPassword = async () => {
    if (username === '') {
      setMessage({
        text: 'Enter Username in order to continue!',
        type: 'error',
      });
      return;
    }

    const response = await findExistingUser(username);
    if (response.success) {
      sendEmail(response.user);
      toast.success('An email has been sent to you!');
    } else {
      toast.error("User does not exist!");
    }
  };

  return (
    <div className="font-sans bg-white dark:bg-gray-800">
      <div
        className={`sm:mt-20 min-h-screen flex flex-col items-center justify-center`}
      >
        <div className="dark:bg-gray-300 bg-white grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg">
          <div className="w-full px-4 py-4 md:max-w-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
            <p className="mb-6 text-center">
              Please fill in your login information to access your account.
            </p>
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
                  type={isPasswordVisible ? 'text' : 'password'} // Toggle password visibility
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  iconName="eye"
                  onIconClick={togglePasswordVisibility}
                />
              </div>
              <div className="flex justify-between mt-4">
                <a
                  href="/register"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Sign up
                </a>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleForgotPassword();
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className={`w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                        />
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
              <ErrorMessage message={message} />
            </form>
          </div>
          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="object-contain w-full h-full"
              alt="Sign In Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
