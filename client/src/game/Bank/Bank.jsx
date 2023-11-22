import "../commonStyles/common.css";
export default function Bank({ setCurrentPage }) {
  return (
    <>
      <h2>The Bank</h2>
      <p>Here players can store gold to prevent losses during death</p>
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
