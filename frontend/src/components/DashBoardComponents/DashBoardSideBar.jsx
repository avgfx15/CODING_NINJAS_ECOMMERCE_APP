import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileState } from "../../redux/userRedux/userSlice";
import { Link, useLocation } from "react-router"; // Import Link from react-router

import {
  HiArrowSmRight,
  HiUser,
  HiUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";

import { MdDelete, MdPersonalInjury } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";

import { HiDocumentText } from "react-icons/hi2";
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";
import { logoutUserAction } from "../../redux/authRedux/AuthActions";

const DashBoardSideBar = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const location = useLocation();

  const loggedInUser = useSelector(loggedInUserState);
  const userProfile = useSelector(userProfileState);

  // # handle logout functionality
  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  // - Handle delete account functionality
  const handleDeleteAccount = () => {
    console.log("Handle delete account");
    dispatch(logoutUserAction());
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  // Function to check if a link is active
  const isActive = (path) => {
    const currentPath = location.pathname + location.search;
    return currentPath === path;
  };

  return (
    <div className="h-lvh">
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
          <ul className="menu container2 h-lvh w-60 p-3">
            {/* Sidebar content here */}
            <div className="avatar mx-auto mb-5">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img
                  src={
                    userProfile?.profileImage?.url
                      ? userProfile.profileImage?.url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s"
                  }
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">
              {userProfile?.name}
            </h2>
            <li className="text-lg font-bold rounded-xl transition-colors duration-500 ease-in-out">
              <Link
                to="/dashboard?tab=personaldetails"
                className={`flex items-center gap-2 hover:bg-gray-600 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out p-2 ${
                  isActive("/dashboard?tab=personaldetails")
                    ? "bg-gray-600 text-white"
                    : ""
                }`}
              >
                <MdPersonalInjury /> Personal Info
              </Link>
            </li>
            <li className="text-lg font-bold rounded-xl transition-colors duration-500 ease-in-out">
              <Link
                to="/dashboard?tab=socialmedia"
                className={`flex items-center gap-2 hover:bg-gray-600 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out p-2 ${
                  isActive("/dashboard?tab=socialmedia")
                    ? "bg-gray-600 text-white"
                    : ""
                }`}
              >
                <TbSocial /> Social Media Info
              </Link>
            </li>
            <li className="text-lg font-bold rounded-xl transition-colors duration-500 ease-in-out">
              <Link
                to="/dashboard?tab=professionaldetails"
                className={`flex items-center gap-2 hover:bg-gray-600 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out p-2 ${
                  isActive("/dashboard?tab=professionaldetails")
                    ? "bg-gray-600 text-white"
                    : ""
                }`}
              >
                <HiDocumentText /> Professional Info
              </Link>
            </li>
            <li className="text-lg font-bold rounded-xl transition-colors duration-500 ease-in-out">
              <Link
                to="/dashboard?tab=educationdetails"
                className={`flex items-center gap-2 hover:bg-gray-600 hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out p-2 ${
                  isActive("/dashboard?tab=educationdetails")
                    ? "bg-gray-600 text-white"
                    : ""
                }`}
              >
                <PiStudentFill />
                Education Info
              </Link>
            </li>
            <li className="text-lg font-bold rounded-xl transition-colors duration-500 ease-in-out">
              <Link
                to="/"
                className="flex items-center gap-2 cursor-pointer p-2"
                onClick={handleDeleteAccount}
              >
                <MdDelete />
                Delete My Account
              </Link>
            </li>

            <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl hover:transition-all hover:duration-500 hover:ease-in-out transition-colors duration-500 ease-in-out">
              <Link
                to="/"
                className="flex items-center gap-2 cursor-pointer p-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
