import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Actions from './components/Users/Actions'
import UserLogin from './components/Users/UserLogin'
import UserRegister from './components/Users/UserRegister'
import UserHome from './components/Users/UserHome'
import AdminAndManagerRegister from './components/AdminAndManger/AdminAndManagerRegister'
import AdminAndMangerLogin from './components/AdminAndManger/AdminAndMangerLogin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Actions />}></Route>
        <Route path='/userHome' element={<UserHome />}></Route>
        <Route path='/userRegister' element={<UserRegister />}></Route>
        <Route path='/userLogin' element={<UserLogin />}></Route>
        <Route path='/adminOrManagerRegister' element={<AdminAndManagerRegister />}></Route>
        <Route path='/adminOrManagerLogin' element={<AdminAndMangerLogin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
