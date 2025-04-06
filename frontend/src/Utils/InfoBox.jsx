import React, { useState } from "react";

import { FaEdit, FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateUserProfileAction } from "../redux/userRedux/userActions";

// ^ InfoBox Main Component
const InfoBox = ({ label, initialValue, placeholder }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const [inputValue, setInputValue] = useState(initialValue || "");
  const [isEditing, setIsEditing] = useState(false);

  // @ errorMessage state
  const [errorMessage, setErrorMessage] = useState("");

  // $ Handle input change
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
      const result = dispatch(updateUserProfileAction(formData));
      // @ check if result is a boolean
      if (updateUserProfileAction.rejected.match(result)) {
        setErrorMessage(result.payload.message);
      }
      // ^ If result is not a boolean, it means the action was successful
      else {
        setIsEditing(false); // Exit edit mode
        setErrorMessage(""); // Clear error message
        setInputValue(""); // Clear the input value after submission
        setFormData({}); // Clear the input data after submission
      }
    } catch (error) {
      console.error("Error updating name:", error);
      setErrorMessage(
        "Failed to update name. Please try again." + " -- " + error.message
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-3 p-2">
      {/* Label */}
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <div className="lg:w-3/12">
        <label className="font-semibold">{label}</label>
      </div>

      {/* Input / Display */}
      <div className="border rounded-lg lg:w-7/12 min-h-[36px] shadow-sm p-2 mr-2">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              name={label.toLowerCase()}
              onChange={handleChange}
              className="p-1 w-full border rounded-md"
              autoFocus
            />
          </form>
        ) : (
          <span>
            {initialValue || (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
        )}
      </div>

      {/* Edit & Save Buttons */}
      {label !== "Username" && label !== "Email" && label !== "Role" && (
        <div className="flex lg:w-2/12 text-center">
          {!isEditing ? (
            <button
              className="btn btn-square btn-ghost text-xl"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </button>
          ) : (
            <button
              className="btn btn-square btn-ghost text-xl"
              type="submit"
              onClick={handleSubmit}
            >
              <FaSave />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoBox;
