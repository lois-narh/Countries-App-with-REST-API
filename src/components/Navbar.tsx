import React, { useState } from "react";
import { LuMoon } from "react-icons/lu";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <h1>Where in the world?</h1>
      <LuMoon className="moon-icon" />
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>Dark Mode</button>
    </nav>
  );
};

export default Navbar;
