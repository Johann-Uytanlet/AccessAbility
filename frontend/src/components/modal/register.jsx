// RegisterModal.jsx
import React, { useState, useEffect } from 'react'
import BACKEND_URL from '../../../config.js';
import { Modal, Button, Form, FloatingLabel, ModalBody, ModalHeader } from 'react-bootstrap';
import "./modal.css"

// Brand Utilities
import brandname from "/logo/brandname.png";
import logo from "/logo/logo.png";

const RegisterModal = ({ showRegister, handleRegisterClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

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
    return (
        <Modal show={showRegister} onHide={handleRegisterClose} centered>
            <>
                <ModalHeader className="d-flex justify-content-center align-items-center">
                    <img id="logo" src={logo} alt="" />
                    <img id="brandname" src={brandname} alt="" />
                </ModalHeader>
                <ModalBody>
                    <Modal.Title className='pb-3'>Register an account</Modal.Title>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                        <Form.Control type="text" placeholder="accessabilityuser" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="show-button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'} </button>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
    );
};

export default RegisterModal;