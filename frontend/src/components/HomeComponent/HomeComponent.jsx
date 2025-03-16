import React from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import { useSelector } from "react-redux";
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";

const HomeComponent = () => {
  const loggedInUser = useSelector(loggedInUserState);

  return (
    <div className="h-screen">
      <CarouselComponent />
    </div>
  );
};

export default HomeComponent;
