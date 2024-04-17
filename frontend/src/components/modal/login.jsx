// LoginModal.jsx
import React, { useState, useEffect } from 'react';
import BACKEND_URL from '../../../config.js';
import { Modal, Button, Form, FloatingLabel, ModalBody, ModalHeader } from 'react-bootstrap';
import "./modal.css"

// Brand Utilities
import brandname from "/logo/brandname.png";
import logo from "/logo/logo.png";

const LoginModal = ({ showLogin, handleLoginClose, setUserData, setIsLoggedIn, isLoggedIn, userData, handleLogout }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          	const response = await fetch(`${BACKEND_URL}/login`, {
            	method: 'POST',
            	headers: { 'Content-Type': 'application/json' },
            	body: JSON.stringify({ email: email, password: password }),
          	});
      
          	if( response.ok ) {
                fetchUserData();
                alert(`Login Successful`);
          	} else {
            	const { message } = await response.json();
                alert(`Invalid Credentials: ${message}`);
          	}
        } catch( error ) {
          	console.log(error.message);
            alert(`Login Error: ${error.message}`);
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

    return (
        <Modal show={showLogin} onHide={handleLoginClose} centered>
            {!isLoggedIn && (
                <>
                    <div className="login-modal">
                        <ModalHeader className="d-flex justify-content-center align-items-center">
                            <img id="logo" src={logo} alt="" />
                            <img id="brandname" src={brandname} alt="" />
                        </ModalHeader>

                        <ModalBody>
                            <Modal.Title className='pb-3'>Login your account</Modal.Title>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                <button className="show-button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Hide' : 'Show'} </button>
                            </FloatingLabel>

                        </ModalBody>

                    </div>
                    <Modal.Footer className="d-flex justify-content-center align-items-center">
                        <Button variant="primary" className="px-3" onClick={handleLogin}>Login</Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    );
};

export default LoginModal;