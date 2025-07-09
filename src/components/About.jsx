import React from "react";
import { motion } from "motion/react";
import { FaHeart, FaComments, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaHeart size={28} className="text-[#DFC9F5]" />,
    title: "Swipe to Like",
    desc: "Find people who match your vibe with a simple swipe.",
  },
  {
    icon: <FaUserCheck size={28} className="text-[#B7FCD8]" />,
    title: "It’s a Match!",
    desc: "Mutual likes result in matches—no pressure, no spam.",
  },
  {
    icon: <FaComments size={28} className="text-pink-400" />,
    title: "Start the Conversation",
    desc: "Break the ice with a message or an icebreaker prompt.",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="bg-[#17253A] text-white min-h-screen px-6 py-12 md:px-20"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#DFC9F5]">
          About VibePair
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300">
          VibePair is a modern dating platform designed to connect people based
          on mutual interests, energy, and real intentions.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-[#1f324d] p-6 rounded-2xl border border-[#2c4a63] shadow hover:shadow-[0_20px_50px_rgba(183,_252,_216,_0.1)] transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#B7FCD8]">
              {item.title}
            </h3>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4 text-[#DFC9F5]">How It Works</h2>
        <p className="mb-8 text-gray-300">
          Create your profile, explore vibes, swipe right on the ones you like,
          and start building meaningful connections.
        </p>
        <div className="flex justify-center">
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] text-black font-semibold px-8 py-3 rounded-full shadow hover:shadow-[0_20px_50px_rgba(183,_252,_216,_0.7)] transition"
          >
            Join Now 💖
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
