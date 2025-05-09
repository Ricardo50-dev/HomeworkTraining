import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from "react";
// Components

// Pages
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import Welcome from './components/pages/Welcome'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/user/profile" element={<Profile />} />
        <Route path="/pet/add" element={<AddPet />} />
        <Route path="/pet/edit/:id" element={<EditPet />} />
        <Route path="/pet/mypets" element={<MyPets />} />
        <Route path="/pet/myadoptions" element={<MyAdoptions />} />
        <Route path="/pet/:id" element={<PetDetails />} /> */}
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  )
}

export default App
