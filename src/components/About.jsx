import React from "react";
import { motion } from "motion/react";
import { FaHeart, FaComments, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaHeart size={30} className="text-pink-500" />,
    title: "Swipe to Like",
    desc: "Find people who match your vibe with a simple swipe.",
  },
  {
    icon: <FaUserCheck size={30} className="text-green-500" />,
    title: "It’s a Match!",
    desc: "Mutual likes result in matches—no pressure, no spam.",
  },
  {
    icon: <FaComments size={30} className="text-blue-500" />,
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
        className="bg-gray-700"
      >
    <div className="bg-gray-700 min-h-screen px-6 py-12 md:px-20 text-gray-800">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">
          About VibePair
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-amber-50">
          VibePair is a modern dating platform designed to connect people based
          on mutual interests, vibes, and real intentions.
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
            className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
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
        <h2 className="text-3xl font-bold mb-4 text-rose-500">How It Works</h2>
        <p className=" mb-8 text-amber-50">
          Create your profile, explore vibes, swipe right on the ones you like,
          and start building meaningful connections.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-pink-600 text-white px-6 py-2 rounded-full shadow hover:bg-pink-700 transition"
          >
            Join Now
          </button>
        </div>
      </motion.div>
    </div>
    </motion.div>
  );
};

export default About;
