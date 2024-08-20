import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './GameButton.css';

const GameButton = (props) => {
  <AwesomeButton onPress={props.action} type="primary">{props.label}</AwesomeButton>
}

export default GameButton;