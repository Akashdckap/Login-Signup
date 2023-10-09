import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export default function ViewTasksByAdmin() {
    const [taskList, setTaskList] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:5051/adminHome/usersList/viewTasks/${id}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setTaskList(res.data.data)
                }
                else {
                    alert(res.data.Error)
                    navigate('/adminHome')
                }
            })
            .catch(err => console.log(err))
    }, [])

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
                <Link to='/adminHome/usersList'><button className='btn btn-outline-success'>Back to UserListPage</button></Link>
                <Link to='/adminHome'><button className='btn btn-outline-primary'>Back to AdminHomePage</button></Link>
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