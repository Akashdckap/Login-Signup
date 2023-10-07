import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const [name, setAdminName] = useState('')
  const navigate =useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token')
    axios.get('http://localhost:5051/adminHome', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        // console.log(res);
        if (res.data.Status === "Success") {
          setAdminName(res.data.name)
          // getStoreData(res.data.data)
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
    <React.Fragment>
    <div>
      <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Admin Home page</h1></center>
      <div className='d-flex justify-content-around'>
        <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
        <button className='btn btn-outline-danger' onClick={handleDeleteAccount}>Logout</button>
      </div>
      <div className='d-flex justify-content-center gap-5 p-3'>
        <Link to='/managerList'><button className='btn btn-primary'>Manager List</button></Link>
        <Link to='/usersList'><button className='btn btn-primary'>Users List</button></Link>
      </div>
    </div>
    <div>
        {/* {
          getData.map((item,index)=>
          <div key={index} className='taskContainer'>
          <p><span className='text-white'>Manager Name : </span>{item.name}</p>
          <p><span className='text-white'>Description : </span>{item.description}</p>
        </div>)
        } */}
    </div>
    </React.Fragment>
  )
}
