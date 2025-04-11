// | import react hook
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addUserSocialMediaAction } from "../../redux/socialMediaRedux/socialMediaAction";

import { loggedInUserState } from "../../redux/authRedux/AuthSlice";

import { userSocialMediaDataState } from "../../redux/socialMediaRedux/socialMediaSlice";

import { userProfileState } from "../../redux/userRedux/userSlice";
import { Link } from "react-router";
import SocialMediaListComponent from "./SocialMediaListComponent";

// ^ Social Media Component
const SocialMedia = () => {
  // @ dispatch variable
  const dispatch = useDispatch();

  // @ errorMessage
  const [errorMessage, setErrorMessage] = useState("");

  // @ get current state of logged in user
  const loggedInUser = useSelector(loggedInUserState);

  // @ get current state of user social media data
  const userSocialMediaData = useSelector(userSocialMediaDataState);

  // @ get current state of user profile
  const userProfile = useSelector(userProfileState);

  // @ SocialMedia state variable
  const [socialLinks, setSocialLinks] = useState([{ platform: "", url: "" }]);

  // # All Social Media List
  const allPlatforms = [
    "Facebook",
    "Instagram",
    "Twitter",
    "Youtube",
    "LinkedIn",
    "GitHub",
    "Website",
    "WhatsApp",
    "Telegram",
    "Snapchat",
    "Tiktok",
    "Pinterest",
    "Dribbble",
  ];
  const existingPlatforms = Array.isArray(userSocialMediaData?.socialLinks)
    ? userSocialMediaData?.socialLinks.map((p) => p.platform).filter(Boolean) // remove undefined/null if any
    : [];

  console.log("Existing Platforms:", existingPlatforms);
  // Get remaining platforms not yet added
  const remainingPlatforms = allPlatforms.filter(
    (platform) => !existingPlatforms.includes(platform)
  );

  console.log("Remaining Platforms to Add:", remainingPlatforms);

  // + Add More Social Media Account
  const addMoreLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  // # handle change
  const handleChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  // - Handle Remove Social Media Account
  const handleRemove = (index) => {
    const updated = [...socialLinks];
    updated.splice(index, 1);
    setSocialLinks(updated);
  };

  // # Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(addUserSocialMediaAction(socialLinks));
      if (addUserSocialMediaAction.rejected.match(result)) {
        console.log(result.error.data);
      }
    } catch (error) {
      return console.error(error);
    }
  };

  // & render component
  return (
    <div className="rounded-box min-h-screen">
      <h1 className="text-3xl font-bold m-3 text-center">
        Social Media Details
      </h1>
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <SocialMediaListComponent />
      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={index} className="flex gap-4 items-center">
            <select
              className="select select-bordered"
              value={link.platform}
              onChange={(e) => handleChange(index, "platform", e.target.value)}
            >
              <option value="">Select platform</option>
              {remainingPlatforms
                .filter(
                  (platform) =>
                    !socialLinks.some(
                      (l, i) => l.platform === platform && i !== index
                    )
                )
                .map((platform) => (
                  <option key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </option>
                ))}
            </select>

            <input
              type="url"
              placeholder="Enter profile URL"
              className="input input-bordered w-full"
              value={link.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />

            <button
              className="btn btn-error"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex my-3">
          <button
            className="btn btn-outline btn-primary mr-3"
            onClick={addMoreLink}
          >
            Add Social Link
          </button>

          <button className="btn btn-success" onClick={handleSubmit}>
            Save Social Links
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
