//App.js
import axios from 'axios';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { Fade } from 'react-awesome-reveal';
import './App.css';
import { useGame } from './GameContext';
import GameRules from './components/GameRules.js';
import Header from './components/Header.js';
import ScoreBoard from './components/ScoreBoard.js';
import Dice from './components/Dice.js';

function App() {
  const { state, dispatch } = useGame();
  
  const clickRollDice = () => {
    dispatch({ type: 'CLICK_ROLL' });
    setTimeout(userRoll, 1000);
  }
  
  const userRoll = async () => {
    const response = await axios.get("https://zanzibar-game.onrender.com/roll-dice");
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

  const clickContinue = () => {
    dispatch({ type: 'CLICK_CONTINUE' });
    setTimeout(computerRoll, 1000);
  }

  const computerRoll = async () => {
    const response = await axios.get("https://zanzibar-game.onrender.com/roll-dice");
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

  const endRound = async () => {
    const response = await axios.post("https://zanzibar-game.onrender.com/get-round-winner", {
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

  useEffect(() => {
    if (state.userTokens <= 0 || state.compTokens <= 0) {
      endGame();
    }
  });
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  }

  const openRules = () => {
    dispatch({ type: 'OPEN_RULES' });
  }

  const closeRules = () => {
    dispatch({ type: 'CLOSE_RULES' });
  }

  return (
    <div className="App">
      <Header />
      <AwesomeButton onPress={openRules} type="primary" className="rules-button">
        Rules
      </AwesomeButton>
      
      <Fade>
        <ScoreBoard compTokens={ state.compTokens } userTokens={ state.userTokens } />
        <div className="Message">
          <h2>{ state.roundInfo }</h2>
          <h3>{ state.message }</h3>
        </div>
      </Fade>
      
      <Dice
        dieValue1={ state.diceValues[0] }
        dieValue2={ state.diceValues[1] }
        dieValue3={ state.diceValues[2] }
        style={{display: state.diceDisplay}}
      />
      
      <Fade>
        <div className="button-container">
          {state.showRollButton && (
            <AwesomeButton onPress={clickRollDice} type="primary">Roll Dice</AwesomeButton>
          )}
          {state.showConButton && (
            <AwesomeButton onPress={clickContinue} type="primary">Continue</AwesomeButton>
          )}
          {state.showEndButton && (
            <AwesomeButton onPress={endRound} type="primary">End Round</AwesomeButton>
          )}
        </div>
      </Fade>

      <GameRules show={state.showRules} close={closeRules} />
    </div>
  );
}

export default App;
