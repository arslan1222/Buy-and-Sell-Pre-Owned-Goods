import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from '../Context/ShopContext';

const Login = () => {
  const [currState, setCurrState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Registration successful!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-primary">{currState}</h2>
          <p className="text-gray-500 text-sm">Welcome to ShopEase</p>
        </div>

        {currState === "Sign Up" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email Address"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          required
        />

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          {currState === "Login" ? (
            <p className="cursor-pointer hover:underline text-primary" onClick={() => setCurrState("Sign Up")}>
              Create account
            </p>
          ) : (
            <p className="cursor-pointer hover:underline text-primary" onClick={() => setCurrState("Login")}>
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primaryhover transition duration-200"
        >
          {currState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
