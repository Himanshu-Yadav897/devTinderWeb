import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#17253A] px-4 py-4">
      <div className="bg-black p-8 rounded-2xl shadow-md w-full max-w-md border border-[#2c2c2c]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#DFC9F5]">Create Your Account</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <InputField
            label="First Name"
            type="text"
            value={firstName}
            onChange={setFirstName}
            placeholder="Enter first name"
          />
          <InputField
            label="Last Name"
            type="text"
            value={lastName}
            onChange={setLastName}
            placeholder="Enter last name"
          />
          <InputField
            label="Email"
            type="email"
            value={emailId}
            onChange={setEmailId}
            placeholder="example@email.com"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />
          <InputField
            label="Age"
            type="number"
            value={age}
            onChange={setAge}
            placeholder="Enter your age"
          />
          <InputField
            label="Gender"
            type="text"
            value={gender}
            onChange={setGender}
            placeholder="male / female / others"
          />
        </div>

        {/* Error + Button */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-[#DFC9F5] to-[#B7FCD8] text-black py-2 rounded-lg hover:cursor-pointer font-semibold hover:opacity-90 transition"
          onClick={handleSignup}
        >
          Signup
        </button>

        <p
          className="text-sm mt-4 text-center text-white cursor-pointer hover:text-[#DFC9F5]"
          onClick={() => navigate("/login")}
        >
          Already have an account? <span className="underline">Login here</span>
        </p>
      </div>

      {/* Toast Message */}
      {toast && (
        <div className="toast toast-top toast-center pt-20">
          <div className="alert alert-success">
            <span>User registered successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-white">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg bg-[#1f1f1f] text-white border-[#555] focus:outline-none focus:ring-2 focus:ring-[#DFC9F5]"
    />
  </div>
);

export default Signup;
