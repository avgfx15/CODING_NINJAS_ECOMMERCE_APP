import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileState } from "../../redux/userRedux/userSlice";
import { Link, useLocation } from "react-router";

import { HiArrowSmRight, HiUser } from "react-icons/hi";

import { loggedInUserState } from "../../redux/authRedux/AuthSlice";
import { logoutUserAction } from "../../redux/authRedux/AuthActions";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const location = useLocation();

  const loggedInUser = useSelector(loggedInUserState);
  const userProfile = useSelector(userProfileState);

  // # handle logout functionality
  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-full">
      {!userProfile ? (
        <div className="bg-gray-600 h-screen flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}

            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-300 text-base-content min-h-full w-60 p-4">
              {/* Sidebar content here */}
              <div className="avatar mx-auto mb-5">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                  <img
                    src={
                      userProfile?.profileImage
                        ? userProfile.profileImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s"
                    }
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">
                {userProfile.name}
              </h2>
              <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
                <Link to="/profile?tab=personaldetails">
                  <div
                    active={tab === "personaldetails"}
                    icon={HiUser}
                    label={loggedInUser.isAdmin ? "Admin" : "User"}
                    labelColor="dark"
                    as="div"
                  >
                    Personal Details
                  </div>
                </Link>
              </li>
              <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
                <Link to="/profile?tab=socialmedia">
                  <div
                    active={tab === "socialmedia"}
                    icon={HiUser}
                    label={loggedInUser.isAdmin ? "Admin" : "User"}
                    labelColor="dark"
                    as="div"
                  >
                    Social Media
                  </div>
                </Link>
              </li>
              <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
                <Link to="/profile?tab=professionaldetails">
                  <div
                    active={tab === "professionaldetails"}
                    icon={HiUser}
                    label={loggedInUser.isAdmin ? "Admin" : "User"}
                    labelColor="dark"
                    as="div"
                  >
                    Professional Details
                  </div>
                </Link>
              </li>
              <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
                <Link to="/profile?tab=educationdetails">
                  <div
                    active={tab === "educationdetails"}
                    icon={HiUser}
                    label={loggedInUser.isAdmin ? "Admin" : "User"}
                    labelColor="dark"
                    as="div"
                  >
                    Education Details
                  </div>
                </Link>
              </li>

              <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
                <Link to="/">
                  <div
                    icon={HiArrowSmRight}
                    className="cursor-pointer"
                    onClick={handleLogout}
                    labelColor="dark"
                    as="div"
                  >
                    Sign Out
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
