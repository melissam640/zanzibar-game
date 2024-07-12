import "./Dice.css";

const Dice = (props) => {
    return (
      <div className="Dice-section">
        <img className="Die" src={props.die1} />
        <img className="Die" src={props.die2} />
        <img className="Die" src={props.die3} />
      </div>
    );
  }
  
  export default Dice;
