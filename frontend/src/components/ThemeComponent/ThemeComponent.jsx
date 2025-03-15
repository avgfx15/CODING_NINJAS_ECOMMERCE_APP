import React, { useEffect, useState } from "react";
import "./theme.css";
import { selectTheme, setTheme } from "../../redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const ThemeComponent = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  const themes = [
    "theme-light",
    "theme-dark",
    "theme-cyberpunk",
    "theme-retro",
    "theme-aqua",
  ];

  return (
    <div className="dropdown dropdown-hover mx-2">
      <div tabIndex={0} role="button" className="">
        Theme
        <svg
          width="15px"
          height="15px"
          className="inline-block h-2 w-2 mx-1.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 mt-5 shadow  rounded-box w-52"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <a onClick={() => dispatch(setTheme(theme))}>
              {theme.replace("theme-", "").toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeComponent;
