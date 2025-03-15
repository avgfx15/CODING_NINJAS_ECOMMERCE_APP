import React from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";

const HomeComponent = () => {
  return (
    <div className="h-screen border-t-2 border-gray-600">
      <h1>Home Component</h1>
      <CarouselComponent />
    </div>
  );
};

export default HomeComponent;
