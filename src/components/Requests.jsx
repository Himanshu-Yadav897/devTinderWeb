import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { Check, X } from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(_id));
    } catch (err) {
      console.log("Error" + err.message);
    }
  };

  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log("Error :" + err.message);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (!requests) {
    return <div className="p-4">Loading requests...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="p-4 text-gray-600">You have no pending requests</div>
    );
  }

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Received Requests
      </h2>
      <div className="flex flex-col items-center gap-4">
        {requests.map((req) => {
          const user = req.fromUserId;
          return (
            <div
              key={req._id}
              className="flex items-center justify-between w-full max-w-md bg-black text-white p-4 rounded-xl shadow-md border"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.photoUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-400 capitalize">
                    {user.gender}, {user.age}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                  title="Accept"
                  onClick={() => {
                    reviewRequest("accepted", req._id);
                  }}
                >
                  <Check size={18} />
                </button>
                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                  title="Reject"
                  onClick={() => {
                    reviewRequest("rejected", req._id);
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
