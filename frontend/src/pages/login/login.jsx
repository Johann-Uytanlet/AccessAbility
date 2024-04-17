import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../../firebase/firebase';

export default function Login() {
    const navigate = useNavigate();

    // - TODO: Add HTML elements (email and password inputs) as variables
	const [showLogin, setShowLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [birthday, setBirthday] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');


    /*
        TODO: For session management:
            - Check if the user is already logged in.
            - If it is, then give them permission to create/edit markers
            - Otherwise, when they try to create markers, users will be redirected
            to either login or register
  
        useEffect(() => {
          }, [navigate]);
    */

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          	const email = document.getElementById('email-input').value;
          	const password = document.getElementById('password-input').value;
      
          	const response = await fetch('/loginUser', {
            	method: 'POST',
            	headers: { 'Content-Type': 'application/json' },
            	body: JSON.stringify({ email, password }),
          	});
      
          	if( response.ok ) {
            	const { user } = await response.json();
            	alert('Login Successful');
            	// - TODO: Session management stuff
          	} else {
            	const { message } = await response.json();
            	setError(message);
            	alert('Invalid Credentials');
            	// - TODO: Reset the input fields
          	}
        } catch( error ) {
          	console.log(error.message);
          	setError('An error occurred during login');
        }
      
        setLoading(false);
    };

    // - TODO: HTML Component for Login
    return( 
        <div>
            <p> Login.jsx says "Hello there!" </p>
        </div>
    )
}