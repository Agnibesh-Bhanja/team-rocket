import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/login";
import Help from "./pages/Help";
import RocketControl from "./pages/RocketControl";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/rocket-control" element={<RocketControl />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;