import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';

function App() {
  return (
    <Router>
      <Header />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/addUser" element={<AddUser/>}/>
         <Route path="/updateUser/:id"  element={<UpdateUser/>}/>
         <Route path="/viewUser/:id" element={<ViewUser/>}/>
       </Routes>
    </Router>
  );
}

export default App;
