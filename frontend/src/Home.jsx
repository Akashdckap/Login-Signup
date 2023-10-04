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
  const [storeData, setStoreData] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let token = localStorage.getItem('usertoken')
      axios.post('http://localhost:8881/home', formData, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          if (res.data.Status == "Success") {
            navigate('/home')
          }
          else {
            alert(res.data.Error);
          }
        })
        .catch(err => console.log(err));
      setIsModalOpen(false);
      window.location.reload(true)
    }
    else {
      console.log("not okay");
    }
  }

  // useEffect(() => {
  //   fetch('http://localhost:5051/home')
  //     .then(res => res.json())

  //     .then(data => setStoreData(data))
  //     .catch(err => console.log("data", err))
  // }, [])
  // console.log(storeData);


  axios.defaults.withCredentials = true;
  useEffect(() => {
    let token = localStorage.getItem('usertoken')
    axios.get('http://localhost:8881/home', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        // console.log(res)
        if (res.data.Status === "Success") {
          setName(res.data.name);
          setStoreData(res.data.data)
        } else {
          navigate('/login');
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [])

  const handleDeleteAccount = () => {
    localStorage.removeItem('usertoken');
    navigate('/login');
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
          <input type="text" className="form-control" onChange={handleChange} value={formData.taskName} id="exampleFormControlInput1" placeholder="Enter a task name" name='taskName' />
          {errors.taskName ? <span className="error">{errors.taskName}</span> : ""}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" onChange={handleChange} value={formData.description} id="exampleFormControlTextarea1" rows="3" placeholder='Type something' name='description'></textarea>
          {errors.description ? <span className="error">{errors.description}</span> : ""}
        </div>
      </Modal>
      <div className='taskMainContainer'>
        {
          storeData.map((item, index) =>
            <div key={index} className='taskContainer'>
              <p><span>Task Name : </span>{item.task_name}</p>
              <p><span>Description : </span>{item.description}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}