import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const [countdown, setCountdown] = useState(10); 
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate('/reactepibook'); 
      return;
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown, navigate]);

  return (
    <>
    
    <Container className="mt-auto">
      <Row className="justify-content-center m-5">
        <Col md={8} className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"><span className="text-danger">Oops!</span> Page not found.</p>
          <p className="lead">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <p>You will be redirected to the homepage in {countdown} seconds.</p>
          <Button onClick={() => navigate('/reactepibook')} variant="secondary" className='m-2'>Go to Homepage Now</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Error;
