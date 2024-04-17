import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';


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
    </Routes>
  ); 
};

export default App;