import React, { useState, useEffect } from "react";
import UserCard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const EditProfile = ({ user }) => {
  const cloudName = "dyghd0yk6";
  const uploadPreset = "upload";

  //cloudinary config
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  //upload widget config
  const uwConfig = {
    cloudName,
    uploadPreset,
    cropping: true,
  };

  const [publicId, setPublicId] = useState("");
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoURL] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //clearing the errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  useEffect(() => {
    if (publicId) {
      const myImage = cld.image(publicId); // create image instance

      const imageUrl = myImage.toURL(); // generate URL from publicId

      setPhotoURL(imageUrl); // ✅ this is what gets saved to MongoDB
      console.log("Generated image URL:", imageUrl);
    }
  }, [publicId]);

  return (
    <>
      <div className="flex justify-center my-10 max-sm:block ">
        <div className="flex justify-center mx-10 max-sm:my-10 ">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs  ">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="input input-bordered mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input mb-3 input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text ">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input mb-3 input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                  />
                </label>
                {/* <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">PhotoURL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                  />
                </label> */}

                <div>
                  <span className="label-text text-gray-600 pr-5">Upload Photo </span>
                  <CloudinaryUploadWidget
                    uwConfig={uwConfig}
                    setPublicId={setPublicId}
                  />
                </div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {gender || "Select gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <button onClick={() => setGender("male")}>Male</button>
                      </li>
                      <li>
                        <button onClick={() => setGender("female")}>
                          Female
                        </button>
                      </li>
                      <li>
                        <button onClick={() => setGender("others")}>
                          Others
                        </button>
                      </li>
                    </ul>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value.split(","))}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Bio"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                  ></textarea>
                </label>
              </div>
              <p className="text-red-500 text-center">{error}</p>
              <div className="card-actions justify-center mt-2">
                <button className="cloudinary-button py-2" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider with Arrow Label */}
        <div className="flex flex-col items-center mx-4 max-sm:my-10 justify-center">
          <div className=" text-gray-400 whitespace-nowrap">
            Preview of your profile <span className=" max-sm:hidden ">➡</span>{" "}
            <span className="sm:hidden">⬇</span>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender, skills }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
