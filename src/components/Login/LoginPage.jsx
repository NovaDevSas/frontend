import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/auth/login`, { email, password });
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, { email });
      alert('Password reset link sent to your email');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {!isRegister && !isResetPassword && (
          <form onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold mb-6 text-white">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Login</button>
            <p className="mt-4 text-center text-white">
              <button type="button" onClick={() => setIsRegister(true)} className="text-blue-300 hover:underline">Create an account</button> | 
              <button type="button" onClick={() => setIsResetPassword(true)} className="text-blue-300 hover:underline">Forgot password?</button>
            </p>
          </form>
        )}
        {isRegister && (
          <form onSubmit={handleRegister}>
            <h2 className="text-3xl font-bold mb-6 text-white">Register</h2>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Register</button>
            <p className="mt-4 text-center text-white">
              <button type="button" onClick={() => setIsRegister(false)} className="text-blue-300 hover:underline">Back to login</button>
            </p>
          </form>
        )}
        {isResetPassword && (
          <form onSubmit={handleResetPassword}>
            <h2 className="text-3xl font-bold mb-6 text-white">Reset Password</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Reset Password</button>
            <p className="mt-4 text-center text-white">
              <button type="button" onClick={() => setIsResetPassword(false)} className="text-blue-300 hover:underline">Back to login</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
