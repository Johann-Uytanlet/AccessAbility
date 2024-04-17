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
// router.post( '/createMarker', MarkerRoutes.createMarker )

export default router;