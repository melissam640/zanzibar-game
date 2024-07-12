import "./ScoreBoard.css";

const ScoreBoard = (props) => {
    return (
      <div className="Score-board-section">
        <div className="Score-board-frame Right">
          <div className="Score-board">
            <h2 className="Player-title">
              Computer
            </h2>
            <p className="Tokens">
              {props.compTokens}
            </p>
            <h3>Tokens</h3>
          </div>
        </div>
        <div className="Score-board-frame Left">
        <div className="Score-board">
          <h2 className="Player-title">
            You
          </h2>
          <p className="Tokens">
            {props.userTokens}
          </p>
          <h3>Tokens</h3>
        </div>
      </div>
    </div>
    );
  }
  
  export default ScoreBoard;