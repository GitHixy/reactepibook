import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible() {
  const [show, setShow] = useState(true);
  const [countdown, setCountdown] =useState(7);

  useEffect(() => {
    if (show) { 
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {         
            clearInterval(interval);
            setShow(false);
            return 0;
          } else {  
            return prevCountdown - 1;
          }
        });
      }, 1000); 
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <>
      <Alert show={show} variant="success" className='text-center'>
        <Alert.Heading>Welcome to EpiBooks</Alert.Heading>
        <p>
          This Alert is just a test to see if I'm actually capable of using React with Bootstrap. <br />
          <span className='fw-bold'>This Alert will disappear in {countdown} seconds, thank you!</span>
        </p>
        <hr />
      </Alert>
    </>
  );
}

export default AlertDismissible;