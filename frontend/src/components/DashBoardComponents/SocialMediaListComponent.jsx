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
  linkedIn: FaLinkedin,
  twitter: FaTwitterSquare,
  gitHub: FaGithubSquare,
  youTube: FaYoutubeSquare,
  website: FaGlobe,
  whatsApp: FaWhatsappSquare,
  pinterest: FaPinterestSquare,
  snapchat: FaSnapchatSquare,
  telegram: FaTelegramPlane,
  tiktok: FaTiktok,
  dribbble: FaDribbbleSquare,
};

const SocialMediaListComponent = () => {
  // @ get current state of logged in user
  const loggedInUser = useSelector(loggedInUserState);

  // @ get current state of user social media data
  const userSocialMediaData = useSelector(userSocialMediaDataState);
  console.log(userSocialMediaData);
  const socialLinks = userSocialMediaData?.socialLinks;
  console.log(socialLinks);
  console.log(
    socialLinks?.map((Links, url, index) => {
      console.log(Links.platform);
    })
  );
  // @ get current state of user profile
  const userProfile = useSelector(userProfileState);

  return (
    <div className="flex flex-wrap justify-around items-center m-5">
      {socialLinks?.map((socialMedia, index) => {
        const Icon = iconMap[socialMedia.platform.toLowerCase()] || FaGlobe;

        return (
          <div key={index} className="">
            <Link
              to={socialMedia.url}
              target="_blank"
              className="flex flex-col items-center justify-center"
            >
              <Icon className="text-3xl mb-2" />
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
