import express from 'express';
import MarkerRoutes from '../backend/routes/markerRoutes.js'
import UserRoutes from '../backend/routes/userRoutes.js'

const router = express.Router();

// - User Routes
router.get( '/checkLoginStatus', UserRoutes.checkLoginStatus ); 
router.get( '/getUserData', UserRoutes.getUserData )
router.post( '/login', UserRoutes.loginUser )
router.post( '/register', UserRoutes.registerUser )
router.post( '/logout', UserRoutes.logoutUser )

// - MarkerRoutes
router.get( '/getAllMarkers', MarkerRoutes.getAllMarkers );
router.get( '/getMarkerReviews', MarkerRoutes.getMarkerReviews );
router.post( '/createmarker', MarkerRoutes.createMarker );
router.post( '/createMarkerReview', MarkerRoutes.createMarkerReview )

export default router;