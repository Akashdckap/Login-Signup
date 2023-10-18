import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Modal } from "antd";


export default function ViewTasks() {
    const [taskList, setTaskList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const token = localStorage.getItem('manager_token')
    useEffect(() => {
        axios.get(`http://localhost:5051/managerHome/viewTasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                //                 console.log(res)
                if (res.data.Status === "Success") {
                    setTaskList(res.data.data)
                }
                else {
                    // alert(res.data.Error)
                    setError(res.data.Error)
                    // console.log(res.data.Error);
                    // navigate(`/managerHome`)
                }
            })
            .catch(err => console.log(err))
    }, []);
    // console.log("error,", error);
    const handleDeleteTask = (e) => {
        const { id } = e.target;
        axios.post(`http://localhost:5051/delete`, { deleteId: id })
            .then(res => {
                window.location.reload();
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h2>View tasks Page</h2>
                <Link to='/managerHome'><button className='btn btn-outline-success'>Back to ManangerHomepage</button></Link>
                <Button type="primary" className='ms-5' onClick={showModal}>
                    Add task
                </Button>
            </div>
            <div className='taskMainContainer'>
                {
                    taskList.length > 0 ? taskList.map((item, index) =>
                        <div key={index} className='taskContainer'>
                            <p><span className='text-white'>Task Name : </span>{item.task_name}</p>
                            <p><span className='text-white'>Description : </span>{item.description}</p>
                            <button onClick={handleDeleteTask} id={item.id} className='btn btn-outline-danger btn-sm'>Delete</button>
                        </div>

                    ) : <h1 className='text-danger'>No tasks for this user</h1>
                }
            </div>
        </div>
    )
}
