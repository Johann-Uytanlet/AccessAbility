import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function MarkerDetails({ marker, show, onHide, onReviewClick }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{marker?.location}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { "Created by" } { marker?.username }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onReviewClick}>
          Review Location
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MarkerDetails;