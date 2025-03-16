import React from "react";

import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="loadingContainer">
      <div class="loader">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
