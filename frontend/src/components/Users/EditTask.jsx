// import React from 'react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function EditTask() {
    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams();
    const naviagate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5051/userHome/editTask/${id}`)
            .then((response) => {
                setTaskName(response.data.data[0].task_name);
                setDescription(response.data.data[0].description);
            })
            .catch((error) => {
                console.error('Error fetching item:', error);
            });
    }, []);

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }
    const handelDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleUpdateTask = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5051/userHome/editTask/${id}`, { taskName: taskName, description: description })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Update User Task page</h1>
                <Link to='/userHome'><button className='btn btn-outline-primary'>Back to UserHomePage</button></Link>
            </div>
            <div className='wd-25 container'>
                <form onClick={handleUpdateTask}>
                    <div className="mb-3">
                        <label className="form-label">Task Name</label>
                        <input type="text" className="form-control" onChange={handleTaskNameChange} value={taskName} name='taskName' />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={handelDescriptionChange} value={description} name='description' />
                    </div>
                    <Link to='/userHome'><button type="submit" className="btn btn-primary">Update Task</button></Link>
                </form>
            </div>
        </div>
    )
}

export default EditTask
