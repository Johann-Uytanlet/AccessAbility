import express from 'express';
import MarkerRoutes from '../backend/routes/markerRoutes.js'
import UserRoutes from '../backend/routes/userRoutes.js'

const router = express.Router();

// - User Routes
router.post( '/login', UserRoutes.loginUser )
router.post( '/register', UserRoutes.registerUser )

// - MarkerRoutes
// router.post( '/createMarker', MarkerRoutes.createMarker )

export default router;