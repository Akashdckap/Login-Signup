import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ManagerList() {

    const [managerList, setManager] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                setManager(res.data.data)
            })
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>ManagerList</h1>
                <Link to='/adminHome'><button className='btn btn-primary'>Back to AdminPage</button></Link>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
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
                                    <td><button className='btn btn-info'>Assign to</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
