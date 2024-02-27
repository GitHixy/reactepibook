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
        await setBookDetails(res.data);
        await setElementId(asin);
        console.log(res);
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    getByAsin();
    dispatch(getComments(elementId));
  }, [asin, dispatch, elementId]);

  if (!bookDetails) return <div>Loading...</div>;

  return (
    <>
      <MyNav />
      <Row className="m-5">
        <Col>
      <Card className=" w-80 mx-auto my-1">
        <Card.Img variant="top" src={bookDetails.img} />
        <Card.Body>
          <ListGroup className="list-group-flush text-center">
            <ListGroup.Item>
              <strong>{bookDetails.title}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Category:</strong> {bookDetails.category}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> {bookDetails.price}$
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      </Col>
      <Col>

      <h2>Reviews:</h2>
        {comments.map((comment) => (
          
            <Card key={comment._id} style={{ width: "25rem" }} className="mt-2">
              <Card.Body>
                <Card.Title>User Email: <br></br> {comment.author}</Card.Title>
                
                <Rating
              value={comment.rate}
              count={5}
              edit={false}
              size={25}
              activeColor="#ffd700"
              
            />
                <Card.Text><strong>Comment:</strong> <br></br> {comment.comment}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
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
