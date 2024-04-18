import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore";

const MarkerRoutes = {

	createMarker: async (req, res) => {
		try {
			const { name, lat, lng } = req.body;

			// - Get user data from Firebase authentication session
			const currentUser = auth.currentUser;
            const userRef = doc( db, 'users', currentUser.uid );
            const userSnap = await getDoc(userRef);
			const user = userSnap.data();
			
			// - Create new marker 
			const markersCollectionRef = collection(db, 'markers');
			const newMarkerRef = doc(markersCollectionRef);
			await setDoc(newMarkerRef, {
				username: user.username,
				markerID: newMarkerRef.id,
				name: name,
				lat,
				lng,
				averageRating: 0,
			});

			return res.status(201).json({ message: 'Marker creation successful' });
		} catch( error ) {
			return res.status(500).json({ message: 'Failed to create marker' });
		}
	},

	getAllMarkers: async (req, res) => {
		try {
			const markers = [];
			const markersCollectionRef = collection(db, 'markers');
			const markersSnapshot = await getDocs(markersCollectionRef);
			markersSnapshot.forEach((doc) => {
				markers.push(doc.data());
			});
			return res.status(200).json(markers);
		} catch( error ) {
		  	return res.status(500).json({ error: 'Failed to retrieve markers' });
		}
	},
	
	getMarker: async (req, res) => {
		try {
			const { markerID } = req.params;
			const markerRef = doc(db, 'markers', markerID);
			const markerSnapshot = await getDoc(markerRef);
		
			if( markerSnapshot.exists() ) {
				const marker = { id: markerSnapshot.id, ...markerSnapshot.data() };
				return res.status(200).json(marker);
			} else {
				return res.status(404).json({ error: 'Marker not found' });
			}
		} catch( error ) {
		  	return res.status(500).json({ error: 'Failed to retrieve marker' });
		}
	},

	updateAllAverageRatings: async (req, res) => {
		try {
			// - Get all markers
			const markers = [];
			const markersCollectionRef = collection(db, 'markers');
			const markersSnapshot = await getDocs(markersCollectionRef);
			markersSnapshot.forEach((doc) => {
				markers.push({ id: doc.id, ...doc.data() });
			});
	
			// - Iterate over each marker
			for (const marker of markers) {
				const markerID = marker.markerID;
	
				// - Get all reviews for the current marker
				const markerReviewsCollectionRef = collection(db, 'markerReviews');
				const querySnapshot = await getDocs(query(markerReviewsCollectionRef, where('markerID', '==', markerID)));
	
				// - Extract the ratings from the reviews
				const ratings = querySnapshot.docs.map((doc) => doc.data().rating);
	
				// - Calculate the average rating
				const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
				const averageRating = ratings.length > 0 ? Math.round((totalRating / ratings.length) * 10) / 10 : 0;
	
				// - Update the marker's averageRating
				const markerRef = doc(db, 'markers', marker.id);
				await updateDoc(markerRef, { averageRating });
			}
	
			return res.status(200).json({ message: 'Average ratings updated successfully' });
		} catch (error) {
			console.error('Error updating average ratings:', error);
			return res.status(500).json({ message: 'Failed to update average ratings' });
		}
	},

/*
	updateAverageRating: async (req, res) => {
		try {
			const { markerID } = req.body;
			
			// - Get marker document
			const markerRef = doc(db, 'markers', markerID);
			const markerSnapshot = await getDoc(markerRef);

			if( !markerSnapshot.exists() ) {
				return res.status(404).json({ message: 'Marker not found' });
			}

			// - Create a query to filter markerReviews by markerID
			const markerReviewsCollectionRef = collection(db, 'markerReviews');
			const querySnapshot = await getDocs(query(markerReviewsCollectionRef, where('markerID', '==', markerID)));

            // - Extract the matching markerReviews from the query snapshot
            const reviews = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
            }));

			// - Compute the average rating from the reviews
			const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
			const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

			// - Update the marker document's averageRating field
			await updateDoc(markerRef, {
				averageRating: averageRating,
			});
	
			return res.status(200).json({ message: 'Average rating updated successfully' });
		} catch( error ) {
			console.error('Error updating average rating', error);
			return res.status(500).json({ message: 'Failed to update average rating', error: error.message });
		}
	},

	updateAllAverageRatings: async (req, res) => {
		try {
			// - Get all marker documents
			const markersCollectionRef = collection(db, 'markers');
			const markerQuerySnapshot = await getDocs(markersCollectionRef);
	
			// - Iterate over each marker document
			const updatePromises = markerQuerySnapshot.docs.map(async (markerDoc) => {
				const markerID = markerDoc.markerID;
	
				try {
					// - Create a query to filter markerReviews by markerID
					const markerReviewsCollectionRef = collection(db, 'markerReviews');
					const reviewQuerySnapshot = await getDocs(query(markerReviewsCollectionRef, where('markerID', '==', markerID)));
				
					// - Extract the matching markerReviews from the query snapshot
					const reviews = reviewQuerySnapshot.docs.map((doc) => ({
						...doc.data(),
					}));

					// - Compute the average rating from the reviews
					const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
					const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
		
					// - Update the marker document's averageRating field
					const markerRef = doc(db, 'markers', markerID);
					await updateDoc(markerRef, {
						averageRating: averageRating,
					});
				} catch (error) {
					console.error('Error fetching marker reviews:', error);
					throw error; // Rethrow the error to be caught by the outer catch block
				}
			});
	
			// - Wait for all update promises to resolve
			await Promise.all(updatePromises);
			return res.status(200).json({ message: 'Average ratings updated successfully for all markers' });
		} catch (error) {
			console.error('Error updating average ratings', error);
			return res.status(500).json({ message: 'Failed to update average ratings', error: error.message });
		}
	},
*/
};

export default MarkerRoutes;