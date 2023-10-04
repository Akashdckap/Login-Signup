import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const [name, setAdminName] = useState('')
  const navigate =useNavigate();
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



  return (
    <div>
      <center className='p-3'><h2>Admin Home page <span className='text-primary'>{name}</span></h2></center>
    </div>
  )
}
