import React from "react";
import {motion} from "motion/react";

const TermsOfService = () => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="bg-gray-700"
  >
  <div className="max-w-3xl mx-auto px-6 py-12 text-gray-100">
    <h1 className="text-3xl font-semibold mb-6 text-rose-600">
      Terms of Service
    </h1>
    <p className="mb-4">
      Welcome to <strong>VibePair.online</strong> — a real-time chat platform.
      By using our services, you agree to the terms below:
    </p>
    <div className="space-y-4">
      <PolicyItem
        title="1. Eligibility"
        desc="You must be at least 18 years old to use this platform."
      />
      <PolicyItem
        title="2. Service Description"
        desc="Real-time chat app. First 5 users are free; beyond that requires a premium subscription."
      />
      <PolicyItem
        title="3. User Responsibilities"
        desc="You're responsible for your account's security and activity."
      />
      <PolicyItem
        title="4. Subscription"
        desc="Premium subscription unlocks after 5 users. Pricing is shown during upgrade."
      />
      <PolicyItem
        title="5. Account Suspension"
        desc="Accounts violating terms may be suspended or terminated."
      />
      <PolicyItem
        title="6. Intellectual Property"
        desc="All platform content and features belong to VibePair.online."
      />
      <PolicyItem
        title="7. Changes to Terms"
        desc="Terms may change. Continued use means you accept the updates."
      />
      <PolicyItem
        title="8. Contact"
        desc="Email us at support@vibepair.online."
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

export default TermsOfService;
