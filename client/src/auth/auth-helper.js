class AuthManager {
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    cb();
  }

  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else return false;
  }

  clearJWT() {
    console.log("merp!");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
// Export the AuthManager class
export default AuthManager;
