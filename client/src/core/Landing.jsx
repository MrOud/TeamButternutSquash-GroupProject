import { useState, useEffect } from "react";
import Navigation from "./UIpartials/Navigation";
import "./css/landing.css";

export default function Landing() {
  const backgroundImages = [
    "/exploration/environments/hills.webp",
    "/exploration/environments/forest_2.webp",
    "/exploration/environments/mountains.webp",
    "/exploration/environments/desert_2.webp",
    "/exploration/environments/dungeon_entrance.webp",
  ];

  const [bkgndSelected, setBkgndSelected] = useState(backgroundImages[0]);
  useEffect(() => {
    let bkgndRandom = Math.floor(Math.random() * backgroundImages.length);
    setBkgndSelected(backgroundImages[bkgndRandom]);
  }, []);
  return (
    <>
      <div className="main">
        <Navigation />
        <div className="titleBar">
          <h1>L.O.R.E</h1>
          <h2>Legends Of Roaming & Exploration</h2>
        </div>
        <p className="contentPara">
          Welcome to the Legends Of Roaming & Exploration (LORE). LORE is
          inspired by the BBS (Bulletin Board Systems) Door Games from a time
          before the internet was ubiquitous. Often BBSes were run by
          individuals who simply kept a dedicated computer connected to a phone
          line - the users of these systems would dial into the computer which
          meant only one person could be connected at a time (well, one caller
          and the local sysadmin) which meant that while door games were a
          multiplayer experience, they were not a shared experience like we’re
          used to with multi-player games today. While LORE does not restrict
          the service to only one user at a time it does focus on the experience
          of the individual player while being a part of a community
        </p>

        <div className="teamCard">
          <h2>Team Butternut Squash</h2>
          <h3>COMP229 - Sec. 401</h3>
          <ul>
            <li>Kris Oud</li>
            <li>Chris Busse</li>
            <li>Anna Lomadze</li>
            <li>Eman Alkhatib</li>
            <li>Benjamin Nge</li>
            <li>Barath Srinivasan</li>
          </ul>
        </div>
      </div>
      <div className="backgroundImage">
        <img src={bkgndSelected}></img>
      </div>
    </>
  );
}
