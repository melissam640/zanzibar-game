//index.js
const express = require('express');
const app = express();
const cors = require('cors');
const { rollDice } = require('./helperFunctions.js');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from our server!')
});

app.get('/roll-dice', (req, res) => {
  console.log('roll-dice endpoint hit');
  const diceResults = rollDice();
  console.log('Dice results:', diceResults);
  res.json(diceResults);
});

app.listen(8080, () => {
  console.log('server listening on port 8080')
});