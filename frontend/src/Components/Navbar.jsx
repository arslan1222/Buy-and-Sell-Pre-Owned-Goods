import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
    navigate,
    userData,
  } = useContext(AppContext);

  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative z-50 bg-white px-4 md:px-10">
      <Link to={"/"}>
        <img className="w-10" src={assets.logo} alt="Logo" />
      </Link>

      {token && (
      <NavLink
        to="/add-product"
        onClick={() => setVisible(false)}
        className="px-4 py-2 rounded hide-sale cursor-pointer bg-primary transition-all hover:bg-primaryhover text-white mt-3 text-center"
      >
        Add Product
      </NavLink>
      )}

      {/* Main Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-primary hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-primary hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-primary hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-primary hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="Search"
        />

        <Link to="/cart" className="relative">
          <img className="w-7 min-w-7" src={assets.cart_icon} alt="Cart" />
          <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Profile Dropdown / Login Button */}
        {userData && token ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-1">
              <img
                className="w-10 h-10 rounded-full border border-gray-300"
                src={userData.image}
                alt="Profile"
              />
            </div>

            {showDropdown && (
              <ul className="absolute top-10 right-0 flex-col w-44 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50">
                <li
                  onClick={() => navigate("/my-profile")}
                  className="px-4 py-2 hover:bg-primary/10 transition cursor-pointer"
                >
                  My Profile
                </li>
                <li
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 hover:bg-primary/10 transition cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-primary/10 transition cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        )}

        

        {/* Hamburger Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-500 ease-in-out z-[9999] sm:hidden ${
          visible ? "w-3/4 max-w-xs px-6 py-4" : "w-0 overflow-hidden px-0"
        }`}
        onClick={() => setVisible(false)}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>

          {/* Sidebar Navigation Links */}
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/contact">
            CONTACT
          </NavLink>

          {/* Add Product (for logged-in users) */}
          {token && (
            <li
              onClick={() => {
                navigate("/add-product");
                setVisible(false);
              }}
              className="px-4 py-2 rounded cursor-pointer bg-primary transition-all hover:bg-primaryhover text-white mt-3"
            >
              Add Product
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
