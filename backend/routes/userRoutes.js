import { db, auth } from '../firebase/firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

const UserRoutes = {

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userToken = await user.getIdToken();

            return res.status(200).send({ user, userToken });
        } catch( error ) {
            console.log(error.message);
            return res.status(401).send({ message: 'Invalid email or password' });
        }
    },

    registerUser: async (req, res) => {
        try {
            const { username, birthday, email, password } = req.body;
    
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            const usersCollectionRef = collection(db, 'users');
            const userDocRef = doc(usersCollectionRef, user.uid);
    
            await setDoc(userDocRef, {
                username: username,
                email: email,
                birthday: birthday,
            });
    
            return res.status(201).send({ message: 'Registration successful' });
        } catch( error ) {
            console.log(error.message);
            return res.status(505).send({ message: `${error.message}` });
        }
    },

    logoutUser: async (req, res) => {
        try {
            signOut(auth)
            return res.status(201).send({ message: 'Logout successful' });
        } catch( error ) {
            console.log(error.message);
            return res.status(500).send({ message: `${error.message}` });
        }
    },

    getUserData: async (req, res) => {
        try {
            const user = auth.currentUser;
            if( !user ) {
                return res.status(400).send({ message: "User not found." })
            }

            const userRef = doc( db, 'users', user.uid );
            const docSnap = await getDoc(userRef);

            if( docSnap.exists() ) {
                return res.status(200).send({ user: docSnap.data() });
            } else {
                return res.status(400).send({ message: "User not found." })
            }

        } catch( error ) {
            console.log(error.message);
            return res.status(500).send({ message: `${error.message}` });
        }
    },

    checkLoginStatus: async (req, res) => {
        try {
            const user = auth.currentUser;
            if( user ) {
                return res.status(200).json({ loggedIn: true, user: user.email });
            } else {
                return res.status(200).json({ loggedIn: false });
            }
        } catch( error ) {
            console.error('Error in checkLogin:', error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}
  
export default UserRoutes;