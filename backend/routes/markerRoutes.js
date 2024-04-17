import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';

const MarkerRoutes = {

	createMarker: async (req, res) => {
		try {
			const { userID, location, lat, lng } = req.body;
			const user = auth.currentUser;

			const newMarker = {
				userID: user.uid,
				username: user.username,
				location,
				averageRating: 0,
				lat,
				lng,
			};
			const markerRef = await addDoc( collection(db, 'markers'), newMarker );
			res.status(201).json({ id: markerRef.id, ...newMarker });
		} catch( error ) {
			return res.status(500).json({ error: 'Failed to create marker' });
		}
	},

	getAllMarkers: async (req, res) => {
		try {
			const markersSnapshot = await getDocs(collection(db, 'markers'));
			const markers = markersSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			res.status(200).json(markers);
		} catch( error ) {
		  	return res.status(500).json({ error: 'Failed to retrieve markers' });
		}
	  },
	
  	createMarkerReview: async (req, res) => {
		try {
			const { markerID, userID, rating, comment, filePath } = req.body;
			const user = auth.currentUser;

			if( !user ) {
				return res.status(401).json({ error: 'Unauthorized' });
			}

			// - Create a new marker review
			const newReview = {
				markerID,
				userID: user.uid,
				username: user.username,
				rating,
				comment,
				filePath,
			};
			await addDoc(collection(db, 'markerReviews'), newReview);

			// - Update average rating for the marker
			const markerRef = doc(db, 'markers', markerID);
			const markerSnapshot = await getDoc(markerRef);
			const marker = markerSnapshot.data();
			const updatedAverageRating = (marker.averageRating * marker.reviewCount + rating) / (marker.reviewCount + 1);
			
			await updateDoc(markerRef, {
				averageRating: updatedAverageRating,
				reviewCount: marker.reviewCount + 1,
			});

			return res.status(201).json(newReview);
		} catch( error ) {
			return res.status(500).json({ error: 'Failed to create marker review' });
		}
  	},

  	getMarkerReviews: async (req, res) => {
		try {
			const { markerID } = req.params;
			const reviewsQuery = query(collection(db, 'markerReviews'), where('markerID', '==', markerID));
			const reviewsSnapshot = await getDocs(reviewsQuery);
			const reviews = reviewsSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			return res.status(200).json(reviews);
		} catch( error ) {
			return res.status(500).json({ error: 'Failed to retrieve marker reviews' });
		}
  	},
};

export default MarkerRoutes;