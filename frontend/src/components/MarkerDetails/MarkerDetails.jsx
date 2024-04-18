import React, { useState, useEffect } from 'react';
import './MarkerDetails.css';
import closeIcon from '../../assets/x.svg';
import BACKEND_URL from '../../../config.js';

const MarkerDetails = ({ markerData, onClose, generateStarRating }) => {
    const [comment, setComment] = useState('');
    const [communityNotes, setCommunityNotes] = useState([]);
    const [textAreaClicked, setTextAreaClicked] = useState(false);
    const [cancelClicked, setCancelClicked] = useState(false);
    const [rating, setRating] = useState(0);

    const handleRatingClick = (rating) => {
        markerData.rating = rating;
        console.log(`Rating ${rating} clicked`);
        setRating(rating)
    };

    const handleCommentSubmit = async () => {
        if( !rating ) {
            alert('Please choose a rating');
            return;
        }

        const form = {
        };

        try {
          const response = await fetch( `${BACKEND_URL}/createMarkerReview`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
        } catch( error ) {
        }

        setCommunityNotes([...communityNotes, comment.trim()]);
        setComment('');
    };

  const getColorByIndex = (index) => {
    const colors = [ "#E43836", "#FD674D", "#FFC236", "#4CAF50","#36AE26"];
    return colors[index % colors.length];
  };

  const handleTextAreaClick = () => {
    setTextAreaClicked(true);
    setCancelClicked(true);
  };

  const handleCancelClick = () => {
    setTextAreaClicked(false);
    setCancelClicked(false);
  };

  return (
    <div className="marker-details">
      <div className="marker-details-header">
        <div className="place">
          {/* TODO: Insert marker logo here (see figma) */}
          <h3>{markerData.location}</h3>
        </div>
        <button onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
      <div className="marker-details-body">
        <div className="marker-details-body rating">
          <div className='rating-circle'>
            <h1>{rating}</h1>
          </div>
          {/* TODO: Turn data to dynamic */}
          <h4 className='rating-label'>Friendly</h4>
          <div className="rating-buttons">
            {/* Fix background colors */}
            {[1, 2, 3, 4, 5].map((rating, index) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                style={{ backgroundColor: getColorByIndex(index) }}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        <div className="community-notes">
          <h4 className="community-notes-header">Community Notes</h4>
          {communityNotes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
        <div className="comment-section">
          <div className="textarea-container">
            <textarea
              className="comment-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Say something about this place..."
              onClick={handleTextAreaClick}
            />
            {/* Show buttons only when text area is clicked */}
            {textAreaClicked && (
              <div className="button-container">
                <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                <button className="submit-btn" onClick={handleCommentSubmit}>Comment</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerDetails;