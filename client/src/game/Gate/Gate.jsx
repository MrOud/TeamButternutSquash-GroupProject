import "../commonStyles/common.css";
export default function Gate({ setCurrentPage }) {
  return (
    <>
      <h2>The Gates</h2>
      <p>
        From here expeditions are launched to search for gold, glory, and
        discovery!
      </p>
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
