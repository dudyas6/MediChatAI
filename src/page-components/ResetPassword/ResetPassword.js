import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/UI/ErrorMessage';
import { updateUserPassword ,checkResetToken} from '@/controllers/user.controller';
import {toast} from 'react-toastify';


export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const router = useRouter();
  const [message, setMessage] = useState({ text: '', type: '' });
  
  
  const tokenVerification = async (token) =>{
    const response = await checkResetToken(token);
    if(response.success==false){
      router.push("/404");
    }
   }
   
  useEffect(() => {    
    if (router.isReady) {
      const query = router.query.id;
      const parts = query.split("_");
      const token = parts[1];
      tokenVerification(token);

    }

   },[router.isReady, router.query]);

   
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const username = router.query.id;
    const parts = username.split("_");
    // Extract the username
    username = parts[0];
    //update password to this username
    const { success, message: responseMsg } = await updateUserPassword(
      username,
      newPassword
    );
    

    if (success) {
      toast.success("Password Updated Successfully!");
      setTimeout(() => {
        router.push('/login');
      }, 2000); 
    } else {
      setMessage(responseMsg.error);
      setMessage(responseMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Set New Password
        </button>
        <ErrorMessage message={message} />
      </form>
    </div>
  );
}
