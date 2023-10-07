import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerList() {
    const [managerList, setManagers] = useState([]);
    const [userList, setUsers] = useState([]);
    const [managerId, setManagerId] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                setManagers(res.data.data)
            })
            .catch(err => console.log(err))
        axios.get('http://localhost:5051/usersList')
            .then(res => {
                setUsers(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleManagerId = (e) => {
        let userListContainer = document.querySelector(".userListContainer")
        userListContainer.style.display = "block";
        const { id } = e.target
        setManagerId(id)
    }

    const handleUserAssign = (e) => {
        const userId = e.target.id
        const formData = {
            managerId: managerId,
            userId: userId
        }
        let assign = document.querySelector(".assign")
        assign.innnerText = "Assigned"
        axios.post('http://localhost:5051/managerList', formData)
            .then(res => {
                alert("Assigned Successfully")
            })
            .catch(err => {
                alert("Not Assigned facing errors")
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Manager lists</h1>
                <Link to='/adminHome'><button className='btn btn-outline-primary'>Back to AdminPage</button></Link>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Manager Name</th>
                            <th scope="col">Manager Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {managerList.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td><button className='btn btn-outline-success btn-sm' id={item.id} onClick={handleManagerId}>Assign User</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>


            <div className='userListContainer' style={{ display: "none" }}>
                <h2>User list</h2>
                <table className="table table-responsive table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th>Assign to</th>
                        </tr>
                    </thead>
                    {userList.map((user, index) => {
                        return (
                            <tbody key={index} className="userList">
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><button className=' assign btn btn-outline-success btn-sm' id={user.id} name={user.name} onClick={handleUserAssign}>Assign</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
