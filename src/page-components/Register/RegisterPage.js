import React, { useState } from 'react';
import InputField from '@/components/UI/InputField';
import Checkbox from '@/components/UI/CheckBox';
import { useAuth } from '@/controllers/auth.controller';
import medichatLogo from '@/assets/Logos/medichat.png';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Image from 'next/image';

function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsValue, setTermsValue] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setTermsValue(checked);
    } else {
      switch (name) {
        case 'username':
          setUsername(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'confirmPassword':
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!termsValue) {
      toast.error('Please accept terms and conditions!');
      return;
    }

    const { success, message: error_msg } = await register(
      username,
      email,
      password
    );

    if (success) {
      console.log(error_msg);
      toast.success(error_msg);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      toast.error(error_msg);
    }
  };

  return (
    <section className="min-h-screen dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="mb-12 text-center">
              <span>
                <Image src={medichatLogo} alt="logo" width={300} height={80} />
              </span>
            </div>
            <div>Please fill the infromation below</div>
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
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  iconName="envelope"
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
                      I accept the{' '}
                      <a
                        href="/"
                        className="ml-1 font-semibold text-blue-600 hover:underline"
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
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Create an account
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-center">
              Already have an account?{' '}
              <a
                href="/login"
                className="ml-1 font-semibold text-blue-600 hover:underline"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
