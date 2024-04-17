import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function MarkerReviewer({ show, onHide, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, comment);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Share your experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <Form.Check
                  key={value}
                  inline
                  type="radio"
                  label={value}
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Say something about this place..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MarkerReviewer;