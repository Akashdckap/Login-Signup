import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function ManagerHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token')
    axios.get("http://localhost:5051/managerHome", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.Status === "Success") {
          setName(res.data.name)
          navigate('/managerHome')
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
      <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Manager Home page</h1></center>
      <div className='d-flex justify-content-around'>
        <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
        <button className='btn btn-outline-danger' onClick={handleDeleteAccount}>Logout</button>
      </div>
    </div>
  )
}
