import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connections);
  
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
  },[]);
  
  if(!connection){
    return;
  }

  if(connection.length === 0){
    return <div>You have no connections</div>
  }

  return (
    <div className="p-4 bg-base-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Your Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {connection.map((user) => (
          <div
            key={user._id}
            className="bg-[#111827] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-60 object-contain p-2 bg-gray-200 rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-300 capitalize">
                {user.gender}, {user.age}
              </p>
              <p className="mt-2 text-gray-400 text-sm">{user.about}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
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
