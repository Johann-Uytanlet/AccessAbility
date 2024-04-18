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

    useEffect(() => {
        const fetchingData = async () =>{
          try{
            await fetchMarkerReviews();
          } catch (err) {
                console.log(err);
          }
        }
        fetchingData();
    }, []);

    async function fetchMarkerReviews() {
        try {
            const markerID = markerData.id;
			      const response = await fetch(`${BACKEND_URL}/getAllMarkerReviews?markerID=${markerID}`, {
			    	method: 'GET',
			    	headers: { 'Content-Type': 'application/json' }
			      });

            if( response.ok ) {
                const reviewsData = await response.json();
                setCommunityNotes(reviewsData);
            } else {
                const errorData = await response.json();
				console.error('Error fetching markers:', errorData.message);
            }
        } catch( error ) {
            console.error( 'Error fetching marker reviews', error );
        }
    }

    async function createReview() {
      try {
          const form = {
            markerID: markerData.id,
            rating: rating, 
            comment: comment.trim(),
          }

          const BACKENDS_URL = 'http://localhost:5555'; // Replace with your backend URL and port

          const response = await fetch(`${BACKENDS_URL}/createMarkerReview`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
          
          if( response.ok ) {
              alert("REVIEW WAS CREATEED");
              fetchMarkerReviews()
          } else {
              alert( `${response.status} ${response.message}`)
          }
  
      } catch(error) {
        console.error('Error creating review:', error);
        alert("REVIEW WAS NOT CREATED");
      }
    };

    const handleRatingClick = (rating) => {
        console.log(`Rating ${rating} clicked`);
        setRating(rating)
    };

    const handleCommentSubmit = async () => {

        if( !rating ) {
            alert('Please choose a rating');
            return;
        }

        createReview();
    };

  const getColorByIndex = (index) => {
    const colors = ["#E43836", "#3F51B5", "#4CAF50", "#FFC107", "#9C27B0"];
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
            <h1>{markerData.averageRating}</h1>
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
            <p key={index}>{note.username} (note.rating): {note.comment} </p>
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