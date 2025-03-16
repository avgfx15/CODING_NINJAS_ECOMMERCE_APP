import React from "react";

import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="loadingContainer">
      <div className="loader">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
