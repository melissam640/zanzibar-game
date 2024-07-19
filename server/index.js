//index.js
const express = require('express');
const app = express();
const cors = require('cors');
const { rollDice, getPointValue, getTotalScore } = require('./helperFunctions.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!')
});

app.get('/roll-dice', (req, res) => {
  const diceResults = rollDice();
  res.json(diceResults);
});

app.post('/get-score', (req, res) => {
  const { data } = req.body;
  const roundScore = getTotalScore(data);
  console.log(roundScore);
  res.json(roundScore);
});

app.listen(8080, () => {
  console.log('server listening on port 8080')
});