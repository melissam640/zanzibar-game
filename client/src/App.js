//App.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header.js';
import ScoreBoard from './components/ScoreBoard.js';
import Dice from './components/Dice.js';
import one from "./assets/dice-one.png";
import two from "./assets/dice-two.png";
import three from "./assets/dice-three.png";
import four from "./assets/dice-four.png";
import five from "./assets/dice-five.png";
import six from "./assets/dice-six.png";

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <Header />
      <ScoreBoard compTokens="10" userTokens="10" />
      <Dice die1={one} die2={two} die3={three} />
    </div>
  );
}

export default App;
