import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { motion } from "motion/react";
import logo from "/logo.png?url&.url";
import LinkMotion from "./LinkMotion";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-black text-white px-4 py-2 shadow-sm flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to={user ? "/home" : "/"} className="flex items-center">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-auto w-10"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 10,
              delay: 0.6,
            }}
          />
          <span className="text-[#DFC9F5] text-2xl font-bold ">Vibe</span>
          <span className="text-[#B7FCD8] text-2xl font-bold ">Pair</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {!user ? (
          <>
            <LinkMotion to="/">Home</LinkMotion>
            <LinkMotion to="/about">About Us</LinkMotion>
            <LinkMotion to="contact">Contact</LinkMotion>
            <Link to="/login">
              <button className="bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] text-black px-5 py-2 rounded-full font-semibold shadow hover:opacity-90 transition">
                Login
              </button>
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={user.photoUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-[#B7FCD8]"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 bg-green-100 text-black w-52 rounded-lg shadow-lg z-50 py-2">
                <div className="px-4 py-2 font-semibold border-b border-gray-200">
                  Hi, {user.firstName}
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-[#DFC9F5] hover:text-black"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/connections"
                  className="block px-4 py-2 hover:bg-[#DFC9F5] hover:text-black"
                  onClick={() => setDropdownOpen(false)}
                >
                  Friends
                </Link>
                <Link
                  to="/requests"
                  className="block px-4 py-2 hover:bg-[#DFC9F5] hover:text-black"
                  onClick={() => setDropdownOpen(false)}
                >
                  Friend Requests
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-green-100 text-black w-56 rounded-lg shadow-lg z-50 p-4 space-y-2 md:hidden">
          {!user ? (
            <>
              <Link to="/" className="block hover:text-[#DFC9F5]">
                Home
              </Link>
              <Link to="/about" className="block hover:text-[#DFC9F5]">
                About
              </Link>
              <Link to="/contact" className="block hover:text-[#DFC9F5]">
                Contact Us
              </Link>
              <Link to="/login">
                <button className="w-full mt-2 bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] text-black px-4 py-2 rounded-full font-semibold hover:opacity-90 transition">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.firstName}</span>
              </div>
              <Link to="/profile" className="block hover:text-[#DFC9F5]">
                Profile
              </Link>
              <Link to="/connections" className="block hover:text-[#DFC9F5]">
                Friends
              </Link>
              <Link to="/requests" className="block hover:text-[#DFC9F5]">
                Friend Requests
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
