import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function ManagerList() {
    const [managerList, setManagerList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                console.log(res);
                // if (res.data.Status === "Success") {
                //     setManagerList(res.data.data)
                //     navigate('/managerList');
                // }
                // else {
                //     alert(res.data.Error)
                //     navigate('/adminHome');
                // }
            }).catch(err => console.log(err))
    }, [])
    console.log(managerList);
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
                    {managerList.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td style={{ cursor: 'pointer' }}>Assign</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
