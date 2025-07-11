import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = (user) => {
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
    skills = [],
  } = user.user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      // console.log(userId);

      dispatch(removeFeed(userId));
    } catch (err) {
      console.log("Error :- " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br rounded-3xl from-pink-100 via-white to-blue-100">
      <div className="relative w-96 sm:w-80 h-[100%] rounded-3xl overflow-hidden shadow-2xl group bg-white ">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className=" w-full h-[72%] object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Info Panel */}
        <div className="p-4 text-black  backdrop-blur-md rounded-b-3xl ">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName},{" "}
            <span className="font-light">{age + ","}</span>{" "}
            <span className="font-light capitalize">{gender}</span>
          </h2>

          <p className="text-sm mt-1 text-gray-700 line-clamp-2">{about}</p>
          <div className="mt-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max ">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-xs px-3 py-1 rounded-full text-gray-800 whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 left-0 right-0 px-5 flex justify-between items-center">
          <button
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
            className="bg-red-100 text-red-500 font-medium px-4 py-2 rounded-full shadow hover:bg-red-200 transition"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
            className="bg-green-100 text-green-600 font-medium px-4 py-2 rounded-full shadow hover:bg-green-200 transition"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;


