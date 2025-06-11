import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const request = useSelector((store)=> store.requests);
  const dispatch = useDispatch();
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
  },[]);
  return <div>Requests</div>;
};

export default Requests;
