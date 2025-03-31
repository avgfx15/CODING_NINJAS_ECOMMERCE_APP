import React from "react";
import { useSelector } from "react-redux";
import { userProfileState } from "../../redux/userRedux/userSlice";
import InfoBox from "../../Utils/InfoBox";

const PersonalDetails = () => {
  const userProfile = useSelector(userProfileState);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-3">
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

      <h1 className="text-3xl font-bold my-3">{userProfile?.name}</h1>
      <div className="hero-content flex-col lg:flex-row justify-center items-center w-11/12">
        <div className="flex flex-col xl:flex-row flex-wrap justify-center xl:justify-around items-center w-full mx-auto">
          <div className="w-10/12 xl:w-5/12 container2 mb-3 xl:mb-0">
            <InfoBox
              label="Username"
              value={userProfile?.userId?.username}
              placeholder="Mobile No not available"
            />
            <InfoBox
              label="Email"
              value={userProfile?.userId?.email}
              placeholder="Mobile No not available"
            />

            <InfoBox
              label="Role"
              value={userProfile?.userId?.role}
              placeholder="Mobile No not available"
            />
          </div>
          <div className="container2 w-10/12 xl:w-5/12">
            <InfoBox
              label="Mobile No"
              value={userProfile?.mobile}
              placeholder="Mobile No not available"
            />
            <InfoBox
              label="Age"
              value={userProfile?.age}
              placeholder="Mobile No not available"
            />
            <InfoBox
              label="Gender"
              value={userProfile?.gender}
              placeholder="Mobile No not available"
            />
          </div>
        </div>
      </div>
      <div className="container2 w-10/12 rounded-box shadow-md">
        <InfoBox
          label="Address"
          value={userProfile?.address?.street}
          placeholder="Mobile No not available"
        />
        <InfoBox
          label="City"
          value={userProfile?.address?.city}
          placeholder="Mobile No not available"
        />
        <InfoBox
          label="State"
          value={userProfile?.address?.state}
          placeholder="Mobile No not available"
        />
        <InfoBox
          label="Country"
          value={userProfile?.address?.country}
          placeholder="Mobile No not available"
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
