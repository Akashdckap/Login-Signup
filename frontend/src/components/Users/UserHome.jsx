import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from "antd";


export default function UserHome() {

  const [searchText, setSearchText] = useState('')
  // const [filteredItems, setFilteredItems] = useState([])

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');

  // const [time, setTime] = useState([])
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
  });
  const [storeData, setStoreData] = useState([]);
  const [errors, setErrors] = useState({
    taskName: '',
    description: '',
  });

  // console.log("task name", formData);

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
    let token = localStorage.getItem('user_token')
    e.preventDefault();
    if (validate()) {
      axios.post('http://localhost:5051/userHome', formData, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          if (res.data.Status === "Success") {
            setMessage(res.data.Status);
          }
          else {
            alert(res.data.Error)
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
  
  // console.log(time);
  // console.log("task name", formData);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // console.log(new Date());
    let token = localStorage.getItem('user_token')
    axios.get('http://localhost:5051/userHome', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          setName(res.data.user_name);
          setStoreData(res.data.data)
          navigate('/userHome');
        } else {
          navigate('/userLogin');
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [])


  const handleDeleteAccount = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_token')
    navigate('/userLogin')
  }

  const handleDeleteTask = (e) => {
    const { id } = e.target;
    axios.post(`http://localhost:5051/delete`, { deleteId: id })
      .then(res => {
        // console.log(res);
        window.location.reload();
        if (res.data.message === "task delete successfully") {
          navigate('/userHome')
        }
      })
  }

  // storeData.filter(item => {
  //   console.log(item.task_name);
  // })
  const handleSearch = (e) => {
    setSearchText(e.target.value)
    const filterData = storeData.filter(item => {
      item.taskName.toLowerCase().includes(e.target.value.toLowerCase())
      // console.log(item.taskName);()
    });
    setStoreData(filterData)
  }
  // console.log(storeData);

  return (
    <div>
      <center><h1 style={{ color: 'ThreeDDarkShadow' }}>User Homepage</h1></center>
      <div className='d-flex justify-content-around'>
        <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
        <button className='btn btn-outline-danger' onClick={handleDeleteAccount}>Logout</button>
      </div>
      {/* <h3>{message}</h3> */}
      <div className='d-flex  justify-content-start align-items-center gap-5'>
        <Button type="primary" className='ms-5' onClick={showModal}>
          Add task
        </Button>
        <input type="text" onChange={handleSearch}
          value={searchText}
          className="form-control w-25" id="exampleInputEmail1" placeholder="search tasks" />
      </div>
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
              <p><span className='text-white'>Task Name : </span>{item.task_name}</p>
              <p><span className='text-white'>Description : </span>{item.description}</p>
              {/* <p><span className='text-white'>Created at : </span>{time}</p> */}
              <div className='d-flex justify-content-center gap-3'>
                <Link to={`/userHome/${item.id}`}><button type="button" id={item.id} className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#exampleModalCenter">Delete</button></Link>
                <Link to={`/userHome/editTask/${item.id}`}><button id={item.id} className='btn btn-outline-success btn-sm'>Edit</button></Link>
              </div>
            </div>
          )
        }
      </div>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Task Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className='closePopHub'>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>Are you sure to delete this task ?</h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal">Cancel</button>
              <button type="button" id={id} onClick={handleDeleteTask} className="btn btn-outline-success btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}