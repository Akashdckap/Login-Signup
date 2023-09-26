import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  // const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          // navigate('/login');
        } else {
          setAuth(false)
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [])

  const handleDeleteAccount = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        location.reload(true)
      }).catch(err => console.log(err))
  }
  return (
    <div>
      <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Homepage</h1></center>
      {
        auth ?
          <div className='d-flex'>
            <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
            <button>Add Task</button>
            <button style={{ color: '#CD5C5C', backgroundColor: 'burlywood' }} onClick={handleDeleteAccount}>Logout</button>
          </div>
          :
          <div>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to='/login'>Login</Link>
          </div>
      }
    </div>
  )
}
