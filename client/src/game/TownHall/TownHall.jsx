import "../commonStyles/common.css";
export default function TownHall({ setCurrentPage }) {
  return (
    <>
      <h2>Town Hall</h2>
      <p>Here you can donate to improve building levels</p>
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
