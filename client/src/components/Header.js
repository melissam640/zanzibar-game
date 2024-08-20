import { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import "./Header.css";

const Header = () => {

  // TODO: Fix state
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

    return (
      <div className="header">
        <h1>ZANZIBAR</h1>
        <AwesomeButton onPress={handleShow} type="primary" className="rules-button">
          Rules
        </AwesomeButton>
      </div>
    );
  }
  
  export default Header;