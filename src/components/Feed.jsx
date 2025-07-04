import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./Usercard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) {
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed === null || feed.length === 0) {
    return <div>No People found</div>;
  }
  return (
    <div className="flex justify-center my-10">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
