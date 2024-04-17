import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, rating, comments, latlng } = req.body;

    if( !name || !latlng || !rating) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    let ratingCounts = [0, 0, 0, 0, 0];
    switch (rating) {
      case 1:
        ratingCounts[0] = 1;
        break;
      case 2:
        ratingCounts[1] = 1;
        break;
      case 3:
        ratingCounts[2] = 1;
        break;
      case 4:
        ratingCounts[3] = 1;
        break;
      case 5:
        ratingCounts[4] = 1;
        break;
    }


    const numberOfRaters = 1

    const newMarker = { name, latlng, rating, ratingCounts, numberOfRaters, comments };
    const docRef = await addDoc(collection(db, 'markers'), newMarker);
    res.status(201).send({ id: docRef.id, ...newMarker });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;