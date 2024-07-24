//index.js
const express = require('express');
const app = express();
const cors = require('cors');
const { rollDice, getTotalScore, getRoundWinner } = require('./helperFunctions.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!')
});

app.get('/roll-dice', (req, res) => {
  const diceResults = rollDice();
  console.log(diceResults);
  res.json(diceResults);
});

app.post('/get-score', (req, res) => {
  const { data } = req.body;
  console.log(data);
  const roundScore = getTotalScore(data);
  console.log(roundScore);
  res.json(roundScore);
});

app.post('/get-round-winner', (req, res) => {
  const { userScore, compScore, userTokens, compTokens, userTokensExchanged, compTokensExchanged } = req.body;
  const roundResults = getRoundWinner(userScore, compScore, userTokens, compTokens, userTokensExchanged, compTokensExchanged);
  res.json(roundResults);
})

app.listen(8080, () => {
  console.log('server listening on port 8080')
});