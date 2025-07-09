import React from "react";
import { motion } from "motion/react";

const Contact = () => {
  return (
    <div className="bg-[#17253A] min-h-screen flex items-center justify-center px-6 py-16 text-white">
      <div className="max-w-4xl w-full bg-[#1f324d] rounded-2xl p-10 shadow-lg border border-[#26394f]">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let’s <span className="text-[#DFC9F5]">Connect</span> and{" "}
          <span className="text-[#B7FCD8]">Vibe</span> Together
        </motion.h2>

        {/* Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-[#24364d] border border-[#334b64] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DFC9F5]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[#24364d] border border-[#334b64] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B7FCD8]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm">Message</label>
            <textarea
              rows="5"
              placeholder="Tell us what’s on your mind..."
              className="w-full px-4 py-3 rounded-lg bg-[#24364d] border border-[#334b64] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DFC9F5]"
            ></textarea>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] text-black font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-[0_20px_50px_rgba(183,_252,_216,_0.7)] transition"
            type="submit"
          >
            Send Message 💌
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
