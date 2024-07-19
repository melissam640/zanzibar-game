import "./Dice.css";

//dice
import one from "../assets/dice-one.png";
import two from "../assets/dice-two.png";
import three from "../assets/dice-three.png";
import four from "../assets/dice-four.png";
import five from "../assets/dice-five.png";
import six from "../assets/dice-six.png";

const diceImages = [one, two, three, four, five, six];

const Dice = (props) => {
    return (
      <div className="Dice-section" style={props.style}>
        <img className="Die" src={diceImages[props.dieValue1 - 1]} />
        <img className="Die" src={diceImages[props.dieValue2 - 1]} />
        <img className="Die" src={diceImages[props.dieValue3 - 1]} />
      </div>
    );
  }
  
  export default Dice;
