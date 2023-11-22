import "../commonStyles/common.css";

export default function WeaponSmith({ setCurrentPage }) {
  return (
    <>
      <h2>The Weapon Smith</h2>
      <p>Here you can purchase Weapons</p>
      <p
        className="gameLink"
        onClick={() => {
          setCurrentPage("Town");
        }}
      >
        Back to Town
      </p>
    </>
  );
}
