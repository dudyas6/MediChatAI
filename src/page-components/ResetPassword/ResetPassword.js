import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/resetpassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await res.json();
    console.log(data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
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
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Set New Password
      </button>
    </form>
  </div>
  );
}
