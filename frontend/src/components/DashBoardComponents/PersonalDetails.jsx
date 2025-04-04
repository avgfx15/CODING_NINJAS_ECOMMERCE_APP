// | import react hook
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// | import userProfile Current state
import { userProfileState } from "../../redux/userRedux/userSlice";

// | import loggedInUser Current state
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";

// | import InfoBoc Component
import InfoBox from "../../Utils/InfoBox";

// | import icon from react-icon
import { FaEdit, FaSave } from "react-icons/fa";
import AddPersonalProfileComponent from "./AddPersonalProfileComponent";
import { getUserProfileByLoggedInUserAction } from "../../redux/userRedux/userActions";

// ^ Personal Details Component
const PersonalDetails = () => {
  // @ dispatch variable
  const dispatch = useDispatch();
  // @ state variable
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  // @ state for isEditName boolean
  const [isEditName, setIsEditName] = useState(false);

  // @ state for input value
  const [inputValue, setInputValue] = useState("");

  // @ get current state of user profile
  const userProfile = useSelector(userProfileState);

  // @ get current state of logged in user
  const loggedInUser = useSelector(loggedInUserState);

  // % Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // % Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // ^ set error message
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);

    try {
    } catch (error) {
      console.error("Error updating name:", error);
    }

    setIsEditName(false); // Exit editing mode
  };

  useEffect(() => {
    if (refreshTrigger) {
      dispatch(getUserProfileByLoggedInUserAction());
    }
  }, [refreshTrigger]);

  // & Component Render
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
      {!userProfile ? (
        <AddPersonalProfileComponent setRefreshTrigger={setRefreshTrigger} />
      ) : (
        <>
          <div className="flex justify-center items-center w-full">
            <h1 className="text-3xl font-bold m-3">{userProfile?.name}</h1>

            {!isEditName ? (
              <button
                className="btn btn-square btn-ghost text-xl"
                onClick={() => setIsEditName(true)}
              >
                <FaEdit />
              </button>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={inputValue}
                    name="name"
                    onChange={handleChange}
                    className="p-1 w-full border rounded-md"
                    autoFocus
                  />
                </form>
                <button
                  className="btn btn-square btn-ghost text-xl"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FaSave />
                </button>
              </>
            )}
          </div>

          <div className="hero-content flex-col lg:flex-row justify-center items-center w-11/12">
            <div className="flex flex-col xl:flex-row flex-wrap justify-center xl:justify-around items-center w-full mx-auto">
              <div className="w-10/12 xl:w-5/12 container2 mb-3 xl:mb-0">
                <InfoBox
                  label="Username"
                  initialValue={loggedInUser.username}
                  placeholder="Username not available"
                />
                <InfoBox
                  label="Email"
                  initialValue={loggedInUser.email}
                  placeholder="Email not available"
                />

                <InfoBox
                  label="Role"
                  initialValue={loggedInUser.role}
                  placeholder="Role not available"
                />
              </div>
              <div className="container2 w-10/12 xl:w-5/12">
                <InfoBox
                  label="Mobile"
                  initialValue={userProfile?.mobile}
                  placeholder="Mobile No not available"
                />
                <InfoBox
                  label="Age"
                  initialValue={userProfile?.age}
                  placeholder="Age not available"
                />
                <InfoBox
                  label="Gender"
                  initialValue={userProfile?.gender}
                  placeholder="Gender not available"
                />
              </div>
            </div>
          </div>
          <div className="container2 w-10/12 rounded-box shadow-md">
            <InfoBox
              label="Address"
              initialValue={userProfile?.address?.street}
              placeholder="Address not available"
            />
            <InfoBox
              label="City"
              initialValue={userProfile?.address?.city}
              placeholder="City not available"
            />
            <InfoBox
              label="State"
              initialValue={userProfile?.address?.state}
              placeholder="State not available"
            />
            <InfoBox
              label="Country"
              initialValue={userProfile?.address?.country}
              placeholder="Country not available"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalDetails;
