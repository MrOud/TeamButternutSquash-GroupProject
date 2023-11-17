import { Link } from "react-router-dom";
import AuthManager from "../../auth/auth-helper";
import { useNavigate } from "react-router-dom";

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
      <Link to="/">Home</Link>

      {!auth.isAuthenticated() && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}

      {auth.isAuthenticated() && (
        <>
          <Link to="/play">Play</Link>
          <Link to="/profile"> {user.name}&lsquo;s Profile</Link>
          <Link to={"/"} onClick={clickSignout}>
            Sign Out
          </Link>
        </>
      )}
    </div>
  );

  function clickSignout() {
    auth.clearJWT();
    navigate("/");
  }
}
