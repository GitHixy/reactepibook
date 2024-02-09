import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import classes from './BookCard.module.css'
function BookCard({title, price, imgSrc, category, asin}) {
  return (
    <Col sm={12} md={6} lg={3}>
    <Card className='my-3'>
      <Card.Img className={classes['card-img']} variant="top" src= {imgSrc} />
      <Card.Body>
        <Card.Title className='text-truncate'>{title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{category}</ListGroup.Item>
        <ListGroup.Item>{price}$</ListGroup.Item>
        <ListGroup.Item>Code: {asin}</ListGroup.Item>
      </ListGroup>
    </Card>
    </Col>
  );
}

export default BookCard;