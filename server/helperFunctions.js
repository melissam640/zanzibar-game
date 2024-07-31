//helperFunctions.js
const rollDice = () => {
  const firstRoll = Math.floor(Math.random() * 6) + 1;
  const secondRoll = Math.floor(Math.random() * 6) + 1;
  const thirdRoll = Math.floor(Math.random() * 6) + 1;

  return [firstRoll, secondRoll, thirdRoll];
}

const getPointValue = (num) => {
  if (num === 1) {
    points = 100;
  } else if (num === 6) {
    points = 60;
  } else {
    points = num;
  }
  return points;
}

const getTotalScore = (diceValues) => {
  // scores for different three-of-a-kind combinations
  const threeComboScores = {1: 7000, 2: 6000, 3: 5000, 4: 4000, 5: 3000, 6: 2000};

  // check for special combo [4, 5, 6], three-of-a-kind, or [1, 2, 3]
  // else calculate individual points
  if (diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6)) {
    score = 8000;
    tokensExchanged = 4;
    message = 'Zanzibar!';
  } else if (diceValues.every(val => val === diceValues[0])) {
    score = threeComboScores[diceValues[0]];
    tokensExchanged = 3;
    message = 'This is three of a kind!';
  } else if (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3)) {
    score = 1000;
    tokensExchanged = 2;
    message = 'This is a special combination worth 1000 points!';
  } else {
    score = getPointValue(diceValues[0]) + getPointValue(diceValues[1]) + getPointValue(diceValues[2]);
    tokensExchanged = 1;
    message = `This is worth ${score} points!`;
  }
  return [score, tokensExchanged, message];
}

const getRoundWinner = (userScore, compScore, userTokens, compTokens, userTokensExchanged, compTokensExchanged) => {
  let winnerMessage, tokensMessage, newUserTokens, newCompTokens;
  if (userScore > compScore) {
    winnerMessage = 'You win the round!';
    tokensMessage = `You give the computer ${userTokensExchanged} tokens.`;
    newUserTokens = userTokens - userTokensExchanged;
    newCompTokens = compTokens + userTokensExchanged;
  } else if (compScore > userScore) {
    winnerMessage = 'Computer wins the round!';
    tokensMessage = `The computer gives you ${compTokensExchanged} tokens.`;
    newUserTokens = userTokens + compTokensExchanged;
    newCompTokens = compTokens - compTokensExchanged;
  } else {
    winnerMessage = `It's a tie!`;
    tokensMessage = 'There are no tokens exchanged.';
    newUserTokens = userTokens;
    newCompTokens = compTokens;
  }
  return([winnerMessage, tokensMessage, newUserTokens, newCompTokens]);
}

module.exports = {
  rollDice,
  getTotalScore,
  getRoundWinner,
};