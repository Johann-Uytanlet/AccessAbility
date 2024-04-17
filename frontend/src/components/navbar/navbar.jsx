import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import nameLogo from '/logo/accessability (3).png';
import logo from '/logo/accessability (2).png';
import './navbar.css';
import LoginModal from '../modal/login';
import RegisterModal from '../modal/register';
import BACKEND_URL from '../../../config.js';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);
    
    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);
    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

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

    const handleLogout = async () => {
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
    };
    
    return (
        <div>
            <nav>
                <div className="home">
                    <img className="" id="logo" src={logo} alt="Logo" />
                    <img className="" id="namelogo" src={nameLogo} alt="Name Logo" />
                    <p className="ms-2">Find PWD friendly places and help inform other PWDs</p>
                </div>
                <div className="userauth">
                    {isLoggedIn ? (
                        <>
                            <span>Welcome, {userData.username} </span>
                            <Button className="me-3 px-4" variant="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="me-3 px-4" variant="primary" onClick={handleLoginShow}>
                                Login
                            </Button>
                            <Button className="me-4 px-4" variant="outline-primary" onClick={handleRegisterShow}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </nav>

            <LoginModal
                showLogin={showLogin}
                handleLoginClose={handleLoginClose}
                setUserData={setUserData}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                userData={userData}
                handleLogout={handleLogout}
            />
            <RegisterModal
                showRegister={showRegister}
                handleRegisterClose={handleRegisterClose}
            />
        </div>
    );
};

export default NavBar;