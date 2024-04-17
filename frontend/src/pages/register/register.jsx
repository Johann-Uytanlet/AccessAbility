import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

// import { auth, db } from '../../../firebase/firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { collection, doc, setDoc } from "firebase/firestore";

export default function Register({ user }) {

    // - L

    // - TODO: Add HTML elements (email and password inputs) as variables
    const handleRegister = async (e) => {
        e.preventDefault();
      
        try {
            const response = await fetch('/registerUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(form),
            });
      
            if( response.ok ) {
                alert('Registration Successful');
                // Optionally, you can redirect the user to another page after successful registration
            } else {
                const { message } = await response.json();
                alert(`Registration Error: ${message}`);
          }
        } catch( error ) {
          console.error(error);
          alert('Registration Error');
        }
    };

    // - TODO: HTML Component for Register
    return (
        <div>
            <p> Register.jsx says "Hello there!" </p>
        </div>
    );
}