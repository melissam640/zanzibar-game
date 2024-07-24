//App.js
import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';
import Header from './components/Header.js';
import ScoreBoard from './components/ScoreBoard.js';
import Dice from './components/Dice.js';

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
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [winnerMessage, setWinnerMessage] = useState("");
  const [tokensMessage, setTokensMessage] = useState("");
  // TODO: add feature for user to specify starting tokens
  const [userTokens, setUserTokens] = useState(10);
  const [compTokens, setCompTokens] = useState(10);
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [userTokensExchanged, setUserTokensExchanged] = useState(0);
  const [compTokensExchanged, setCompTokensExchanged] = useState(0);
  const [showRollButton, setShowRollButton] = useState(true);
  const [showConButton, setShowConButton] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  
  const rollDice = async () => {
    try {
      const response = await axios.get('http://localhost:8080/roll-dice');
      setDiceValues(response.data);
      setDiceDisplay("");
      console.log("Roll button triggered", response.data);

      setShowRollButton(false);
      setShowConButton(true);
      getScore(response.data);

    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  }

  const computerRoll = async () => {
    try {
      const response = await axios.get('http://localhost:8080/roll-dice');
      setDiceValues(response.data);
      console.log("Computer roll button triggered", response.data);

      setShowConButton(false);
      setShowEndButton(true);
      getCompScore(response.data);

    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  }

  const getScore = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/get-score', {
        data: values
      });
      const [score, tokensExchanged, message] = response.data;

      setScore(score);
      setMessage(message);
      setUserTokensExchanged(tokensExchanged);
      setUserScore(score);
      console.log('Data sent:', response.data);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const getCompScore = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/get-score', {
        data: values
      });
      const [score, tokensExchanged, message] = response.data;

      setScore(score);
      setMessage(message);
      setCompTokensExchanged(tokensExchanged);
      setCompScore(score);
      console.log('Data sent:', response.data);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const endRound = async () => {
    try {
      const response = await axios.post('http://localhost:8080/get-round-winner', {
        userScore: userScore,
        compScore: compScore,
        userTokens: userTokens,
        compTokens: compTokens,
        userTokensExchanged: userTokensExchanged,
        compTokensExchanged: compTokensExchanged
      });
      const [message1, message2, newUserTokens, newCompTokens] = response.data;
      setWinnerMessage(message1);
      setTokensMessage(message2);
      setUserTokens(newUserTokens);
      setCompTokens(newCompTokens);
      setShowEndButton(false);
      setShowRollButton(true);
      console.log('Data sent:', response.data);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  return (
    <div className="App">
      <Header />
      <ScoreBoard compTokens={compTokens} userTokens={userTokens} />
      <Dice
        dieValue1={diceValues[0]}
        dieValue2={diceValues[1]}
        dieValue3={diceValues[2]}
        style={{display: diceDisplay}}
      />
      {/* TODO: move the styling to CSS file when ready to finish styling this button */}
      {showRollButton && (
        <Button onClick={rollDice} style={{top: "80%", right: "50%", position: "absolute"}}>Roll Dice</Button>
      )}
      {showConButton && (
        <Button onClick={computerRoll} style={{top: "80%", right: "50%", position: "absolute"}}>Continue</Button>
      )}
      {showEndButton && (
        <Button onClick={endRound} style={{top: "80%", right: "50%", position: "absolute"}}>End Round</Button>
      )}
      <p style={{top: "10%", right: "50%", position: "absolute", fontSize: "1.5em", color: "white"}}>{winnerMessage}</p>
      <p style={{top: "15%", right: "50%", position: "absolute", fontSize: "1.5em", color: "white"}}>{tokensMessage}</p>
      <p style={{top: "20%", right: "50%", position: "absolute", fontSize: "1.5em", color: "white"}}>{score}</p>
      <p style={{top: "25%", right: "50%", position: "absolute", fontSize: "1.5em", color: "white"}}>{message}</p>
      {/* <p style={{top: "30%", right: "50%", position: "absolute", fontSize: "1.5em", color: "white"}}>{tokensExchanged} tokens</p> */}
    </div>
  );
}

export default App;
