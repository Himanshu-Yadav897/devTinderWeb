import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

const Home = () => {
  const vibeRef = useRef(null);
  const pairRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      const vibeEl = vibeRef.current;
      const pairEl = pairRef.current;
      if (!vibeEl || !pairEl) return;

      const vibeChars = splitText(vibeEl).chars;
      const pairChars = splitText(pairEl).chars;

      const vibeDelay = 0.12;
      const pairDelay = 0.17;

      animate(
        vibeChars,
        { y: [-20, 20] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 2,
          delay: stagger(vibeDelay, {
            startDelay: -vibeDelay * vibeChars.length,
          }),
        }
      );

      animate(
        pairChars,
        { y: [-20, 20] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 2.3,
          delay: stagger(pairDelay, {
            startDelay: -pairDelay * pairChars.length,
          }),
        }
      );
    });
  }, []);

  return (
    <div className="bg-[#17253A] text-white min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* 🔮 Glow effect behind text */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-500 rounded-full blur-[100px] opacity-20 z-0" />

      {/* Left Side: Text */}
      <div className="flex-1 max-w-xl z-10 text-center md:text-left mt-10 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          We don’t match. <br />
          We{" "}
          <span ref={vibeRef} className="text-[#DFC9F5] inline-block">
            Viiiiiiiibiiiiiing
          </span>{" "}
          <br />
          and{" "}
          <span ref={pairRef} className="text-[#B7FCD8] inline-block">
            Paaaairiiiing
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 mb-8"
        >
          Discover real connections. Based on energy, not just swipes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] text-black font-semibold px-8 py-3 rounded-full shadow hover:shadow-[0_20px_50px_rgba(183,_252,_216,_0.7)] transition"
            >
              Start Vibing 💖
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Right Side: 3D Spline */}
      <div className="flex-1 w-full max-w-[600px] h-[400px] md:h-[600px] z-10 relative overflow-hidden">
        <Spline scene="https://prod.spline.design/42Ld5qOtmvS42gQg/scene.splinecode" />

        {/* Right */}
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#17253A] to-transparent pointer-events-none" />

        {/* Left */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#17253A] to-transparent pointer-events-none" />

        {/* Top */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#17253A] to-transparent pointer-events-none" />

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#17253A] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default Home;
