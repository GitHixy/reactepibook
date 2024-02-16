import React, { useState } from 'react';
import { Card, ListGroup, Col, Button } from 'react-bootstrap';
import classes from './BookCard.module.css'
import CommentModal from '../Modal/PopUpModal';


function BookCard({title, price, imgSrc, category, asin, onClick}) {

  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  
  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) onClick();
  };

  return (
    <Col sm={12} md={6} lg={3} className={`mt-4 ${isSelected ? classes.cardSelected : ''}`} >
    <Card 
    className={`my-3`} 
    onClick={handleClick}>
      <Card.Img className={classes['card-img']} variant="top" src= {imgSrc} />
      <Card.Body>
        <Card.Title className='text-truncate'>{title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Genre: {category}</ListGroup.Item>
        <ListGroup.Item>Price: {price}$</ListGroup.Item>
        <ListGroup.Item>Code: {asin}</ListGroup.Item>
      </ListGroup>
      {isSelected && (
          <Card.Body>
            <Button variant="secondary" className='w-100' onClick={handleShowModal}>Add Comment and Rate</Button>
          </Card.Body>
        )}
    </Card>
    <CommentModal show={showModal} handleClose={handleCloseModal} elementId={asin} />
    </Col>
  );
}

export default BookCard;