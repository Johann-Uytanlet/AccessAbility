import React from 'react';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import nameLogo from '/logo/accessability (3).png';
import logo from '/logo/accessability (2).png'
import './navbar.css'

const navBar = () => {

    return (
        <div>
            <nav>
                <div className ="home">
                    <img className="" id="logo" src={logo} />
                    <img  className="" id="namelogo" src={nameLogo} />
                    <p className="ms-2 " >Find PWD friendly places and help inform other PWDs</p>
                </div>
                <div className='userauth'>
                    <Button className="me-3 px-4" variant="primary" >Login</Button>{' '}
                    <Button className="me-4 px-4" variant="outline-primary">Sign Up</Button>{' '}
                </div>
            </nav>
        </div>
    )
}

export default navBar