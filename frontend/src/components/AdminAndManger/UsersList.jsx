import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function UsersList() {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:5051/adminHome/usersList')
            .then(res => {
                if (res.data.Status === "Success") {
                    setUserList(res.data.data)
                    navigate('/adminHome/usersList');
                }
                else {
                    alert(res.data.Error)
                    navigate('/adminHome');
                }
            }).catch(err => console.log(err))
    }, [])

    const handleViewTask = (e) => {
        const { id } = e.target
        navigate(`/adminHome/usersList/viewTasks/${id}`)
    }




    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>User lists</h1>
                <Link to='/adminHome'><button className='btn btn-outline-primary'>Back to AdminPage</button></Link>
            </div>
            <div>
                <table className="table container-sm border border-5">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>

                            <th scope="col">View Tasks</th>
                        </tr>
                    </thead>
                    {
                        userList.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td><button className='btn btn-outline-success btn-sm' onClick={handleViewTask} id={item.id}>View Task</button></td>

                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}
