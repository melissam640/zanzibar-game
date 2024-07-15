//helperFunctions.js
const rollDice = () => {
  const firstRoll = Math.floor(Math.random() * 6) + 1;
  const secondRoll = Math.floor(Math.random() * 6) + 1;
  const thirdRoll = Math.floor(Math.random() * 6) + 1;

  return [firstRoll, secondRoll, thirdRoll];
}

module.exports = {
  rollDice,
};