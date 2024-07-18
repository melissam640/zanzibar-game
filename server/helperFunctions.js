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

module.exports = {
  rollDice,
  getPointValue,
};