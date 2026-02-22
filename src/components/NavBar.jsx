import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pokemon-logo.png";

export default function Navbar({ onTogglePurify }) {
  const [shocking, setShocking] = useState(false);

  const handleLogoClick = () => {
    setShocking(true);

    if (onTogglePurify) {
      onTogglePurify(); // 🔥 Toggle feed mode
    }

    setTimeout(() => {
      setShocking(false);
    }, 800);
  };

  return (
    <div className="navbar">
      <div className="nav-inner">

        <div
          className={`logo ${shocking ? "shock-mode" : ""}`}
          onClick={handleLogoClick}
        >
          <img src={logo} alt="pokemon-logo" />
          <span>Team Rocket</span>
        </div>

        <div className="nav-links">
          <Link to="/">Feed</Link>
          <Link to="/create">Create</Link>
          <Link to="/help">Help</Link>
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}