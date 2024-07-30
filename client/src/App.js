//App.js
import axios from 'axios';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';
import { useGame } from './GameContext';
import Header from './components/Header.js';
import ScoreBoard from './components/ScoreBoard.js';
import Dice from './components/Dice.js';

// TODO: Update url to be dynamic
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    console.log(data)
  })
}

function App() {
  const { state, dispatch } = useGame();
  
  const rollDice = async () => {
    try {
      const response = await axios.get("http://localhost:8080/roll-dice");
      dispatch({
				type: 'ROLL_DICE',
				payload: {
					diceValues: response.data
				},
			});

      // TODO: Maybe move this getScore function to the server
      getScore(response.data);

    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  }

  const computerRoll = async () => {
    try {
      const response = await axios.get("http://localhost:8080/roll-dice");
      dispatch({
				type: 'COMPUTER_ROLL',
				payload: {
					diceValues: response.data
				},
			});

      // TODO: Maybe move this getCompScore function to the server
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

      dispatch({
				type: 'GET_SCORE',
				payload: {
					score: score,
					tokensExchanged: tokensExchanged,
					message: message
				},
			});

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

      dispatch({
				type: 'GET_COMP_SCORE',
				payload: {
					score: score,
					tokensExchanged: tokensExchanged,
					message: message
				},
			});

    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  const endRound = async () => {
    try {
      const response = await axios.post("http://localhost:8080/get-round-winner", {
        userScore: state.userScore,
				compScore: state.compScore,
				userTokens: state.userTokens,
				compTokens: state.compTokens,
				userTokensExchanged: state.userTokensExchanged,
				compTokensExchanged: state.compTokensExchanged
      });
      const [message1, message2, newUserTokens, newCompTokens] = response.data;

      dispatch({
				type: 'END_ROUND',
				payload: {
					roundInfo: message1,
					message: message2,
					newUserTokens: newUserTokens,
					newCompTokens: newCompTokens
				},
			});

    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  useEffect(() => {
    if (state.userTokens <= 0 || state.compTokens <= 0) {
      endGame();
    }
  }, [state.userTokens, state.compTokens]);
  
  const endGame = () => {
    dispatch({
			type: 'END_GAME',
			payload: {
				roundInfo: state.userTokens > 0 ? "You win!" : "The computer wins!"
			},
		});
    setTimeout(resetGame, 3000); // Wait 3 seconds before resetting
  }
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  }

  return (
    <div className="App">
      <Header />
      <ScoreBoard compTokens={ state.compTokens } userTokens={ state.userTokens } />
      <div className="Message">
        <h2>{ state.roundInfo }</h2>
        <h3>{ state.message }</h3>
      </div>
      <Dice
        dieValue1={ state.diceValues[0] }
        dieValue2={ state.diceValues[1] }
        dieValue3={ state.diceValues[2] }
        style={{display: state.diceDisplay}}
      />
      <div className="button-container">
        {state.showRollButton && (
          <Button onClick={rollDice}>Roll Dice</Button>
        )}
        {state.showConButton && (
          <Button onClick={computerRoll}>Continue</Button>
        )}
        {state.showEndButton && (
          <Button onClick={endRound}>End Round</Button>
        )} 
      </div>
    </div>
  );
}

export default App;
