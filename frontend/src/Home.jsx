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

  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    taskName: '',
    description: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    delete errors[name]
  };

  const validate = () => {
    let newErrors = { ...errors };
    let isVaild = true;
    if (formData.taskName.trim() === "" && formData.description.trim() === "") {
      newErrors.taskName = 'taskname is required';
      newErrors.description = 'description is required';
      isVaild = false;
    }
    setErrors(newErrors);
    return isVaild;
  }

  const handleSubmit = () => {
    // e.preventDefault();
    if (validate()) {
      axios.post('http://localhost:8081/home', formData)
        .then(res => {
          if (res.data.Status == "Success") {
            console.log(res.data.Status);
            console.log(res.data.id);
          }
          else {
            console.log(res.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
    else {
      console.log("not okay");
    }
  }

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          // console.log(res.data.id);
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
      <Modal title="Task Form" open={isModalOpen} okText={"submit"} onCancel={handleCancel} onOk={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Task name</label>
          <input type="email" className="form-control" onChange={handleChange} value={formData.taskName} id="exampleFormControlInput1" placeholder="Enter a task name" name='taskName' />
          {errors.taskName ? <span className="error">{errors.taskName}</span> : ""}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" onChange={handleChange} value={formData.description} id="exampleFormControlTextarea1" rows="3" placeholder='Type something' name='description'></textarea>
          {errors.description ? <span className="error">{errors.description}</span> : ""}
        </div>
      </Modal>
    </div>
  )
}