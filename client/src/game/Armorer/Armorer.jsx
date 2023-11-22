export default function Armorer({ setCurrentPage }) {
  return (
    <>
      <h2>The Armorer's</h2>
      <p>Here you can purchase Armor</p>
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
