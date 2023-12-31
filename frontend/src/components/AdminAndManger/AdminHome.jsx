import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const [name, setAdminName] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('admin_token')
    axios.get('http://localhost:4000/adminHome', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        // console.log(res.data.data[0].name)
        if (res.data.Status === "Success") {
          setAdminName(res.data.data[0].name)
          navigate('/adminHome')
        }
        else {
          alert(res.data.Error)
          navigate('/adminOrManagerLogin')
        }
      })
  }, [])

  // Below the function for the delete a task 
  const handleDeleteAccount = () => {
    localStorage.removeItem('admin_id')
    localStorage.removeItem('admin_name')
    localStorage.removeItem('admin_token')
    navigate('/adminOrManagerLogin')
  }
  return (
    <React.Fragment>
      <div>
        <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Admin Home page</h1></center>
        <div className='d-flex justify-content-around'>
          <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
          <button className='btn btn-outline-danger' onClick={handleDeleteAccount}>Logout</button>
        </div>
        <div className='d-flex justify-content-center gap-5 p-3'>
          <Link to='/adminHome/managerList'><button className='btn btn-primary'>Manager List</button></Link>
          <Link to='/adminHome/usersList'><button className='btn btn-primary'>Users List</button></Link>
        </div>
      </div>
    </React.Fragment>
  )
}
