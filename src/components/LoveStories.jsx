import React from "react";
import { motion } from "framer-motion";

import couple1 from "../../public/couple-1.png";
import couple2 from "../../public/couple-2.png";
import couple3 from "../../public/couple-3.png";

const stories = [
  {
    img: couple1,
    title: "An Unexpected Connection",
    desc: "They met on VibePair without filters or expectations. Just pure energy and laughter.",
  },
  {
    img: couple2,
    title: "From Texting to Together",
    desc: "Started with late-night chats, ended with matching playlists and weekend getaways.",
  },
  {
    img: couple3,
    title: "Paired by Vibes",
    desc: "She liked poetry, he liked memes. They vibed. They paired.",
  },
];

const LoveStories = () => {
  return (
    <section className="bg-[#17253A] text-white pt-8 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8]">
          Real Stories. Real Vibes.
        </h2>

        {stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-14 mb-20 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={story.img}
                alt={`Couple ${index + 1}`}
                className="rounded-2xl shadow-xl object-cover w-[90%] max-w-[360px] h-[360px]"
              />
            </div>

            {/* Caption Section */}
            <div
              className={`w-full md:w-[45%] text-center md:text-left ${
                index % 2 !== 0 ? "md:pl-6" : "md:pr-6"
              }`}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-pink-400 mb-3">
                {story.title}
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {story.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoveStories;
