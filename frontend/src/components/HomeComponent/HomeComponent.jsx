import React, { useEffect } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserState } from "../../redux/authRedux/AuthSlice";
import { getUserProfileByLoggedInUserAction } from "../../redux/userRedux/userActions";

const HomeComponent = () => {
  return (
    <div className="min-h-screen">
      <CarouselComponent />
    </div>
  );
};

export default HomeComponent;
