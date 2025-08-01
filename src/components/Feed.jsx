import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";

import { AnimatePresence } from "motion/react";
import ImageSwiper from "../ui/ImageSwiperPage";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);

  const getFeed = async () => {
    if (feed) return;
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

  const handleSendRequest = async (status, userId, direction) => {
    try {
      setAction({ userId, direction });
      await new Promise((resolve) => setTimeout(resolve, 400));
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
      setAction(null);
    } catch (err) {
      console.log("Error:", err.message);
      setAction(null);
    }
  };

  if (!feed || feed.length === 0) {
    return <div className="text-center text-lg mt-10">No People found</div>;
  }

  return (
    <div className="flex justify-center my-10">
      {feed.length > 0 && (
        <ImageSwiper
          key={feed[0]._id}
          cards={feed}
          onAction={handleSendRequest}
        />
      )}
    </div>
  );
};

export default Feed;
