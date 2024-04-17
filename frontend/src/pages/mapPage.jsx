import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../components/map.jsx';
const mapPage = () => {

  return (
    <div>
      <h1>Map Page</h1>
      <Map />
    </div>
  );
};

export default mapPage;