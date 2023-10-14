import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function EditTask() {
    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5051/userHome/editTask/${id}`)
            .then((response) => {
                setTaskName(response.data.data[0].task_name);
                setDescription(response.data.data[0].description);
            })
            .catch((error) => {
                console.error('Error fetching item for updating data:', error);
            });
    }, []);

    const handleUpdateTask = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5051/userHome/editTask/${id}`, { taskName: taskName, description: description })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/userHome")
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Update User Task page</h1>
                <Link to='/userHome'><button className='btn btn-outline-primary'>Back to UserHomePage</button></Link>
            </div>
            <div className='wd-25 container'>
                <form onSubmit={handleUpdateTask}>
                    <div className="mb-3">
                        <label className="form-label">Task Name</label>
                        <input type="text" className="form-control" onChange={(e) => setTaskName(e.target.value)} value={taskName} name='taskName' />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} name='description' />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Task</button>
                </form>
            </div>
        </div>
    )
}

export default EditTask
