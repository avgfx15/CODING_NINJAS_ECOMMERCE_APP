import React from "react";
import { useSelector } from "react-redux";
import { userProfileState } from "../../redux/userRedux/userSlice";

const PersonalDetails = () => {
  const userProfile = useSelector(userProfileState);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="avatar">
        <div className="w-28 rounded-full">
          <img
            className="rounded-3xl w-40 h-40"
            src={
              userProfile?.profileImage
                ? userProfile.profileImage
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXHyqEEcIEQzggUF5RIBe8g37M9n1guqKhg&s"
            }
          />
        </div>
      </div>

      <h1 className="text-3xl font-bold my-3">{userProfile.name}</h1>
      <div className="hero-content flex-col lg:flex-row w-11/12">
        <div className="flex flex-col lg:flex-row items-center justify-between w-96">
          <div className="w-1/2">
            <p>
              <span className="font-bold mr-3">Username : </span>
              <span>{userProfile.userId.username}</span>
            </p>
            <p>
              <span className="font-bold">Email : </span>
              <span>{userProfile.userId.email}</span>
            </p>
            <p>
              <span className="font-bold">Role : </span>
              <span>{userProfile.userId.role}</span>
            </p>
          </div>
          <div className="w-1/2">
            <p>
              <span className="font-bold">Mobile No : </span>
              <span>{userProfile.mobile}</span>
            </p>
            <p>
              <span className="font-bold">Age : </span>
              <span>{userProfile.age} years</span>
            </p>
            <p>
              <span className="font-bold">Gender : </span>
              <span>{userProfile.gender}</span>
            </p>
          </div>
        </div>
      </div>

      <ul className="list container2 w-11/12 rounded-box shadow-md">
        <li className="p-4 text-xl tracking-wide">Personal Details</li>
        <li className="list-row">
          <p>Address :</p>
          <p>{userProfile.address.street}</p>
          <button className="btn btn-square btn-ghost">Edit</button>
        </li>
        <li className="list-row">
          <p>City :</p>
          <p>{userProfile.address.city}</p>
          <button className="btn btn-square btn-ghost">Edit</button>
        </li>
        <li className="list-row">
          <p>State :</p>
          <p>{userProfile.address.state}</p>
          <button className="btn btn-square btn-ghost">Edit</button>
        </li>
        <li className="list-row">
          <p>Country :</p>
          <p>{userProfile.address.country}</p>
          <button className="btn btn-square btn-ghost">Edit</button>
        </li>
      </ul>
    </div>
  );
};

export default PersonalDetails;
