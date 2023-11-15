import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navigationBar">
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/play">Play</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}
