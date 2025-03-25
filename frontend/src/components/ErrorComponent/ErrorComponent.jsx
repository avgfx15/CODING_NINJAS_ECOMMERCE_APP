import React from "react";
import { NavLink } from "react-router";

const ErrorComponent = ({ message }) => {
  console.log(message);
  return (
    <div className="bg-red-600 border rounded-xl w-full my-3">
      <h3 className="text-2xl font-bold text-yellow-400 text-center">
        {message}
      </h3>
    </div>
  );
};

export default ErrorComponent;
