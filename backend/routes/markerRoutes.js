<<<<<<< Updated upstream
import express from 'express';
import {Marker} from "../models/marker.js"

=======
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';
>>>>>>> Stashed changes

class MarkerRoutes {

<<<<<<< Updated upstream

router.post('/', async (req, res)=>{
    try{
        console.log("the req is", req);
        console.log('Received marker data:', req.body);
        const { name, latlng, rating, ratingCounts, numberOfRaters, comments } = req.body;
        
        
        if(!name ||
            !latlng ||
        !rating |
        !ratingCounts ||
        !numberOfRaters ||
        !comments){
            return res.status(400).send({
            message: 'Send all required fields'
        });
        } 
        const newMarker = new Marker({ name, latlng, rating, ratingCounts, numberOfRaters, comments });        
        const marker = await Marker.create(newMarker);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});
=======
  async createMarker( req, res ) {
    try {
      const { name, latlng, rating, ratingCounts, numberOfRaters, comments } = req.body;

      if( !name || !latlng || !rating || !ratingCounts || !numberOfRaters || !comments ) {
        return res.status(400).send({ message: 'Send all required fields' });
      }

      const newMarker = { name, latlng, rating, ratingCounts, numberOfRaters, comments };
      const docRef = await addDoc(collection(db, 'markers'), newMarker);
      res.status(201).send({ id: docRef.id, ...newMarker });
    } catch( err ) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  }
}
>>>>>>> Stashed changes

export default MarkerRoutes;