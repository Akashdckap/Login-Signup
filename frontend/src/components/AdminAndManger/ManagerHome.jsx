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
  return (
    <div>
      <center className='p-3'><h2>ManagerHome page <span className='text-primary'>{name}</span></h2></center>
    </div>
  )
}
