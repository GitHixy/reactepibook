import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import classes from './BookCard.module.css'


function BookCard({title, price, imgSrc, category, asin, onClick, isSelected}) {
  const cardClassName = isSelected ? classes['book-card-selected'] : '';
  return (
    <Col sm={12} md={6} lg={3} className={'mt-4 ' + cardClassName}>
    <Card className='my-3' onClick={onClick}>
      <Card.Img className={classes['card-img']} variant="top" src= {imgSrc} />
      <Card.Body>
        <Card.Title className='text-truncate'>{title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Genre: {category}</ListGroup.Item>
        <ListGroup.Item>Price: {price}$</ListGroup.Item>
        <ListGroup.Item>Code: {asin}</ListGroup.Item>
      </ListGroup>
    </Card>
    </Col>
  );
}

export default BookCard;