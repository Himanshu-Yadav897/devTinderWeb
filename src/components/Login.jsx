import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { motion } from "motion/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#17253A]">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-black border border-[#2c2c2c] p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#DFC9F5]">
          Login to VibePair
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg bg-[#1f1f1f] text-white border-[#555] focus:outline-none focus:ring-2 focus:ring-[#DFC9F5]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg bg-[#1f1f1f] text-white border-[#555] focus:outline-none focus:ring-2 focus:ring-[#DFC9F5]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] hover:cursor-pointer text-black py-2 rounded-lg font-semibold hover:opacity-90 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        <p
          className="text-center text-sm mt-4 text-white cursor-pointer hover:text-[#DFC9F5]"
          onClick={() => navigate("/signup")}
        >
          New User? <span className="underline">Sign Up here</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
