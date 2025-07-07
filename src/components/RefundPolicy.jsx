import React from "react";
import { easeInOut, motion } from "motion/react";

const RefundPolicy = () => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="bg-gray-700"
  >
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-rose-600">
        Refund & Cancellation Policy
      </h1>
      <div className="space-y-4">
        <PolicyItem
          title="1. Free Access"
          desc="First 5 users are free of charge."
        />
        <PolicyItem
          title="2. Premium"
          desc="After 5 users, subscription is required for continued access."
        />
        <PolicyItem
          title="3. Refund Window"
          desc="Refunds available within 48 hours of first subscription only."
        />
        <PolicyItem
          title="4. Cancellations"
          desc="Cancel anytime, access continues until billing cycle ends."
        />
        <PolicyItem
          title="5. Request Refunds"
          desc="Email support@vibepair.online with your details."
        />
      </div>
    </div>
  </motion.div>
);

const PolicyItem = ({ title, desc }) => (
  <div>
    <h2 className="font-semibold">{title}</h2>
    <p className="text-gray-300">{desc}</p>
  </div>
);

export default RefundPolicy;
