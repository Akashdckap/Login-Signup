import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerList() {
    const [manager, setManager] = useState([]);
    const [userList, setUsers] = useState([]);
    const [managerId, setManagerId] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                setManager(res.data.data)
            })
        axios.get('http://localhost:5051/assignUsers')
            .then(res => {
                setUsers(res.data.data)
            })
    }, [])

    const handleManagerId = (e) => {
        let userListContainer = document.querySelector(".userListContainer")
        userListContainer.style.display = "block";

        const { id } = e.target
        setManagerId(id)
    }

    const handleClickAssign = (e) => {
        const userId = e.target.id

        const formData = {
            managerId: managerId,
            userId: userId
        }

        axios.post('http://localhost:5051/managerList', formData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Manager lists</h1>
                <Link to='/adminHome'><button className='btn btn-primary'>Back to AdminPage</button></Link>
            </div>
            <div>
                <table className="table wd-75">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {manager.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>

                                    <td><button id={item.id} onClick={handleManagerId}>Assign User</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>


            <div className='userListContainer' style={{ display: "none" }}>
                <h2>User list</h2>
                <table className="table wd-75">
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
                                    {/* <td><input type="bu" name={user.name} id="" value={user.id} onChange={handleList} /></td> */}
                                    <td><button id={user.id} name={user.name} onClick={handleClickAssign}>Assign</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
