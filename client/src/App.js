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

  useEffect(() => {
    if (state.userTokens <= 0 || state.compTokens <= 0) {
      endGame();
    }
  }, [state.userTokens, state.compTokens]);
  
  const userRoll = async () => {
    const response = await axios.get("http://localhost:8080/roll-dice");
    const [diceValues, score, tokensExchanged, message] = response.data;
    dispatch({
      type: 'USER_ROLL',
      payload: {
        diceValues: diceValues,
        score: score,
        tokensExchanged: tokensExchanged,
        message: message
      },
    });
  }

  const computerRoll = async () => {
    const response = await axios.get("http://localhost:8080/roll-dice");
    const [diceValues, score, tokensExchanged, message] = response.data;
    dispatch({
      type: 'COMPUTER_ROLL',
      payload: {
        diceValues: diceValues,
        score: score,
        tokensExchanged: tokensExchanged,
        message: message
      },
    });
  }

  // TODO: Review this route to see if this can be more concise
  const endRound = async () => {
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
  }
  
  const endGame = () => {
    dispatch({
			type: 'END_GAME',
			payload: {
				roundInfo: state.userTokens > 0 ? "The computer wins!" : "You win!"
			},
		});
    setTimeout(resetGame, 3000);
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
      {/* TODO: Review these buttons to see if this can be more concise */}
      <div className="button-container">
        {state.showRollButton && (
          <Button onClick={userRoll}>Roll Dice</Button>
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
