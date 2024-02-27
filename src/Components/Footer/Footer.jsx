import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="mt-auto py-3">
      <Container>
        <hr />
        <Row>
        <Col className="text-center">
            <a href="#" className=" mx-2">
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </a>
            
            <a href="#" className=" mx-2">
              <FontAwesomeIcon icon={faFacebookF} size="1x" />
            </a>
            <a href="#" className=" mx-2">
              <FontAwesomeIcon icon={faInstagram} size="1x" />
            </a>
            <span href="#" className="mx-2">© 2024 EpiBooks</span>
          </Col>
          
        </Row>
        <hr />
      </Container>
    </footer>
  );
};

export default Footer;
