import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-auto py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <span>© 2024 EpiBooks</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
