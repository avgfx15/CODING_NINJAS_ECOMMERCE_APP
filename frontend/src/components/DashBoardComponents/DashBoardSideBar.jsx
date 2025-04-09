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
    <div className="w-full">
      {/* Mobile Top Menu */}
      <div className="block container2 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{userProfile?.name}</h2>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard?tab=personaldetails">
                  <MdPersonalInjury /> Personal Info
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=socialmedia">
                  <TbSocial /> Social Media Info
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=professionaldetails">
                  <HiDocumentText /> Professional Info
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=educationdetails">
                  <PiStudentFill /> Education Info
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Drawer Sidebar for Desktop */}
      <div className="hidden xl:block drawer drawer-open w-72">
        <div className="drawer-side">
          <ul className="menu p-4 w-full min-h-screen bg-base-200 text-base-content">
            {/* Avatar + Name */}
            <div className="avatar mx-auto mb-5">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    userProfile?.profileImage?.url ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s"
                  }
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-5">
              {userProfile?.name}
            </h2>

            {/* Sidebar Menu */}
            <li>
              <Link to="/dashboard?tab=personaldetails">
                <MdPersonalInjury /> Personal Info
              </Link>
            </li>
            <li>
              <Link to="/dashboard?tab=socialmedia">
                <TbSocial /> Social Media Info
              </Link>
            </li>
            <li>
              <Link to="/dashboard?tab=professionaldetails">
                <HiDocumentText /> Professional Info
              </Link>
            </li>
            <li>
              <Link to="/dashboard?tab=educationdetails">
                <PiStudentFill /> Education Info
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
