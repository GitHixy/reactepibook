import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allComments, getComments, resetComments, deleteComment, editComment, addComment } from '../../reducers/comments/commentsSlice';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';

function CommentModal({ show, handleClose, elementId }) {
    const dispatch = useDispatch();
    const comments = useSelector(allComments);
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
      if (show && elementId) {
        dispatch(getComments(elementId));
      }
      return () => {
        dispatch(resetComments());
      };
    }, [show, elementId, dispatch]);

    const handleSave = async () => {
      if (editingCommentId) {
        dispatch(editComment({ commentId: editingCommentId, comment: commentText, rate: rating }));
      } else {
        dispatch(addComment({ elementId, comment: commentText, rate: rating }));
      }
      setCommentText('');
      setRating(0);
      setEditingCommentId(null);
    };

    const startEdit = (event, comment) => {
      event.stopPropagation();
      setCommentText(comment.comment);
      setRating(comment.rate);
      setEditingCommentId(comment._id);
    };

  
    const handleDelete = async (event, commentId) => {
      event.stopPropagation();
      const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
      if (isConfirmed) {
        dispatch(deleteComment(commentId));
      }
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comment And Rate:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-1" controlId="commentTextArea">
            <Form.Label><strong>Add Comment:</strong></Form.Label>
            <Form.Control as="textarea" rows={3}  value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label><strong>Rate:</strong></Form.Label>
            <Rating
              value={rating}
              count={5}
              onChange={(newRating) => setRating(newRating)}
              size={35}
              activeColor="#ffd700"
              
            />
          </Form.Group>
        </Form>
        <h5>Comments from Users:</h5>
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment._id}>
              <div><strong>Rating: {comment.rate}/5 </strong></div>
              <div><strong>Comment:</strong> {comment.comment} </div>
              <Button variant="primary" className='me-2' size="sm" onClick={(e) => startEdit(e, comment)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={(e) => handleDelete(e, comment._id)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentModal;