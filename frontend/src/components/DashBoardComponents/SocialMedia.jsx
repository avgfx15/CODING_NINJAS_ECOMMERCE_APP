// | import react hook
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addUserSocialMediaAction,
  deleteUserSocialMediaAction,
} from "../../redux/socialMediaRedux/socialMediaAction";

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

  // @ Edit or Add Mode
  const [mode, setMode] = useState("add");

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

  // # Get existing platforms from userSocialMediaData
  const existingLinks = Array.isArray(userSocialMediaData?.socialLinks)
    ? userSocialMediaData.socialLinks
    : [];

  const existingPlatforms = existingLinks.map((p) => p.platform);

  // # Get remaining platforms not yet added
  const remainingPlatforms = allPlatforms.filter(
    (platform) => !existingPlatforms.includes(platform)
  );

  const getFilteredPlatforms = (index) => {
    const currentPlatform = socialLinks[index].platform;
    return [
      currentPlatform,
      ...remainingPlatforms.filter(
        (platform) =>
          !socialLinks.some((l, i) => l.platform === platform && i !== index)
      ),
    ].filter(Boolean); // remove undefined/null
  };
  console.log(getFilteredPlatforms(0) + " filtered platforms");

  // # handle mode switch
  const handleModeSwitch = (selectedMode) => {
    setMode(selectedMode);

    if (selectedMode === "update") {
      setSocialLinks(existingLinks); // Prefill with current entries
    } else {
      setSocialLinks([{ platform: "", url: "" }]); // Reset for new adds
    }
  };

  // # handle change
  const handleChange = (index, field, value) => {
    const updatedLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setSocialLinks(updatedLinks);
  };

  // - Handle Remove Social Media Account
  const handleRemove = (platform) => {
    dispatch(deleteUserSocialMediaAction(platform));
    setSocialLinks((prevLinks) =>
      prevLinks.filter((link) => link.platform !== platform)
    );
  };

  // # Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(addUserSocialMediaAction(socialLinks));
      if (addUserSocialMediaAction.rejected.match(result)) {
        setErrorMessage(result.error.data);
      }
      setSocialLinks([{ platform: "", url: "" }]);
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
              {getFilteredPlatforms(index).map((platform, ind) => (
                <option key={ind} value={platform}>
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
              onClick={() => handleRemove(link.platform)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex my-3 gap-3">
          {
            /* Add new link button only if in add mode and there are remaining platforms */
            remainingPlatforms.length > 0 && (
              <button
                className={`btn ${
                  mode === "add" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => handleModeSwitch("add")}
              >
                Add New Link
              </button>
            )
          }
          <button
            className={`btn ${
              mode === "update" ? "btn-success" : "btn-outline"
            }`}
            onClick={() => handleModeSwitch("update")}
          >
            Update Existing
          </button>
          <button className="btn btn-accent" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
