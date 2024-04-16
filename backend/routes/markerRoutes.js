import express from 'express';
import {Marker} from "../models/marker.js"


const router = express.Router();


router.post('/marker', async (req, res)=>{
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
})