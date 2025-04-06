// | import react hook
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// | import userProfile Current state
import { userProfileState } from "../../redux/userRedux/userSlice";

// | import loggedInUser Current state
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";

// | import InfoBoc Component
import InfoBox from "../../Utils/InfoBox";

// | import icon from react-icon
import { FaEdit, FaSave } from "react-icons/fa";
import AddPersonalProfileComponent from "./AddPersonalProfileComponent";
import {
  getUserProfileByLoggedInUserAction,
  uploadImageAction,
} from "../../redux/userRedux/userActions";

import axios from "axios";

// ^ Personal Details Component
const PersonalDetails = () => {
  // @ dispatch variable
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // @ state variable
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  // @ state for isEditName boolean
  const [isEditName, setIsEditName] = useState(false);

  // @ state for input value
  const [inputValue, setInputValue] = useState("");

  // @ errorMessage state
  const [errorMessage, setErrorMessage] = useState("");

  // @ get current state of user profile
  const userProfile = useSelector(userProfileState);

  // @ get current state of logged in user
  const loggedInUser = useSelector(loggedInUserState);

  // $ Handle Change Image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // $ Handle Upload Image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("profileImage", image);
    formData.append("userId", loggedInUser._id); // Assuming you have the user ID
    setUploadProgress(0);
    try {
      setUploading(true);
      const result = await dispatch(
        uploadImageAction({ formData, setUploadProgress })
      );
      // @ check if result is a boolean
      if (uploadImageAction.rejected.match(result)) {
        setErrorMessage(result.payload.message);
      } else {
        setErrorMessage("");
        formData.delete("profileImage"); // Clear the form data
        formData.delete("userId"); // Clear the form data
        setImage(null); // Clear the image after upload
        setPreview(null); // Clear the preview after upload
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      alert("Upload failed!");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // % Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // % Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // ^ set error message
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);

    try {
    } catch (error) {
      console.error("Error updating name:", error);
    }
    // $ Exit editing mode
    setIsEditName(false);
  };

  // % If refresh Trigger is true, fetch user profile
  useEffect(() => {
    if (refreshTrigger) {
      dispatch(getUserProfileByLoggedInUserAction());
    }
  }, [refreshTrigger]);

  // & Component Render
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-3">
      {errorMessage && <ErrorComponent message={errorMessage} />}

      <div className="relative flex flex-col items-center">
        {/* Progress Circle Wrapper */}
        <div className="relative w-30 h-30">
          {/* Radial Progress Around Image */}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="radial-progress text-primary"
                style={{
                  "--value": uploadProgress,
                  "--size": "8rem", // same as image
                  "--thickness": "5px",
                }}
                role="progressbar"
              >
                {uploadProgress}%
              </div>
            </div>
          )}

          {/* Avatar + Upload Overlay */}
          <div className="avatar relative group w-full h-full cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img
                className="w-full h-full object-cover transition-transform group-hover:opacity-70"
                src={
                  preview
                    ? preview
                    : userProfile?.profileImage?.url
                    ? userProfile.profileImage?.url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s"
                }
                alt="Profile"
              />
            </div>

            {/* Upload Overlay Button */}
            <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30 text-white text-sm font-medium rounded-full cursor-pointer z-20">
              Change
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Upload Button */}
        {preview && (
          <button
            className="btn btn-success mt-4"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        )}
      </div>

      {!userProfile ? (
        <AddPersonalProfileComponent setRefreshTrigger={setRefreshTrigger} />
      ) : (
        <>
          <div className="flex justify-center items-center w-full">
            <h1 className="text-3xl font-bold m-3">{userProfile?.name}</h1>

            {!isEditName ? (
              <button
                className="btn btn-square btn-ghost text-xl"
                onClick={() => setIsEditName(true)}
              >
                <FaEdit />
              </button>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={inputValue}
                    name="name"
                    onChange={handleChange}
                    className="p-1 w-full border rounded-md"
                    autoFocus
                  />
                </form>
                <button
                  className="btn btn-square btn-ghost text-xl"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FaSave />
                </button>
              </>
            )}
          </div>

          <div className="hero-content flex-col lg:flex-row justify-center items-center w-11/12">
            <div className="flex flex-col xl:flex-row flex-wrap justify-center xl:justify-around items-center w-full mx-auto">
              <div className="w-10/12 xl:w-5/12 container2 mb-3 xl:mb-0">
                <InfoBox
                  label="Username"
                  initialValue={loggedInUser.username}
                  placeholder="Username not available"
                />
                <InfoBox
                  label="Email"
                  initialValue={loggedInUser.email}
                  placeholder="Email not available"
                />

                <InfoBox
                  label="Role"
                  initialValue={loggedInUser.role}
                  placeholder="Role not available"
                />
              </div>
              <div className="container2 w-10/12 xl:w-5/12">
                <InfoBox
                  label="Mobile"
                  initialValue={userProfile?.mobile}
                  placeholder="Mobile No not available"
                />
                <InfoBox
                  label="Age"
                  initialValue={userProfile?.age}
                  placeholder="Age not available"
                />
                <InfoBox
                  label="Gender"
                  initialValue={userProfile?.gender}
                  placeholder="Gender not available"
                />
              </div>
            </div>
          </div>
          <div className="container2 w-10/12 rounded-box shadow-md">
            <InfoBox
              label="Address"
              initialValue={userProfile?.address?.street}
              placeholder="Address not available"
            />
            <InfoBox
              label="City"
              initialValue={userProfile?.address?.city}
              placeholder="City not available"
            />
            <InfoBox
              label="State"
              initialValue={userProfile?.address?.state}
              placeholder="State not available"
            />
            <InfoBox
              label="Country"
              initialValue={userProfile?.address?.country}
              placeholder="Country not available"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalDetails;
