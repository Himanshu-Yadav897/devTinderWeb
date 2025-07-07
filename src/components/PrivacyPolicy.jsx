import React from "react";
import {motion} from "motion/react";

const PrivacyPolicy = () => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="bg-gray-700"
  >
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-rose-600">
        Privacy Policy
      </h1>
      <div className="space-y-4">
        <PolicyItem
          title="1. What We Collect"
          desc="Name, email, usage data, and payment info when applicable."
        />
        <PolicyItem
          title="2. Purpose"
          desc="Used for messaging, billing, and improving user experience."
        />
        <PolicyItem
          title="3. Third-Party Access"
          desc="Only Razorpay for payment processing. No data selling."
        />
        <PolicyItem
          title="4. Data Security"
          desc="All data is encrypted and securely stored."
        />
        <PolicyItem
          title="5. Cookies"
          desc="Used for session management and analytics."
        />
        <PolicyItem
          title="6. User Rights"
          desc="Request access or deletion by emailing us."
        />
        <PolicyItem
          title="7. Policy Changes"
          desc="May update this policy, changes will be reflected here."
        />
        <PolicyItem title="8. Contact" desc="support@vibepair.online" />
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

export default PrivacyPolicy;
