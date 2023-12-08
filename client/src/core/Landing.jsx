import Navigation from "./UIpartials/Navigation";

export default function Landing() {
  return (
    <div>
      <Navigation />
      <div className="main">
        <h1>L.O.R.E</h1>
        <h2>Legends Of Roaming & Exploration</h2>
        <p>
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
  );
}
