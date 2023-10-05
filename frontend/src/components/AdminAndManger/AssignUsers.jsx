import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function AssignUsers (){
    const [users, setUsers] = useState([]);

    useEffect (() =>{
        axios.get('http://localhost:5051/assignUsers')
        .then(res=>{
            // console.log(res);
            setUsers(res.data.data);
        })
    },[])

    return(
        <React.Fragment>
            <h1>Assign users</h1>
            <div>
                <table className="table wd-75">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th>Select</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    {users.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td><input type="checkbox"></input></td>
                                    <td><button>Submit</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </React.Fragment>
    )
}