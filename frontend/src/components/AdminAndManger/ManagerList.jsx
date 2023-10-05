
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ManagerList() {
    const [manager, setManager] = useState([]);
    // const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {

                setManager(res.data.data)
                // console.log(res.data.data)
            })
    }, [])

    // const handleViews = () =>{
    //     axios.get('http://localhost:5051/usersList')
    //     .then(res => {
    //         console.log(res)
    //         // setUsers(res.data.data)
    //     })
    // }

    return (
        <div>
            <h1>ManagerList</h1>
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
                    {manager.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td><Link to='/assignUsers'>Assign User</Link ></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
