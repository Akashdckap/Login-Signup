
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ManagerList() {
    const [manager, setManager] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {

                setManager(res.data.data)
                console.log(res.data.data)
            })
    }, [])


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
                                    <button> <td style={{ cursor: 'pointer' }}>Assign</td></button>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
