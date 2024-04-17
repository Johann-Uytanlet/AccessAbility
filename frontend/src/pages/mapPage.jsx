import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../components/map.jsx';
import NavBar from '../components/navbar/Navbar.jsx';

const mapPage = () => {

  return (
    <div>
      <NavBar />
      <Map />
    </div>
  );
};

export default mapPage;