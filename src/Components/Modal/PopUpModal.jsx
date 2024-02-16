import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import axios from 'axios';

function CommentModal({ show, handleClose, elementId }) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k';
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [ratingKey, setRatingKey] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);


    const fetchComments = async () => {
        const url = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments/`;
        try {
          const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const sortedAndLimitedComments = response.data.reverse().slice(0, 5);
          setComments(sortedAndLimitedComments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
    
      const handleSaveComment = async () => {
        let url = ``;
        const payload = {
          comment: comment,
          rate: rating,
        };
      
        try {
          if (editingCommentId ) {
            url = `https://striveschool-api.herokuapp.com/api/comments/${editingCommentId}`;
            await axios.put(url, payload, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            alert('Edited Correctly!')
          } else {
            url = 'https://striveschool-api.herokuapp.com/api/comments/'
            payload.elementId = elementId;
            await axios.post(url, payload, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            alert('Comment and Rate Added Correctly!')
          }
          setComment('');
          setEditingCommentId(null);
          setRatingKey(prevKey => prevKey + 1);
          fetchComments();
        } catch (error) {
          console.error('Error saving comment:', error);
        }
      };

  const handleDeleteComment = async (commentId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
  if (!isConfirmed) {
    return; 
  }
    const url = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`;
    
    try {
      await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      setComments(updatedComments);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEdit = (comment) => {
    setComment(comment.comment);
    setRating(comment.rate);
    setEditingCommentId(comment._id);
  };
  
  useEffect(() => {
    if (show) {
      fetchComments();
    }
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comment And Rate:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-1" controlId="commentTextArea">
            <Form.Label><strong>Add Comment:</strong></Form.Label>
            <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label><strong>Rate:</strong></Form.Label>
            <Rating
              key={ratingKey}
              count={5}
              onChange={setRating}
              size={35}
              activeColor="#ffd700"
              value={rating}
            />
          </Form.Group>
        </Form>
        <h5>Comments from Users:</h5>
        <ListGroup>
          {comments.slice(0, 5).map((comment, index) => (
            <ListGroup.Item key={index}>
              <div><strong>Rating: {comment.rate}/5 </strong></div>
              <div><strong>Comment:</strong> {comment.comment}</div>
              <Button variant="primary" className='me-2' size="sm" onClick={() => startEdit(comment)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveComment}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentModal;