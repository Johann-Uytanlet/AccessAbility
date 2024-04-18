import { db, auth } from '../firebase/firebase.js';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const AccessPointRoutes = {

    upvote: async (req, res) => {
        try {
            // - req must have userID and markerID
        } catch( error ) {

        }
    },

    downvote: async (req, res) => {
        try {
            // - req must have userID and markerID
        } catch( error ) {

        }
    },

    clearVote: async (req, res) => {
        try {
            // - req must have userID and markerID
        } catch( error ) {

        }
    },
}

export default AccessPointRoutes;