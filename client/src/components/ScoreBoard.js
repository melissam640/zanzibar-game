import "./ScoreBoard.css";

const ScoreBoard = (props) => {
    return (
      <div className="Score-board-section">
        <div className="Score-board-frame Right">
          <div className="Score-board">
            <h2 className="Player-title">
              COMPUTER
            </h2>
            <p className="Tokens">
              {props.compTokens} Tokens
            </p>
          </div>
        </div>
        <div className="Score-board-frame Left">
        <div className="Score-board">
          <h2 className="Player-title">
            YOU
          </h2>
          <p className="Tokens">
            {props.userTokens} Tokens
          </p>
        </div>
      </div>
    </div>
    );
  }
  
  export default ScoreBoard;