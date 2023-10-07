import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Actions from './components/Users/Actions'
import UserLogin from './components/Users/UserLogin'
import UserRegister from './components/Users/UserRegister'
import UserHome from './components/Users/UserHome'
import AdminAndManagerRegister from './components/AdminAndManger/AdminAndManagerRegister'
import AdminAndMangerLogin from './components/AdminAndManger/AdminAndMangerLogin'
import AdminHome from './components/AdminAndManger/AdminHome'
import ManagerHome from './components/AdminAndManger/ManagerHome'
import ManagerList from './components/AdminAndManger/ManagerList'
import UsersList from './components/AdminAndManger/UsersList'

import ViewTasks from './components/AdminAndManger/ViewTasks'
import AdminAssignedViews from './components/AdminAndManger/AdminAssignedViews'

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
        <Route path='/adminHome' element={<AdminHome />}></Route>
        <Route path='/managerHome' element={<ManagerHome />}></Route>
        <Route path='/managerList' element={<ManagerList />}></Route>
        <Route path='/usersList' element={<UsersList />}></Route>
        <Route path='/viewTasks/:id' element={<ViewTasks />}></Route>
        <Route path='/adminHome/AssignList' element={<AdminAssignedViews />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
