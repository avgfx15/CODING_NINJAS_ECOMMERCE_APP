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

import { loggedInUserState } from "./redux/authRedux/AuthSlice";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import { userProfileState } from "./redux/userRedux/userSlice";
import DashboardPage from "./components/DashBoardComponents/DeshboardPage";

const App = () => {
  const loggedInUser = useSelector(loggedInUserState);

  const theme = useSelector(selectTheme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavbarComponent />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          {loggedInUser && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
            </>
          )}
          <Route path="/signin" element={<AuthComponent />} />
          <Route path="/about" element={<h1 className="h-screen">About</h1>} />
          <Route
            path="/contactus"
            element={<h1 className="h-screen">Contact Us</h1>}
          />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </main>
      <FooterComponent />
    </div>
  );
};

export default App;
