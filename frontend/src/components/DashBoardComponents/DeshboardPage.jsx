import React, { useEffect, useState } from "react";
import DashBoardSideBar from "./DashBoardSideBar";
import { useLocation } from "react-router";
import EducationalDetails from "./EducationalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import SocialMedia from "./SocialMedia";
import PersonalDetails from "./PersonalDetails";
import DashBoardComponent from "./DashBoardComponent";

const DashboardPage = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="flex flex-row min-h-screen">
      <DashBoardSideBar />

      <div className="flex-1 p-7 w-full">
        {/* {tab === "dashboard" && <DashBoardComponent />} */}
        {tab === "personaldetails" && <PersonalDetails />}
        {tab === "socialmedia" && <SocialMedia />}
        {tab === "professionaldetails" && <ProfessionalDetails />}
        {tab === "educationdetails" && <EducationalDetails />}
      </div>
    </div>
  );
};

export default DashboardPage;
