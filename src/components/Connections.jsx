import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
    return <div className="p-4">Loading connections...</div>;
  }

  if (connections.length === 0) {
    return <div className="p-4 text-gray-600">You have no connections</div>;
  }

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Friends</h2>
      <div className="flex flex-col items-center gap-4">
        {connections.map((user) => (
          <div
            key={user._id}
            className="flex items-start gap-4 w-full max-w-md bg-black text-white p-4 rounded-xl shadow-md border"
          >
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 min-w-16 rounded-full object-cover border"
            />
            <div className="flex-1">
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-400 capitalize">
                {user.gender}, {user.age}
              </p>
              <p className="mt-1 text-xs text-gray-400 whitespace-pre-line">{user.about}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;

