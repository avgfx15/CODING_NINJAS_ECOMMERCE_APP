import React from "react";

import { FaEdit } from "react-icons/fa";

const InfoBox = ({ label, value, placeholder }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-3 p-2">
      <div className="lg:w-4/12 w-">
        <label className="font-semibold">{label}</label>
      </div>
      <div className="border rounded-lg lg:w-7/12 min-h-[36px] shadow-sm p-2 mr-2">
        {value ? value : <span className="text-gray-400">{placeholder}</span>}
      </div>
      <div className="lg:w-1/12 text-center">
        <button className="btn btn-square btn-ghost text-xl">
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default InfoBox;
