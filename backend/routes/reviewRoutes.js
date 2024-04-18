import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const ReviewRoutes = {

    /*
        markerID          # foreign key to the actual marker
        username,         # username of who made the review
        rating            # from 1 to 5
        comment           # comment
    */
    createMarkerReview: async (req, res) => {
        try {
            const { markerID, rating, comment } = req.body;
    
            // - Create new marker review
            const markerReviewsCollectionRef = collection(db, 'markerReviews');
            await addDoc(markerReviewsCollectionRef, {
                markerID: markerID,
                rating: rating, 
                comment: comment, 
            });
            
            return res.status(201).json({ message: 'Review created successfully' });
        } catch (error) {
            console.error('Error creating review', error);
            return res.status(500).json({ message: 'Failed to create review', error: error.message });
        }
    },

    getAllMarkerReviews: async (req, res) => {
        try {
            const markerID = req.query.markerID;
            const reviews = [];
            const markerReviewsCollectionRef = collection(db, 'markerReviews');
			const reviewsSnapshot = await getDocs(markerReviewsCollectionRef);
			reviewsSnapshot.forEach((doc) => {
                if( reviews.markerID == markerID ) {
                    reviews.push(doc.data());
                }
			});
			return res.status(200).json(reviews);
        } catch( error ) {
            return res.status(500).json({ message: 'Failed to get all marker reviews' });
        }
    },

    /*
        getMarkerReview: async (req, res) => {
            try {
            } catch( error ) {
            }
        },

        deleteMarkerReview: async (req, res) => {
            try {

            } catch( error ) {

            }
        },

        updateMarkerReview: async (req, res) => {
            try {

            } catch( error ) {

            }
        },
    */
}

export default ReviewRoutes;