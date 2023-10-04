import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Actions from './components/Users/Actions'
import UserLogin from './components/Users/UserLogin'
import UserRegister from './components/Users/UserRegister'
import UserHome from './components/Users/UserHome'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Actions />}></Route>
        <Route path='/userHome' element={<UserHome />}></Route>
        <Route path='/userRegister' element={<UserRegister />}></Route>
        <Route path='/userLogin' element={<UserLogin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
