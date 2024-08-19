import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GameRules() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Zanzibar Dice Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Roll the dice to try to get the higher score and get rid of your tokens.

          First player to loose all of their tokens wins!

          <hr/>
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
          5 = 5 points
          <hr/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GameRules;