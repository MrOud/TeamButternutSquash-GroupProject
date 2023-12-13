import "../common/common.css";
import "./TownSquare.css";

export default function TownSquare({ setCurrentPage }) {
  return (
    <div className="townSquare">
      <div className="text">
        <h2>The Town Square</h2>
        <p
          className="gameLink"
          onClick={() => {
            setCurrentPage("TownHall");
          }}
        >
          Town Hall
        </p>
        <p
          className="gameLink"
          onClick={() => {
            setCurrentPage("WepSmith");
          }}
        >
          The Weapon Smith
        </p>
        <p
          className="gameLink"
          onClick={() => {
            setCurrentPage("Armorer");
          }}
        >
          The Armorer's
        </p>
        <p
          className="gameLink"
          onClick={() => {
            setCurrentPage("TrainingFields");
          }}
        >
          Training Fields
        </p>
        <p
          className="gameLink"
          onClick={() => {
            setCurrentPage("Bank");
          }}
        >
          The Bank
        </p>
        <p
          className="gameLink"
          onClick={() => {
            setCurrentPage("Gate");
          }}
        >
          The Gates
        </p>
      </div>
      <img src="/town/town_square.webp" alt="town square"/>
    </div>
  );
}
