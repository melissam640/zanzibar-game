//App.js
import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';
import Header from './components/Header.js';
import ScoreBoard from './components/ScoreBoard.js';
import Dice from './components/Dice.js';

//dice
import one from "./assets/dice-one.png";
import two from "./assets/dice-two.png";
import three from "./assets/dice-three.png";
import four from "./assets/dice-four.png";
import five from "./assets/dice-five.png";
import six from "./assets/dice-six.png";

const diceImages = [one, two, three, four, five, six];

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  const [diceDisplay, setDiceDisplay] = useState("none");
  const [diceValues, setDiceValues] = useState([1, 1, 1]);

  const rollDice = async () => {
    try {
      const response = await axios.get('http://localhost:8080/roll-dice');
      setDiceValues(response.data);
      setDiceDisplay("");
      console.log("Roll button triggered", response.data);
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  }

  return (
    <div className="App">
      <Header />
      <ScoreBoard compTokens="10" userTokens="10" />
      <Dice
        die1={diceImages[diceValues[0] - 1]}
        die2={diceImages[diceValues[1] - 1]}
        die3={diceImages[diceValues[2] - 1]}
        style={{display: diceDisplay}}
      />
      <Button onClick={rollDice} style={{top: "80%", right: "45%", position: "absolute"}}>Roll Dice</Button>
    </div>
  );
}

export default App;
