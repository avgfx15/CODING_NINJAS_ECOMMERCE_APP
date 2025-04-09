import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserSocialMediaAction } from "../../redux/socialMediaRedux/socialMediaAction";

// ^ Add Social Media Data Component
const AddSocialMediaDataComponent = ({ setRefreshTrigger }) => {
  const dispatch = useDispatch();

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

  // $ selected Socialmedia platform list
  const selectedPlatforms = socialLinks
    .map((link) => link.platform)
    .filter(Boolean);

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

  // # Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(addUserSocialMediaAction(socialLinks));
      if (addUserSocialMediaAction.rejected.match(result)) {
        console.log(result.error.data);
      }

      setRefreshTrigger(true);
    } catch (error) {
      return console.error(error);
    }
  };

  // & render component
  return (
    <div className="container2 w-11/12 rounded-box shadow-md mx-auto my-3">
      <h1 className="text-3xl font-bold m-3 text-center">
        Add Social Media Details
      </h1>
      {/* {errorMessage && <ErrorComponent message={errorMessage} />} */}
      <form onSubmit={handleSubmit}>
        {socialLinks.map((link, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={link.platform}
              onChange={(e) => handleChange(index, "platform", e.target.value)}
              className="select select-bordered"
            >
              <option value="">Select Platform</option>
              {allPlatforms.map((platform) => {
                const isSelected =
                  selectedPlatforms.includes(platform) &&
                  platform !== link.platform;

                return (
                  <option key={platform} value={platform} disabled={isSelected}>
                    {platform}
                  </option>
                );
              })}
            </select>

            <input
              type="url"
              placeholder="Enter URL"
              value={link.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
              className="input input-bordered flex-1"
              required
            />
          </div>
        ))}
        <div className="flex justify-start gap-2 my-3">
          <button
            type="button"
            onClick={addMoreLink}
            className="btn btn-outline btn-info mb-3"
          >
            + Add More
          </button>

          <button type="submit" className="btn btn-primary">
            Save Social Links
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSocialMediaDataComponent;
