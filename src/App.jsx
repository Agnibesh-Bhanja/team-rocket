import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/login";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}