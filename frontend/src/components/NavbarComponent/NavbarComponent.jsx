// | import useEffect
import React, { useEffect } from "react";

// | import react-redux hook
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

// | import ThemeComponent
import ThemeComponent from "../ThemeComponent/ThemeComponent";

// | import loading Component
import LoadingComponent from "../LoadingComponent/LoadingComponent";

// | import auth State
import {
  authLoadingState,
  isUserLoggedInState,
  loggedInUserState,
} from "../../redux/authRedux/AuthSlice";

// | import auth Actions
import { logoutUserAction } from "../../redux/authRedux/AuthActions";

// | import user State
import { userProfileState } from "../../redux/userRedux/userSlice";

// | import user Actions
import { getUserProfileByLoggedInUserAction } from "../../redux/userRedux/userActions";

// & Navbar Component
const NavbarComponent = () => {
  // @ dispatch variable
  const dispatch = useDispatch();

  // @ navigate variable
  const navigate = useNavigate();

  // @ loggedInUser State value
  const loggedInUser = useSelector(loggedInUserState);

  // @ userProfile State value
  const userProfile = useSelector(userProfileState);

  // @ authLoading State value
  const isUserLoggedIn = useSelector(isUserLoggedInState);

  // @ authLoading State value
  const authLoading = useSelector(authLoadingState);

  // # handle logout functionality
  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };

  // / Get LoggedInUser Profile
  useEffect(() => {
    if (isUserLoggedIn && loggedInUser) {
      console.log(loggedInUser);

      dispatch(getUserProfileByLoggedInUserAction(loggedInUser));
    } else {
      dispatch(logoutUserAction());
      navigate("/");
    }
  }, [dispatch, loggedInUser]);

  // ^ Navbar return render
  return (
    <div className="navbar  shadow-sm mx-auto border-b border-purple-100 px-5">
      <div className="navbar-start">
        {/* responsive Dropdown menu start  */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow container2"
          >
            <li>
              <NavLink to="/" className="hover:text-lg">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className="hover:text-lg">
                Category
              </NavLink>
              <ul className="p-2">
                <li>
                  <NavLink to="/cat" className="hover:text-lg">
                    Submenu 1
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cat" className="hover:text-lg">
                    Submenu 2
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/blog" className="hover:text-lg">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-lg">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus" className="hover:text-lg">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        {/* responsive Dropdown menu End  */}
        {/* Main Menu Start  */}
        {/* Main Head Name Start */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          OmniShop
        </NavLink>
        {/* Main Head Name End */}
      </div>

      {/* Main Menu Start  */}

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className="hover:text-lg">
              Home
            </NavLink>
          </li>

          <li>
            <details>
              <summary>Categories</summary>
              <ul className="p-2 container2 z-[1] w-36">
                <li>
                  <NavLink to="/cat" className="hover:text-lg">
                    Category 1
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cat" className="hover:text-lg">
                    Category 2
                  </NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-lg">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactus" className="hover:text-lg">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Main Menu End  */}
      {/* Right Menu Start  */}
      <div className="navbar-end">
        {/* Search Component Start */}
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />{" "}
          </svg>
        </button>
        {/* Search Component End  */}
        {/* Notification Component Start */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {/* Notification Component End  */}
        {/* ThemeComponent Start */}
        <ThemeComponent />
        {/* ThemeComponent End  */}
        {isUserLoggedIn ? (
          <div className="flex-none">
            {/* Cart Icon Start */}
            <div className="dropdown dropdown-end mr-3">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />{" "}
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>

              <div
                tabIndex={0}
                className="card card-compact dropdown-content z-1 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*  Cart Icon end  */}
            {/* Profile Component Start */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user Profile"
                    src={
                      userProfile?.profileImage
                        ? userProfile.profileImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content container2 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="">
                  <NavLink to="/profile" className="justify-between text-lg">
                    {userProfile?.name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" className="justify-between">
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button className="justify-between" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            {/* Profile Component End  */}
          </div>
        ) : (
          <div className="flex-none">
            {/* User not loggedIn then show login button Start  */}
            <button className="btn btn-primary">
              <NavLink to="/signin">Sign In</NavLink>
            </button>
            {/* User not loggedIn then show login button End  */}
          </div>
        )}
      </div>
      {/* Right Menu End  */}
    </div>
  );
};

export default NavbarComponent;
