import React from "react";
import { NavLink } from "react-router";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>

      <NavLink to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back Home
      </NavLink>
    </div>
  );
};

export default ErrorComponent;
