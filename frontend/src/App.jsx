import React, { useEffect } from "react";

import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import { selectTheme } from "./redux/themeSlice";
import { useSelector } from "react-redux";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import ProfileComponent from "./components/ProfileComponent/ProfileComponent";
import { loggedInUserState } from "./redux/authRedux/AuthSlice";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

const App = () => {
  const loggedInUser = useSelector(loggedInUserState);
  console.log(loggedInUser);

  const theme = useSelector(selectTheme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="w-full h-full">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        {loggedInUser && (
          <Route path="/profile" element={<ProfileComponent />} />
        )}
        <Route path="/signin" element={<AuthComponent />} />
        <Route path="/about" element={<h1 className="h-screen">About</h1>} />
        <Route
          path="/contactus"
          element={<h1 className="h-screen">Contact Us</h1>}
        />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
      <FooterComponent />
    </div>
  );
};

export default App;
