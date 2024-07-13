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

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  const [diceDisplay, setDiceDisplay] = useState("none");

  const rollDice = () => {
    setDiceDisplay("");
    console.log("Roll button triggered")
  }

  return (
    <div className="App">
      <Header />
      <ScoreBoard compTokens="10" userTokens="10" />
      <Dice die1={one} die2={two} die3={three} style={{display: diceDisplay}}/>
      <Button onClick={rollDice} style={{top: "80%", right: "45%", position: "absolute"}}>Roll Dice</Button>
    </div>
  );
}

export default App;
