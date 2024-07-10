import "./ScoreBoard.css";

const ScoreBoard = (props) => {
    return (
      <div className="Score-board-frame" style={{float: `${props.alignment}`}}>
      <div className="Score-board">
        <h2 className="Player-title">
          {props.player}
        </h2>
        <p className="Tokens">
          {props.tokens}
        </p>
        <h3>Tokens</h3>
      </div>
      </div>
    );
  }
  
  export default ScoreBoard;