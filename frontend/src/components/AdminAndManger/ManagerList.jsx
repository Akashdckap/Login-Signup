import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerList() {
    const [managerList, setManagers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                setManagers(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    // const handleManagerId = (e) => {
    //     let { id } = e.target
    //     navigate(`/adminHome/managerList/userList/${id}`)
    //     // console.log(e.target);
    // }
    // const [managerList, setManagers] = useState([]);
    // const [userList, setUsers] = useState([]);
    // const [managerId, setManagerId] = useState('')
    // const [buttonText, setButtonText] = useState('Unassigned');

    // useEffect(() => {
    //     axios.get('http://localhost:5051/managerList')
    //         .then(res => {
    //             setManagers(res.data.data)
    //         })
    //         .catch(err => console.log(err))
    //     axios.get('http://localhost:5051/usersList')
    //         .then(res => {
    //             setUsers(res.data.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    // const handleManagerId = (e) => {
    //     let userListContainer = document.querySelector(".userListContainer")
    //     userListContainer.style.display = "block";
    //     const { id } = e.target
    //     setManagerId(id)
    // }

    // const handleUserAssign = (e) => {
    //     const userId = e.target.id
    //     const formData = {
    //         managerId: managerId,
    //         userId: userId
    //     }
    //     axios.post('http://localhost:5051/adminHome/managerList', formData)
    //         .then(res => {

    //             if (res.data.Status === "Success" && res.data.bothId) {
    //                 setButtonText("Assigned")
    //                 alert("User Assigned successfully")
    //             }
    //             else {
    //                 setButtonText("UnAssigned")
    //                 alert(res.data.Error)
    //             }
    //         })
    //         .catch(err => {
    //             alert("Not Assigned facing errors")
    //         })
    // }

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Manager lists</h1>
                <Link to='/adminHome'><button className='btn btn-outline-primary'>Back to AdminPage</button></Link>
            </div>
            <div className='managerListContainer'>
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
                                    <td><Link to={`/adminHome/managerList/userList/${item.id}`}><button className='btn btn-outline-success btn-sm' id={item.id}>Assign User</button></Link></td>
                                </tr>
                            </tbody>)
                    })}
                </table>
            </div>

            {/* 
            <div className='userListContainer' style={{ display: "none" }}>
                <h2>User list</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">User Name</th>
                            <th scope="col">User Email</th>
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
                                    <td><input type='button' className='assign btn btn-outline-success btn-sm' id={user.id} name={user.name} onClick={handleUserAssign} value={buttonText}></input></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div> */}
        </div>

    )
}
