import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileState } from "../../redux/userRedux/userSlice";
import { Link, useLocation } from "react-router";

import {
  HiArrowSmRight,
  HiUser,
  HiUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";

import { MdPersonalInjury } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi2";
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";
import { logoutUserAction } from "../../redux/authRedux/AuthActions";

const DashBoardSideBar = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const location = useLocation();

  const loggedInUser = useSelector(loggedInUserState);
  const userProfile = useSelector(userProfileState);
  console.log(userProfile);

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
      <div className="drawer xl:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button xl:hidden"
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
          <ul className="menu container2 min-h-full w-60 p-4">
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
              {userProfile?.name}
            </h2>
            <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
              <Link to="/dashboard?tab=personaldetails">
                <div
                  className="flex"
                  active={tab === "personaldetails"}
                  label={loggedInUser.isAdmin ? "Admin" : "User"}
                  labelColor="dark"
                  as="div"
                >
                  <MdPersonalInjury /> Personal Details
                </div>
              </Link>
            </li>
            <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
              <Link to="/dashboard?tab=socialmedia">
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
              <Link to="/dashboard?tab=professionaldetails">
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
              <Link to="/dashboard?tab=educationdetails">
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
    </div>
  );
};

export default DashBoardSideBar;
