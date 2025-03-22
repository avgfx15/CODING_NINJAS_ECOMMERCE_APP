import React from "react";
import { useSelector } from "react-redux";
import { userProfileState } from "../../redux/userRedux/userSlice";

const ProfileComponent = () => {
  const userProfile = useSelector(userProfileState);
  console.log(userProfile);

  return (
    <div className="min-h-full">
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
              <button>Profile</button>
            </li>
            <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl">
              <button>Profile</button>
            </li>
            <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl">
              <button>Profile</button>
            </li>
            <li className="text-lg font-bold hover:bg-gray-600 hover:text-white rounded-xl">
              <button>Profile</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
