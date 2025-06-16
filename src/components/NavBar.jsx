import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { motion } from "motion/react";
import logo from "/logo.png?url&.url";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar  bg-black text-white px-4 py-2 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="btn btn-ghost px-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <motion.img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10"
              initial={{ y: -100, opacity: 0  }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                delay: 0.6,
              }}
            />
            <span className="text-xl font-bold">MatchFixing</span>
            <motion.span
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 , scale:1.6 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                delay: 0.6,
              }}
            >
              🏏
            </motion.span>
          </motion.div>
        </Link>
      </div>

      {user && (
        <div className="md:flex items-center gap-3 hidden">
          <span className="hidden md:inline">Welcome, {user.firstName}</span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg-white dropdown-content text-black rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Friends</Link>
              </li>
              <li>
                <Link to="/requests">Connection Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
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
      {menuOpen && user && (
        <div className="absolute top-16 right-4 bg-white text-black w-56 rounded-lg shadow-lg z-50 p-4 space-y-2 md:hidden">
          <div className="flex items-center gap-2">
            <img
              src={user.photoUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{user.firstName}</span>
          </div>
          <Link to="/profile" className="block hover:text-blue-600">
            Profile
          </Link>
          <Link to="/connections" className="block hover:text-blue-600">
            Friends
          </Link>
          <Link to="/requests" className="block hover:text-blue-600">
            Connection Requests
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
