import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UsersList() {


    const [userList, setUserList] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:5051/usersList')
            .then(res => {
                if (res.data.Status === "Success") {
                    setUserList(res.data.data)
                    navigate('/usersList');
                }
                else {
                    alert(res.data.Error)
                    navigate('/adminHome');
                }
            }).catch(err => console.log(err))
    }, [])


    return (
        <div>
            <h1>UsersList</h1>
            <div>
                <table className="table wd-75">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {userList.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td style={{cursor:'pointer'}}>Assign</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
