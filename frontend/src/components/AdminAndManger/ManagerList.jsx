import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ManagerList() {
    const [managerList, setManagers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/managerList')
            .then(res => {
                setManagers(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Manager lists</h1>
                <Link to='/adminHome'><button className='btn btn-outline-primary'>Back to AdminPage</button></Link>
            </div>
            <div className='managerListContainer'>
                <table className="table container-sm border border-5">
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
                                    {/* <th scope="row">{item.id}</th> */}
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td><Link to={`/adminHome/managerList/userList/${item.id}`}><button className='btn btn-outline-success btn-sm' id={item.id}>Assign User</button></Link></td>
                                </tr>
                            </tbody>)
                    })}
                </table>
            </div>
        </div>
    )
}
