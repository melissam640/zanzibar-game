import "./ScoreBoard.css";
import coin from "../assets/golden-coin-icon.png";

const ScoreBoard = (props) => {
    return (
      <div className="Score-board-section">
        <div className="Score-board-frame Right">
          <h2 className="Player-title">
            COMPUTER
          </h2>
          <p className="Tokens">
            {props.compTokens}
          </p>
          <img className="Coin-icon" src={coin} alt="coin" />
        </div>
        <div className="Score-board-frame Left">
          <h2 className="Player-title">
            YOU
          </h2>
          <p className="Tokens">
            {props.userTokens}
          </p>
          <img className="Coin-icon" src={coin} alt="coin" />
      </div>
    </div>
    );
  }
  
  export default ScoreBoard;