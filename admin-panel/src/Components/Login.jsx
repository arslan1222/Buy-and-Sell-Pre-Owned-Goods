import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary via-primary2 to-primaryhover flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg px-10 py-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="text-lg font-medium text-gray-700">Email Address</label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              type="email"
              placeholder="your@email.com"
              className="mt-2 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-lg font-medium text-gray-700">Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md text-lg font-semibold hover:bg-primary transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
