import Modal from 'react-bootstrap/Modal';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './GameRules.css';

const GameRules = (props) => {
  const rules = `
  Roll the dice to try to get the higher score and get rid of your tokens.
  
  First player to loose all of their tokens wins!`;

  const scoring = `
  The loser receives:

  4 tokens if the highest score is 4,5,6 (Zanzibar)

  3 tokens if the highest score is three-of-a-kind

  2 tokens if the highest score is 1,2,3

  1 token if the highest score is a points total

  Points System:
  1 = 100 points
  6 = 60 points
  2 = 2 points
  3 = 3 points
  4 = 4 points
  5 = 5 points`;

  return (
    <>
      <Modal show={props.show} size="lg">
        <Modal.Body className="rules-modal">
          <button type="button" class="btn-close" onClick={props.close}></button>
          <h2 className="rules-title">Zanzibar Dice Game</h2>
          {rules}
          <hr/>
          {scoring}
          <hr/>
          <AwesomeButton onPress={props.close} type="primary">
            Got It!
          </AwesomeButton>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GameRules;