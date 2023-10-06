import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerList() {

    const [manager, setManager] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                setManager(res.data.data)
            })
    }, [])

    const handleManagerId = (e) => {
        const { id } = e.target
        axios.post(`http://localhost:5051/assignUsers`, { managerId : id })
        .then(res=>{
            // console.log(res)
            navigate('/assignUsers')
            
        })
    }

    return (
        <div>
            <h1>ManagerList</h1>
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
        </div>

    )
}
