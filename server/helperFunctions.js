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
  }
  else if (num === 6) {
    points = 60;
  }
  else {
    points = num;
  }
  return points;
}

const getTotalScore = (diceValues) => {
  if (diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6)) {
    score = 8000;
    tokensExchanged = 4;
    message = 'Zanzibar!';
  }
// TODO: revise three-of-a-kind checks
//   else if (diceValues == [1, 1, 1]) {
//     score = 7000;
//     tokensExchanged = 3;
//     message = 'This is three of a kind!';
//   }
//   else if (diceValues == [2, 2, 2]) {
//     score = 6000;
//     tokensExchanged = 3;
//     message = 'This is three of a kind!';
//   }
//   else if (diceValues == [3, 3, 3]) {
//     score = 5000;
//     tokensExchanged = 3;
//     message = 'This is three of a kind!';
//   }
//   else if (diceValues == [4, 4, 4]) {
//     score = 4000;
//     tokensExchanged = 3;
//     message = 'This is three of a kind!';
//   }
//   else if (diceValues == [5, 5, 5]) {
//     score = 3000;
//     tokensExchanged = 3;
//     message = 'This is three of a kind!';
//   }
//   else if (diceValues == [6, 6, 6]) {
//     score = 2000;
//     tokensExchanged = 3;
//     message = 'This is three of a kind!';
//   }
  else if (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3)) {
    score = 1000;
    tokensExchanged = 2;
    message = 'This is a special combination!';
  }
  else {
    score = getPointValue(diceValues[0]) + getPointValue(diceValues[1]) + getPointValue(diceValues[2]);
    tokensExchanged = 1;
    message = `This is worth ${score} points!`;
  }
  return [score, tokensExchanged, message];
}

module.exports = {
  rollDice,
  getPointValue,
  getTotalScore,
};