import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BACKEND_URL from '../../config.js';

// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../../firebase/firebase';

const LoginRegisterModal = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [birthday, setBirthday] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    /*
        TODO: For session management:
            - Check if the user is already logged in.
            - If it is, then give them permission to create/edit markers
            - Otherwise, when they try to create markers, users will be redirected
            to either login or register
    */

    /*
        Check if the user is logged in 
    */
    useEffect(() => {
        fetchUserData();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/checkLoginStatus`, {
            	method: 'GET',
            });
            if( response.ok ) {
                const data = await response.json();
                setIsLoggedIn(data.loggedIn);
                if( isLoggedIn ) {
                    fetchUserData();
                }
            }
        } catch( error ) {
            console.error('Error checking login status:', error);
        }
      };
            

    const handleLogin = async (e) => {
        e.preventDefault();
        // - TODO: setLoading(true);
      
        try {
          	const response = await fetch(`${BACKEND_URL}/login`, {
            	method: 'POST',
            	headers: { 'Content-Type': 'application/json' },
            	body: JSON.stringify({ email: email, password: password }),
          	});
      
          	if( response.ok ) {
                fetchUserData();
                alert(`Login Successful`);
            	// - TODO: Session management stuff
          	} else {
            	const { message } = await response.json();
            	// - TODO: setError(message);
                alert(`Invalid Credentials: ${message}`);
            	// - TODO: Reset the input fields
          	}
        } catch( error ) {
          	console.log(error.message);
            alert(`Login Error: ${error.message}`);
          	// - TODO: setError('An error occurred during login');
        }
      
        // - TODO: setLoading(false);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        // - TODO: setLoading(true);
      
        try {
          	const response = await fetch(`${BACKEND_URL}/logout`, {
            	method: 'POST',
            	headers: { 'Content-Type': 'application/json' },
          	});
      
          	if( response.ok ) {
                setUserData(null);
                setIsLoggedIn(false);
                alert(`Logout Successful`);
          	} else {
                alert(`Logout Failed`);
          	}
        } catch( error ) {
          	console.log(error.message);
            alert(`Logout Error: ${error.message}`);
        }
      
        // - TODO: setLoading(false);
    };


    const handleRegister = async (e) => {
        e.preventDefault();
      
        const form = {
            username: username,
            email: email,
            password: password,
            birthday: birthday
        }

        try {
            const response = await fetch(`${BACKEND_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(form),
            });
      
            if( response.ok ) {
                alert('Registration Successful');
                // - Optionally, we can redirect the user to another page after successful registration
            } else {
                const { message } = await response.json();
                alert(`Registration Error: ${message}`);
          }
        } catch( error ) {
          console.error(error);
          alert('Registration Error');
        }
    };

    async function fetchUserData() {
        try {
            const response = await fetch(`${BACKEND_URL}/getUserData`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', },
            });

            if( response.ok ) {
                const { user } = await response.json();
                setUserData(user);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch( error ) {
            console.error('Error retrieving user data:', error);
        }
    };   

    return (
    <div>
        {isLoggedIn && userData && userData.username && (
        <div className="logout-section">
            <p>Welcome, {userData.username}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
        )}

        {!isLoggedIn && (
            <>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowLogin(false)}>Register</button>

            {showLogin ? (
                <div className="login-modal">
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <div className="password-input">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div className="register-modal">
                    <h2>Register</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    <button onClick={handleRegister}>Register</button>
                </div>
            )}
            </>
        )}
    </div>
    );
};

export default LoginRegisterModal;