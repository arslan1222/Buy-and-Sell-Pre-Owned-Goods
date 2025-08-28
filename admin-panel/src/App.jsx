import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Sidbar from "./Components/Sidbar";
import { Route, Routes } from "react-router-dom";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import Login from "./Components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersList from "./Pages/usersList";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "Rs. ";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      { token === "" ?
        <Login setToken={setToken} />:
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidbar />
            <div className="w-[70%] mx-auto my-8 ml-[max(5vw, 25px)] text-gray-600 text-base">
              <Routes>
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/all-users" element={<UsersList token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default App;
