// models/marker.js
//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const markerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latlng: { type: Object, required: true },
  rating: { type: Number, required: true },
  ratingCounts: { type: [Number], required: true },
  numberOfRaters: { type: Number, required: true },
  comments: { type: [String], default: [] }
});

//const Marker = mongoose.model('Marker', markerSchema);

//module.exports = marker;
export const Marker = mongoose.model('Marker', markerSchema);;//= mongoose.model('marker', {name: String});