//index.js
const express = require('express');
const app = express();
const cors = require('cors');
const { rollDice, getPointValue } = require('./helperFunctions.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!')
});

app.get('/roll-dice', (req, res) => {
  const diceResults = rollDice();
  res.json(diceResults);
});

app.post('/get-points', (req, res) => {
  const { data } = req.body;
  let dicePoints = 0;
  for (let value of data) {
    dicePoints += getPointValue(value);
  }
  console.log(dicePoints);
  res.json(dicePoints);
});

app.listen(8080, () => {
  console.log('server listening on port 8080')
});