import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png"; // adjust if your logo path differs
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate("/home");
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-[#17253A] text-white min-h-screen flex flex-col justify-center items-center">
      <motion.img
        src={logo}
        alt="VibePair Logo"
        className="w-20 h-20 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      />

      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        We don’t match. <br />
        We <span className="text-[#DFC9F5]">Vibe</span> and{" "}
        <span className="text-[#B7FCD8]">Pair</span>.
      </motion.h1>

      {/* Loading spinner */}
     <div className="flex space-x-2 mt-8">
  <motion.div
    className="w-3 h-3 rounded-full bg-pink-500"
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
  />
  <motion.div
    className="w-3 h-3 rounded-full bg-purple-500"
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
  />
  <motion.div
    className="w-3 h-3 rounded-full bg-pink-500"
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
  />
</div>

    </div>
  );
};

export default SplashScreen;
