import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Map from './pages/mapPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/map' element={<Map />}/>
    </Routes>
  ); 
};

export default App;