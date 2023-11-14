import { Route, Routes } from "react-router-dom";
import Landing from "./src/core/Landing.jsx";
import SignUp from "./src/core/SignUp.jsx";
import SignIn from "./src/core/SignIn.jsx";
import GameExperience from "./src/core/GameExperience.jsx";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/play" element={<GameExperience />} />
      </Routes>
    </>
  );
};

export default AppRouter;
