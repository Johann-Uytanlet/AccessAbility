import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

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

  	getMarkerReviews: async (req, res) => {
		try {
		} catch( error ) {
		}
  	},
};

export default MarkerRoutes;