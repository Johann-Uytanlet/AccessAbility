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
		const updateMarker = async () => {
			try {
				setMarkerData(marker);
				await updateAllAverageRatings();
			} catch( error ) {
				console.log( "useEffect Error: updateMarker() failed" );
			}
		}
		updateMarker();
    }, [marker]);

	useEffect(() => {
		const fetchMarkerReviews = async () => {
		  	try {
				await updateAllAverageRatings();
				await retrieveAllMarkerReviews();
				setRating(0)
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

	async function updateAverageRating() {
		try {
			const form = {
				markerID: markerData.markerID, 
			};

			const response = await fetch( `${BACKEND_URL}/updateAverageRating`, {
				method:'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if( response.ok ) {
				console.log( "Rating successfully updated:", response.message );
				retrieveAllMarkerReviews();
			} else {
				// - SHOW ERROR MESSAGE / NOT LOGGED IN MESSAGE
				console.log( "updateAverageRating() error:", response.message );
			}
		} catch( error ) {
			console.log( "updateAverageRating() error:", error );
		}
	}

	async function updateAllAverageRatings() {
		try {
			const response = await fetch(`${BACKEND_URL}/updateAllAverageRatings`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});
	
			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
				// - Optionally, you can reload the marker data or perform any other necessary actions
			} else {
				const errorData = await response.json();
				console.error('Error updating average element:', errorData.message);
				// - Handle the error scenario, such as displaying an error message to the user
			}
		} catch (error) {
			console.error('Error updating average element:', error);
			// - Handle any network or other errors that may occur
		}
	}

	/*|**********************************************
					 Utility Functions
	************************************************/
	const getColorByIndex = (index) => {
		const colors = [ "#E43836", "#FD674D", "#FFC236", "#4CAF50","#36AE26"];
		return colors[index % colors.length];
	};

	const getColorByRating = (averageRating) => {
		const colors = [ "#E43836", "#FFC236","#36AE26", "#8A8A8A"];

		if( averageRating > 0 && averageRating < 2 ) {
			return colors[0];
		} else if( averageRating >= 2 && averageRating < 4 ) {
			return colors[1];
		} else if( averageRating >= 4 ) {
			return colors[2];
		} else if( averageRating <= 0 ) {
			return colors[3]
		}
	}

	const getTextByAverageRating = (averageRating) => {
		if( averageRating > 0 && averageRating < 2 ) {
			return "Not Friendly";
		} else if( averageRating >= 2 && averageRating < 4 ) {
			return "Partially Friendly";
		} else if( averageRating >= 4 ) {
			return "Friendly";
		} else if( averageRating <= 0 ) {
			return "No Rating"
		}
	}


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
			<div className='rating-circle'
				style={{ backgroundColor: getColorByRating(markerData.averageRating)}}
			>
				<h1 className='rating-number'>   
					{markerData.averageRating <= 0 ? '?' : markerData.averageRating}
 				</h1>
			</div>
			{/* TODO: Turn data to dynamic */}
			<h4 className='rating-label'
				style={{ color: getColorByRating(markerData.averageRating)}}
			>
				{getTextByAverageRating(markerData.averageRating)}
			</h4>
				<div className="rating-buttons">
				{[1, 2, 3, 4, 5].map((element, index) => (
					<button
					key={element}
					onClick={() => handleRatingClick(element)}
					style={{
						backgroundColor: rating === 0 ? getColorByIndex(index) : rating === element ? getColorByIndex(index) : 'white',
						color: rating === 0 ? 'white' : rating === element ? 'white' : '#8A8A8A',
						border: rating === 0 ? 'none' : rating === element ? 'none' : '1px solid #8A8A8A',
						transition: 'background-color 0.3s, color 0.3s, border 0.3s',
					}}
					onMouseEnter={(e) => {
						if (rating === 0) {
						e.target.style.backgroundColor = 'white';
						e.target.style.color = getColorByIndex(index);
						e.target.style.border = `1px solid ${getColorByIndex(index)}`;
						} else if (rating === element) {
						e.target.style.backgroundColor = getColorByIndex(index);
						e.target.style.color = 'white';
						e.target.style.border = 'none';
						} else {
						e.target.style.backgroundColor = getColorByIndex(index);
						e.target.style.color = 'white';
						e.target.style.border = 'none';
						}
					}}
					onMouseLeave={(e) => {
						if (rating === 0) {
						e.target.style.backgroundColor = getColorByIndex(index);
						e.target.style.color = 'white';
						e.target.style.border = 'none';
						} else if (rating === element) {
						e.target.style.backgroundColor = getColorByIndex(index);
						e.target.style.color = 'white';
						e.target.style.border = 'none';
						} else {
						e.target.style.backgroundColor = 'white';
						e.target.style.color = '#8A8A8A';
						e.target.style.border = '1px solid #8A8A8A';
						}
					}}
					>
					{element}
					</button>
				))}
				</div>
			</div>

			<div className="community-notes">
			<h4 className="community-notes-header">Community Notes</h4>
			{markerReviews.map((note, index) => (
				<MarkerNote 
					username={note.author} comment={note.comment} userRating={note.rating} 
					dateCreated={note.dateReviewed} getColorByRating={getColorByRating}
				/>
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