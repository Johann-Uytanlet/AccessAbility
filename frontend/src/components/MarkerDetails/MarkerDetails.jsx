import React, { useState, useEffect } from 'react';
import './MarkerDetails.css';
import closeIcon from '../../assets/x.svg';
import MarkerNote from '../MarkerNote/MarkerNote.jsx'
import BACKEND_URL from '../../../config.js';

/*
	Code Categorization

	State Management
	Sub-components
	API Functions
	Utility Functions
	Event Handlers
	Render JSX
*/
	
const MarkerDetails = ({ marker, onClose, generateStarRating }) => {

	/*|*********************************************
					 State Management
	************************************************/
	const [markerData, setMarkerData] = useState(marker);
    const [comment, setComment] = useState('');
    const [markerReviews, setMarkerReviews] = useState([]);
    const [textAreaClicked, setTextAreaClicked] = useState(false);
    const [cancelClicked, setCancelClicked] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
		try {
			setMarkerData(marker);
			console.log("markerID:", markerData.markerID);
		} catch( error ) {
			console.log( "useEffect Error: setMarkerData() failed" );
		}
    }, [marker]);

	useEffect(() => {
		const fetchMarkerReviews = async () => {
		  	try {
				await retrieveAllMarkerReviews();
		  	} catch( error ) {
				console.log( "useEffect Error: fetchMarkerReviews() failed" );
			}
		};
	
		if( markerData && markerData.markerID) {
		  	fetchMarkerReviews();
		}
	  }, [markerData]);

	/*|**********************************************
				   	Child Components
	************************************************/

	/*|**********************************************
				  	  API Functions
	************************************************/
	// - Also calls "setMarkerReviews()" to ensure the latest data is being used
	async function retrieveAllMarkerReviews() {
		try {
			if( !markerData || !markerData.markerID) {
				console.log( "markerData or markerData.markerIDis undefined" );
				return;
			}
	
			const response = await fetch( 
				`${BACKEND_URL}/getAllMarkerReviews?` + new URLSearchParams({markerID: markerData.markerID}), {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			if( response.ok ) {
				const data = await response.json();
				setMarkerReviews(data);
			} else {
				// - SHOW ERROR MESSAGE / NOT LOGGED IN MESSAGE
			}
		} catch( error ) {
			console.log( "retrieveAllMarkerReviews() error:", error );
		}
	}

	// - Also calls "setMarkerReviews()" through "retrieveAllMarkerReviews()"
	async function createMarkerReview() {
		try {
			if( !rating ) {
				console.log( "rating is undefined" );
				return;
			}

			const form = {
				markerID: markerData.markerID, 
				rating: rating, 
				comment: comment.trim(),
				dateReviewed: new Date()
			};

			const response = await fetch( `${BACKEND_URL}/createMarkerReview`, {
				method:'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if( response.ok ) {
				retrieveAllMarkerReviews();
			} else {
				// - SHOW ERROR MESSAGE / NOT LOGGED IN MESSAGE
				console.log( "retrieveAllMarkerReviews() error:", response.message );
			}

		} catch( error ) {
			console.log( "createMarkerReview() error:", error );
		}
	}

	/*|**********************************************
					 Utility Functions
	************************************************/
	const getColorByIndex = (index) => {
		const colors = [ "#E43836", "#FD674D", "#FFC236", "#4CAF50","#36AE26"];
		return colors[index % colors.length];
	};

	/*|**********************************************
					  Event Handlers
	************************************************/
	// - When a review is created, it adds the rating and comments to the marker
    const handleCommentSubmit = async () => {

        if( !rating ) {
            alert('Please choose a rating');
            return;
        }

		createMarkerReview();
		retrieveAllMarkerReviews();
    };

    const handleRatingClick = (rating) => {
        markerData.rating = rating;
        console.log(`Rating ${rating} clicked`);
        setRating(rating)
    };

	// - Shows the cancel and comment buttons
	const handleTextAreaClick = () => {
		setTextAreaClicked(true);
		setCancelClicked(true);
	};

	// - Closes the marker details modals
	const handleCancelClick = () => {
		setTextAreaClicked(false);
		setCancelClicked(false);
	};

  	/*|**********************************************
					   Render JSX
	************************************************/
	return (
		<div className="marker-details">
		<div className="marker-details-header">
			<div className="place">
			{/* TODO: Insert marker logo here (see figma) */}
			<h3>{markerData.name}</h3>
			</div>
			<button onClick={onClose}>
			<img src={closeIcon} alt="Close" />
			</button>
		</div>
		<div className="marker-details-body">
			<div className="marker-details-body rating">
			<div className='rating-circle'>
				<h1 className='rating-number'>{rating}</h1>
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
			{markerReviews.map((note, index) => (
				<MarkerNote username={note.author} comment={note.comment}/>
				//<p key={index}>{note}</p>
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