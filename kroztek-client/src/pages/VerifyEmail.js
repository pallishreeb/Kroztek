import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../context/authState';  // Adjust path if necessary

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { verifyEmail, forgotPassword } = useAuthApi();
  const [form, setForm] = useState({ email: '', verificationCode: '' });
  const [message, setMessage] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail({ email: form.email, verificationCode: parseInt(form.verificationCode) }, navigate);
      setMessage('Email verification successful!');
    } catch (error) {
      setMessage('Email verification failed. Please try again.');
    }
  };

  const handleSendOtp = async () => {
    try {
      await forgotPassword({ email: form.email });
      setOtpMessage('OTP sent successfully!');
      setCooldown(200); // Set cooldown to 200 seconds
    } catch (error) {
      setOtpMessage('Failed to send OTP. Please try again.');
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('emailToVerify');
    if (email) {
      setForm((prevForm) => ({ ...prevForm, email }));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={form.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
              Verification Code
            </label>
            <input
              type="number"
              name="verificationCode"
              id="verificationCode"
              placeholder="Verification Code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          {message && <p className="text-red-500 text-xs italic">{message}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify Email
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              className={`ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${cooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cooldown > 0}
            >
              Send OTP
            </button>
          </div>
        </form>
        {otpMessage && <p className="text-green-500 text-xs italic mt-4">{otpMessage}</p>}
        {cooldown > 0 && <p className="text-gray-500 text-xs italic mt-2">You can resend OTP in {cooldown} seconds.</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
