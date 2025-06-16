import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { easeInOut, motion } from "motion/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Basic validation

      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      // console.log(res.data);

      dispatch(addUser(res.data));

      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-black p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Email : {email}
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            Password : {password}
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <p className="text-red-600">{error}</p>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>
        <p
          className="flex justify-center cursor-pointer mt-4 mx-auto"
          onClick={() => {
            return navigate("/signup");
          }}
        >
          New User? Sign Up here
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
