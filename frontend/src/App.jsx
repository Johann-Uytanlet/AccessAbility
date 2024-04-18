import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Map from './pages/mapPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Map />} />
      <Route path='/map' element={<Map />}/>
    </Routes>
  ); 
};

export default App;