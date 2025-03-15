import React, { useEffect } from "react";

import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import { selectTheme } from "./redux/themeSlice";
import { useSelector } from "react-redux";
import FooterComponent from "./components/FooterComponent/FooterComponent";

const App = () => {
  const theme = useSelector(selectTheme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="w-full h-full">
      <NavbarComponent />{" "}
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
      <FooterComponent />
    </div>
  );
};

export default App;
