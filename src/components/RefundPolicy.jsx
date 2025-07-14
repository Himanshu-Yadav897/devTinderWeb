import React from "react";
import { motion } from "motion/react";

const RefundPolicy = () => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="min-h-screen bg-gray-700 py-12 px-4"
  >
    <div className="max-w-3xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-lg text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">
        Refund & Cancellation Policy
      </h1>

      <div className="space-y-6 text-base leading-relaxed">
        <PolicyItem
          title="1. Free Access"
          desc="First 5 users are free of charge."
        />
        <PolicyItem
          title="2. Premium"
          desc="After 5 users, a subscription is required for continued access."
        />
        <PolicyItem
          title="3. Refund Window"
          desc="Refunds are available within 48 hours of your first subscription."
        />
        <PolicyItem
          title="4. Cancellations"
          desc="You may cancel anytime. Access continues until the current billing cycle ends."
        />
        <PolicyItem
          title="5. Request Refunds"
          desc="To request a refund, email support@vibepair.online with your account details."
        />
      </div>
    </div>
  </motion.div>
);

const PolicyItem = ({ title, desc }) => (
  <div>
    <h2 className="font-semibold text-lg text-rose-400">{title}</h2>
    <p className="text-gray-300">{desc}</p>
  </div>
);

export default RefundPolicy;
