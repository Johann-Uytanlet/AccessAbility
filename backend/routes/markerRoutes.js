import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const MarkerRoutes = {

	createMarker: async (req, res) => {
		try {
			const { location, lat, lng } = req.body;
			const currentUser = auth.currentUser;
            const userRef = doc( db, 'users', currentUser.uid );
            const userSnap = await getDoc(userRef);
			const user = userSnap.data();

			const markersCollectionRef = collection(db, 'markers');

			const newMarkerRef = doc(markersCollectionRef);
			await setDoc(newMarkerRef, {
				username: user.username,
				id: newMarkerRef.id,
				location,
				averageRating: 0,
				lat,
				lng,
			});

			return res.status(201).json({ message: 'Marker creation successful' });
		} catch( error ) {
			return res.status(500).json({ error: 'Failed to create marker' });
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