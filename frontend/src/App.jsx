import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Login from './Login'
import Welcome from './Welcome'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
