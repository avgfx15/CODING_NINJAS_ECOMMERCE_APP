import React, { useState } from "react";

import { FaEdit, FaSave } from "react-icons/fa";

const InfoBox = ({ label, initialValue, placeholder }) => {
  const [formData, setFormData] = useState({});

  const [inputValue, setInputValue] = useState(initialValue || "");
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputValue);
    console.log(formData);
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-3 p-2">
      {/* Label */}
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
