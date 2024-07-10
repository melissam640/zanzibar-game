//App.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header.js';
import ScoreBoard from './components/ScoreBoard.js';

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
      <ScoreBoard player="Computer" tokens="10" alignment="left"/>
      <ScoreBoard player="Player" tokens="10" alignment="right"/>
    </div>
  );
}

export default App;
