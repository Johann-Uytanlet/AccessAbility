import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Map from './pages/mapPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
/*
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
*/
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/asdf' element={<Home />} />
      <Route path='/map' element={<Map />}/>
    </Routes>
  ); 
};

export default App;