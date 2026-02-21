import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid gray" }}>
      <Link to="/">Feed</Link> |{" "}
      <Link to="/create">Create</Link> |{" "}
      <Link to="/help">Help</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}