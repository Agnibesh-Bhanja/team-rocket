import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Help from "./pages/Help";
import Login from "./pages/login";

export default function App() {
  const [purifyMode, setPurifyMode] = useState(false);

  return (
    <div className={purifyMode ? "app red-theme" : "app"}>
      <Navbar onTogglePurify={() => setPurifyMode(prev => !prev)} />

      <Routes>
        <Route path="/" element={<Feed purifyMode={purifyMode} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}