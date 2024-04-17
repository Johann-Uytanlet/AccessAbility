import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BACKEND_URL from '../../../config.js';
import { Modal, Button, Form, FloatingLabel, ModalBody, ModalHeader } from 'react-bootstrap';
import "./modal.css"

// Brand Utilities
import brandname from "/logo/brandname.png";
import logo from "/logo/logo.png";
import brandnamelogo from "/logo/brandnamelogo.png";

// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../../../firebase/firebase';

const LoginRegisterModal = () => {
	const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(true);
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
    }

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    return (
    <>
    <Button variant="primary" onClick={handleLoginShow}>
     Login
    </Button>
    <Button variant="outline-primary" onClick={handleRegisterShow}>
     Sign Up
    </Button>

    <Modal show={showLogin} onHide={handleLoginShow} centered>
        {isLoggedIn && userData && userData.username && (
        <div className="logout-section">
            <p>Welcome, {userData.username}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
        )}

        {!isLoggedIn && (
            <>
            {showLogin ? (
    <div className="login-modal">

        <ModalHeader className="d-flex justify-content-center align-items-center">
            <img id="logo" src={logo} alt="" />
            <img id="brandname" src={brandname} alt="" />
        </ModalHeader>

        <ModalBody>
            <Modal.Title className='pb-3'>Login your account</Modal.Title>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                <Form.Control  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" /> 
            </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type={showPassword ? 'text' : 'password'}  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="show-button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'} </button>
      </FloatingLabel>

      </ModalBody>
    
    </div>
            ):(<div></div>)}
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <Button variant="primary" className="px-3" onClick={handleLogin}>Login</Button>
        </Modal.Footer>
        </>
            
        )}  
 
    </Modal>

    <Modal show={showRegister} onHide={handleRegisterShow} centered>
    <>
        <ModalHeader className="d-flex justify-content-center align-items-center">
            <img id="logo" src={logo} alt="" />
            <img id="brandname" src={brandname} alt="" />
        </ModalHeader>
        <ModalBody>
                <Modal.Title className='pb-3'>Register an account</Modal.Title>
                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                    <Form.Control type="text" placeholder="accessabilityuser" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="show-button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'} </button>
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <button className="show-button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'} </button>
                </FloatingLabel>
              </ModalBody>
            </>
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <Button variant="primary" className="px-3" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="primary" className="px-3" onClick={handleRegisterClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>


    </>
    )};

export default LoginRegisterModal;