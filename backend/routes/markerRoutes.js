import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const MarkerRoutes = {

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

	createMarker: async (req, res) => {
		try {
			const { location, lat, lng } = req.body;

			// - Get user data from session
			const currentUser = auth.currentUser;
            const userRef = doc( db, 'users', currentUser.uid );
            const userSnap = await getDoc(userRef);
			const user = userSnap.data();
			
			// - Create new marker 
			const markersCollectionRef = collection(db, 'markers');
			const newMarkerRef = doc(markersCollectionRef);
			await setDoc(newMarkerRef, {
				username: user.username,
				id: newMarkerRef.id,
				location,
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