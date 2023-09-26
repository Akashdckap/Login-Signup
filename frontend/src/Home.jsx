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
      .then(err => console.log(err));
  }, [])

  const handleDeleteAccount = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        location.reload(true)
      }).catch(err => console.log(err))
  }
  return (
    <div>
      <h1>Homepage</h1>
      {
        auth ?
          <div>
            <h3>You are Authorized ---- {name}</h3>
            <button className='btn btn-danger' onClick={handleDeleteAccount}>Logout</button>
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
