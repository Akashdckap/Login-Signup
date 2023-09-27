import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from "antd";
export default function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false)
          navigate('/login');
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
      <div className='d-flex justify-content-around'>
        <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
        <button className='btn btn-danger' onClick={handleDeleteAccount}>Logout</button>
      </div>
      <Button type="primary" className='ms-5' onClick={showModal}>
        Add task
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} okText={"submit"} onCancel={handleCancel}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Task name</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter a task name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Type something'></textarea>
        </div>
      </Modal>
    </div>
  )
}