import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
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

      //   console.log(res?.data);

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
    <div className="flex items-center justify-center py-3 bg-gray-700">
      <div className="bg-black p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            First Name : {firstName}
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Last Name : {lastName}
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Email : {emailId}
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Password : {password}
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Age : {age}</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            Gender : {gender}
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="male / female / others"
          />
        </div>

        <p className="text-red-600">{error}</p>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSignup}
        >
          Signup
        </button>
        <p
          className="flex justify-center cursor-pointer mt-4 mx-auto"
          onClick={() => {
            return navigate("/login");
          }}
        >
          Existing User? Login here
        </p>
      </div>
      {toast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div className="alert alert-success">
            <span>User saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
