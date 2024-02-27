import React from "react";
import Rating from 'react-rating-stars-component';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row, ListGroup } from "react-bootstrap";
import MyNav from "../Nav/MyNav";
import Footer from "../Footer/Footer";
import {
  allComments,
  getComments,
} from "../../reducers/comments/commentsSlice";

const Details = () => {
  const url = "https://striveschool-api.herokuapp.com/books/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k";
  const { asin } = useParams();
  const dispatch = useDispatch();
  const [elementId, setElementId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);
  const comments = useSelector(allComments);

  useEffect(() => {
    const getByAsin = async () => {
      try {
        const res = await axios.get(url + asin, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookDetails(res.data);
        setElementId(asin);
        if (elementId) {
          dispatch(getComments(elementId));
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    getByAsin();
    
  }, [dispatch, elementId, asin]);

  if (!bookDetails) return <div>Loading...</div>;

  return (
    <>
      <MyNav isSearchActive={false}/>
      <Row className="mt-2 ">
        <Col className="m-2">
      <Card>
      <Card.Img variant="bottom" src={bookDetails.img} />
        <Card.Body>
        
          <ListGroup className="list-group-flush text-center">
            <ListGroup.Item>
              <strong>Title: <br></br>{bookDetails.title}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Category:<br></br></strong> {bookDetails.category}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:<br></br></strong> {bookDetails.price}$
            </ListGroup.Item>
          </ListGroup>
          <hr />
        </Card.Body>

        <Card.Header as='h6' className="text-muted text-center">The ID Code of the book that you've selected is: {bookDetails.asin}</Card.Header>
      </Card>
      </Col>
      <Col className="d-flex flex-column align-items-center justify-content-center">

      <h2>Reviews:</h2>
        {comments.map((comment) => (
          
            <Card key={comment._id} style={{ width: "25rem" }} className="m-1">
              <Card.Body>
                <Card.Title>User Email: <br></br> {comment.author}</Card.Title>
                <hr />
                <Rating
              value={comment.rate}
              count={5}
              edit={false}
              size={25}
              activeColor="#ffd700"
              
            />
                <Card.Text><strong>Comment:</strong> <br></br> {comment.comment}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                <hr />
                <strong>Published On:</strong>{" "}
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          
        ))}
        </Col>
      </Row>

      <Footer />
    </>
  );
};

export default Details;
