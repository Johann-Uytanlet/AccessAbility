import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Marker} from "./models/marker.js";
import markerRoutes from "./routes/markerRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());


app.get('/', (req, res) =>{
   console.log(req);
   return res.status(234).send("nice"); 
});

app.use('/marker', markerRoutes);
/*
app.post('/marker', async (req, res)=>{
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
})*/

mongoose
.connect(mongoDBURL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});
