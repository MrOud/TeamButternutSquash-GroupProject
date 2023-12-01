import "../common/common.css";

export default function TrainingField({ setCurrentPage }) {
  return (
    <>
      <h2>The Training Fields</h2>
      <p>Here you can challenge a trainer to level up or buy stat points</p>
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
