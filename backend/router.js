import express from 'express';
import MarkerRoutes from '../backend/routes/markerRoutes.js'
import UserRoutes from '../backend/routes/userRoutes.js'
import ReviewRoutes from '../backend/routes/reviewRoutes.js'

const router = express.Router();

// - User Routes
router.get( '/checkLoginStatus', UserRoutes.checkLoginStatus ); 
router.get( '/getUserData', UserRoutes.getUserData )
router.post( '/login', UserRoutes.loginUser )
router.post( '/register', UserRoutes.registerUser )
router.post( '/logout', UserRoutes.logoutUser )

// - Marker Routes
router.get( '/getAllMarkers', MarkerRoutes.getAllMarkers );
router.post( '/createMarker', MarkerRoutes.createMarker );

// - Review Routes
router.get( '/getAllMarkerReviews', ReviewRoutes.getAllMarkerReviews );
router.post( '/createMarkerReview', ReviewRoutes.createMarkerReview );

export default router;