import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const underlineVariants = {
  rest: { width: 0 },
  hover: { width: "100%" },
};

const linkVariants = {
  rest: { color: "#ffffff" },
  hover: { color: "#DFC9F4" },
};

const MotionLink = motion(Link);

const LinkMotion = ({ to, children, className = "" }) => (
  <MotionLink
    to={to}
    className={`relative inline-block text-sm ${className}`}
    initial="rest"
    whileHover="hover"
    animate="rest"
    variants={linkVariants}
  >
    {children}
    <motion.span
      className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8]"
      variants={underlineVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  </MotionLink>
);

export default LinkMotion;
