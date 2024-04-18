import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";

const ReviewRoutes = {

    /*
        markerID          # foreign key to the actual marker
        username,         # username of who made the review
        rating            # from 1 to 5
        comment           # comment
    */
    createMarkerReview: async (req, res) => {
        try {
            const { markerID, rating, comment, dateReviewed } = req.body;

			// - Get user data from Firebase authentication session
			const currentUser = auth.currentUser;
            const userRef = doc( db, 'users', currentUser.uid );
            const userSnap = await getDoc(userRef);
			const user = userSnap.data();

            // - Check if the 'markerReviews' collection exists
            const markerReviewsCollectionRef = collection(db, 'markerReviews');
            const dummyDocRef = doc(markerReviewsCollectionRef, 'dummy');
            const dummyDocSnap = await getDoc(dummyDocRef);

            if (!dummyDocSnap.exists()) {
                // Collection doesn't exist, create it by adding a dummy document
                await setDoc(dummyDocRef, {});
            }
    
            // - Create new marker review
            await addDoc(markerReviewsCollectionRef, {
                markerID: markerID,
                author: user.username,
                rating: rating, 
                comment: comment,
                dateReviewed: dateReviewed, 
            });

            return res.status(201).json({ message: 'Review created successfully' });
        } catch (error) {
            console.error('Error creating review', error);
            return res.status(500).json({ message: 'Failed to create review', error: error.message });
        }
    },

    getAllMarkerReviews: async (req, res) => {
        try {
            const { markerID } = req.query;

            console.log( "MarkerID:", markerID );

            const markerReviewsCollectionRef = collection(db, 'markerReviews');

            // - Create a query to filter markerReviews by markerID
            const querySnapshot = await getDocs(query(markerReviewsCollectionRef, where('markerID', '==', markerID)));

            // Extract the matching markerReviews from the query snapshot
            const reviews = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
            }));

			return res.status(200).json(reviews);
        } catch( error ) {
            console.error('Error getting marker reviews:', error);
            return res.status(500).json({ message: 'Failed to get marker reviews' });        
        }
    },
}

export default ReviewRoutes;