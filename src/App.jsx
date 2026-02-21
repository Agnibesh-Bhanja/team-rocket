import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;