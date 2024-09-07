import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  diceDisplay: "none",
  diceValues: [1, 1, 1],
  score: 0,
  roundInfo: "Your Turn",
  message: "Click Roll Dice",
  userTokens: 5,
  compTokens: 5,
  userScore: 0,
  compScore: 0,
  userTokensExchanged: 0,
  compTokensExchanged: 0,
  showRollButton: true,
  showConButton: false,
  showEndButton: false,
  showRules: false,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'USER_ROLL':
      return {
        ...state,
        diceValues: action.payload.diceValues,
        diceDisplay: "",
        showRollButton: false,
        showConButton: true,
        score: action.payload.score,
        roundInfo: "Your Turn",
        message: action.payload.message,
        userTokensExchanged: action.payload.tokensExchanged,
        userScore: action.payload.score,
      };
    case 'COMPUTER_ROLL':
      return {
        ...state,
        diceValues: action.payload.diceValues,
        showConButton: false,
        showEndButton: true,
        score: action.payload.score,
        roundInfo: "Computer's Turn",
        message: action.payload.message,
        compTokensExchanged: action.payload.tokensExchanged,
        compScore: action.payload.score,
      };
    case 'END_ROUND':
      return {
        ...state,
        roundInfo: action.payload.roundInfo,
        message: action.payload.message,
        userTokens: action.payload.newUserTokens,
        compTokens: action.payload.newCompTokens,
        diceDisplay: "none",
        showEndButton: false,
        showRollButton: true,
      };
    case 'END_GAME':
      return {
        ...state,
        roundInfo: action.payload.roundInfo,
        message: "Game over. Resetting the game...",
      };
    case 'RESET_GAME':
      return {
        ...state,
        userTokens: 5,
        compTokens: 5,
        score: 0,
        userScore: 0,
        compScore: 0,
        userTokensExchanged: 0,
        compTokensExchanged: 0,
        roundInfo: "Your Turn",
        message: "Click Roll Dice",
      };
    case 'OPEN_RULES':
      return {
        ...state,
        showRules: true,
      };
    case 'CLOSE_RULES':
      return {
        ...state,
        showRules: false,
      };
    default:
      return state;
  }
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
