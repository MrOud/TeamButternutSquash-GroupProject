import { Link } from "react-router-dom";
import AuthManager from "../../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import "../css/navigation.css";

export default function Navigation() {
  const auth = new AuthManager();
  const navigate = useNavigate();

  //get user data
  let user;
  if (auth.isAuthenticated()) {
    user = JSON.parse(sessionStorage.getItem("user"));
  }

  return (
    <div className="navigationBar">
      <Link to="/">
        <div className="logo">
          <img src="/tbns.svg" alt="logo" height="80px"/>
          <h1>L.O.R.E.</h1>
        </div>
      </Link>

      <div className="mainNav">
        <Link to="/">Home</Link>

        {auth.isAuthenticated() && (
          <>
            <Link to="/play">Play</Link>
            <Link to="/profile"> {JSON.parse(sessionStorage.getItem("user")).player.name}</Link>
          </>
        )}
      </div>

      <div className="authNav">
        {!auth.isAuthenticated() && (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </>
        )}

        {auth.isAuthenticated() && (
          <>
            <p>Welcome, {user.name}!</p>
            <Link to="/" onClick={clickSignout}>
              Sign Out
            </Link>
          </>
        )}
      </div>

    </div>
  );

  function clickSignout() {
    auth.clearJWT();
    navigate("/");
  }
}
