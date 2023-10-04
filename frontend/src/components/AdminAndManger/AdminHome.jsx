import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const [name, setAdminName] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token')
    axios.get('http://localhost:5051/adminHome', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.Status === "Success") {
          setAdminName(res.data.name)
          navigate('/adminHome')
        }
        else {
          alert(res.data.Error)
          navigate('/adminOrManagerLogin')

        }
      })
  }, [])

  const handleDeleteAccount = () => {
    localStorage.removeItem('token')
    navigate('/adminOrManagerLogin')
  }


  return (
    <div>
      <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Admin Home page</h1></center>
      <div className='d-flex justify-content-around'>
        <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
        <button className='btn btn-danger' onClick={handleDeleteAccount}>Logout</button>
      </div>    </div>
  )
}
