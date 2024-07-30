//App.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
  const [roundInfo, setRoundInfo] = useState("Your Turn");
  const [message, setMessage] = useState("Click Roll Dice");
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
      const response = await axios.get("http://localhost:8080/roll-dice");
      setDiceValues(response.data);
      setDiceDisplay("");

      setShowRollButton(false);
      setShowConButton(true);
      setRoundInfo("Your Turn");
      getScore(response.data);

    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  }

  const computerRoll = async () => {
    try {
      const response = await axios.get("http://localhost:8080/roll-dice");
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
      const response = await axios.post("http://localhost:8080/get-score", {
        data: values
      });
      const [score, tokensExchanged, message] = response.data;

      setScore(score);
      setMessage(message);
      setUserTokensExchanged(tokensExchanged);
      setUserScore(score);

    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  const getCompScore = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/get-score", {
        data: values
      });
      const [score, tokensExchanged, message] = response.data;

      setScore(score);
      setRoundInfo("Computer's Turn")
      setMessage(message);
      setCompTokensExchanged(tokensExchanged);
      setCompScore(score);

    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  const endRound = async () => {
    try {
      const response = await axios.post("http://localhost:8080/get-round-winner", {
        userScore: userScore,
        compScore: compScore,
        userTokens: userTokens,
        compTokens: compTokens,
        userTokensExchanged: userTokensExchanged,
        compTokensExchanged: compTokensExchanged
      });
      const [message1, message2, newUserTokens, newCompTokens] = response.data;
      setRoundInfo(message1);
      setMessage(message2);
      setUserTokens(newUserTokens);
      setCompTokens(newCompTokens);
      setShowEndButton(false);
      setShowRollButton(true);

    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  useEffect(() => {
    if (userTokens <= 0 || compTokens <= 0) {
      endGame();
    }
  }, [userTokens, compTokens]);
  
  const endGame = () => {
    const winner = userTokens > 0 ? "The computer wins!" : "You win!";
    setRoundInfo(winner);
    setMessage("Game over. Resetting the game...");
    setTimeout(resetGame, 3000); // Wait 3 seconds before resetting
  }
  
  const resetGame = () => {
    setUserTokens(10);
    setCompTokens(10);
    setScore(0);
    setUserScore(0);
    setCompScore(0);
    setUserTokensExchanged(0);
    setCompTokensExchanged(0);
    setRoundInfo("Your Turn");
    setMessage("Click Roll Dice");
  }

  return (
    <div className="App">
      <Header />
      <ScoreBoard compTokens={compTokens} userTokens={userTokens} />
      <div className="Message">
        <h2>{ roundInfo }</h2>
        <h3>{ message }</h3>
      </div>
      <Dice
        dieValue1={diceValues[0]}
        dieValue2={diceValues[1]}
        dieValue3={diceValues[2]}
        style={{display: diceDisplay}}
      />
      {showRollButton && (
        <Button onClick={rollDice} className='Game-button'>Roll Dice</Button>
      )}
      {showConButton && (
        <Button onClick={computerRoll} className='Game-button'>Continue</Button>
      )}
      {showEndButton && (
        <Button onClick={endRound} className='Game-button'>End Round</Button>
      )}
    </div>
  );
}

export default App;
