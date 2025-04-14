import React from "react";

import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
  FaGithubSquare,
  FaYoutubeSquare,
  FaWhatsappSquare,
  FaPinterestSquare,
  FaSnapchatSquare,
  FaTelegramPlane,
  FaTiktok,
  FaDribbbleSquare,
  FaGlobe,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";
import { userSocialMediaDataState } from "../../redux/socialMediaRedux/socialMediaSlice";
import { userProfileState } from "../../redux/userRedux/userSlice";

// Icon mapping
const iconMap = {
  facebook: FaFacebookSquare,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitterSquare,
  github: FaGithubSquare,
  youtube: FaYoutubeSquare,
  website: FaGlobe,
  whatsapp: FaWhatsappSquare,
  pinterest: FaPinterestSquare,
  snapchat: FaSnapchatSquare,
  telegram: FaTelegramPlane,
  tiktok: FaTiktok,
  dribbble: FaDribbbleSquare,
};

const colorMap = {
  facebook: "#1877F2", // Facebook blue
  instagram: "#E1306C", // Instagram gradient
  linkedin: "#0077B5", // LinkedIn blue
  twitter: "#1DA1F2", // Twitter blue
  github: "#fff ", // GitHub black
  youtube: "#FF0000", // YouTube red
  website: "#000", // Default black
  whatsapp: "#25D366", // WhatsApp green
  pinterest: "#E60023", // Pinterest red
  snapchat: "#FFFC00", // Snapchat yellow
  telegram: "#0088CC", // Telegram blue
  tiktok: "#fff", // TikTok cyan
  dribbble: "#EA4C92", // Dribbble pink
};

// ^ Social Media List Component
const SocialMediaListComponent = () => {
  // @ get current state of logged in user
  const loggedInUser = useSelector(loggedInUserState);

  // @ get current state of user social media data
  const userSocialMediaData = useSelector(userSocialMediaDataState);

  const socialLinks = userSocialMediaData?.socialLinks;

  // @ get current state of user profile
  const userProfile = useSelector(userProfileState);

  return (
    <div className="flex flex-wrap justify-around items-center m-5">
      {socialLinks?.map((socialMedia, index) => {
        const Icon = iconMap[socialMedia.platform.toLowerCase()] || FaGlobe;

        return (
          <div key={index} className="w-36 p-2">
            <Link
              to={socialMedia.url}
              target="_blank"
              className="flex flex-col flex-wrap items-center justify-center"
            >
              <Icon
                className="text-5xl m-3"
                style={{ color: colorMap[socialMedia.platform.toLowerCase()] }}
              />
              <h2 className="text-xl font-semibold mb-2">
                {socialMedia.platform}
              </h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaListComponent;
