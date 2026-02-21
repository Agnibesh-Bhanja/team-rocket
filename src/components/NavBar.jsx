import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <Link to="/">Feed</Link> |{" "}
      <Link to="/create">Create Post</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}