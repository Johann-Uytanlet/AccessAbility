import { db, auth } from '../firebase/firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const UserRoutes = {

    loginUser: async ( req, res ) => {
        try {
            const { email, password } = req.body;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userToken = await user.getIdToken();

            res.status(200).send({ user, userToken });
        } catch( error ) {
            console.log(error.message);
            res.status(401).send({ message: 'Invalid email or password' });
        }
    },

    registerUser: async ( req, res ) => {
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
    
            res.status(201).send({ message: 'Registration successful' });
        } catch( error ) {
            console.log(error.message);
            res.status(500).send({ message: `${error.message}` });
        }
      }
}
  
export default UserRoutes;