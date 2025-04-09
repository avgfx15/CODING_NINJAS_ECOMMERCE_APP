// | import react hook
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";
import { addUserProfileAction } from "../../redux/userRedux/userActions";
import { userProfileErrorState } from "../../redux/userRedux/userSlice";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

// ^ AddPersonal Profile Component
const AddPersonalProfileComponent = () => {
  // @ dispatch variable
  const dispatch = useDispatch();

  // @ formData state
  const [formData, setFormData] = useState({});

  // @ errorMessage state
  const [errorMessage, setErrorMessage] = useState("");

  // @ getGenders variable
  const getGenders = ["Male", "Female", "Other"];

  // @ loggedInUser state
  const loggedInUser = useSelector(loggedInUserState);

  // @ errorMessage state
  const userProfileErrorMessage = useSelector(userProfileErrorState);

  // # Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // @ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ^ set error message
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    try {
      const result = await dispatch(addUserProfileAction(formData));

      // @ check if result is a boolean
      if (addUserProfileAction.rejected.match(result)) {
        setErrorMessage(result.payload.message);
      } else {
        setFormData({});
        setRefreshTrigger((prev) => !prev); // Refresh profile in parent component
      }
    } catch (error) {
      setErrorMessage(userProfileErrorMessage + " -- " + error.message);
    }
  };
  // & render Component
  return (
    <div className="container2 w-11/12 rounded-box shadow-md mx-auto my-3">
      <h1 className="text-3xl font-bold m-3 text-center">
        Add Personal Profile
      </h1>
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <form onSubmit={handleSubmit} className="w-full p-3">
        <div className="flex justify-center items-center w-full">
          <div className="w-1/2">
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">Name </legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your Name"
                name="name"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">Mobile </legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your Mobile No"
                name="mobile"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">Age </legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your Age"
                name="age"
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset text-lg">
              <legend className="fieldset-legend">Gender</legend>
              <select
                defaultValue="Pick a Gender"
                className="select"
                onChange={handleChange}
                name="gender"
              >
                <option disabled={true}>Pick a Gender</option>
                {getGenders.map((gender, index) => (
                  <option key={index} value={gender} className="">
                    {gender}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <div className="w-1/2">
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">Street</legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your Street"
                name="street"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">City</legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your City"
                name="city"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">State</legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your State"
                name="state"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">Zip</legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your Zip Code"
                name="zip"
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset flex flex-row text-lg">
              <legend className="fieldset-legend">Country</legend>
              <input
                type="text"
                className="input"
                placeholder="Please Enter Your Country"
                name="country"
                onChange={handleChange}
              />
            </fieldset>
          </div>
        </div>

        <button className="btn btn-success my-3" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default AddPersonalProfileComponent;
