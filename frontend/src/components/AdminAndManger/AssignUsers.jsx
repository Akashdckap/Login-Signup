import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";

export default function AssignUsers(props) {
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    // const [clicked, setClickedUser] = useState([]);

    const [assignto, setAssign] = useState({});
    useEffect(() => {
        axios.get('http://localhost:5051/assignUsers')
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])



    const handleSubmit = (e) => {
        const { id } = e.target;
        console.log(id);
        axios.post('http://localhost:5051/assignUsers', { assignto: id })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    console.log(assignto);

    return (
        <React.Fragment>
            <div className='d-flex justify-content-around p-3'>
                <h1>Assign users</h1>
                <Link to='/managerList'><button className='btn btn-primary'>Back to ManagerList</button></Link>
            </div>
            <div>
                <table className="table wd-75">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th>Assign to</th>
                        </tr>
                    </thead>
                    {users.map((user, index) => {
                        return (
                            
                            <tbody key={index} className="userList">
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td name='name'>{user.name}</td>
                                    <td>{user.email}</td>
                                    {/* <td><input type="bu" name={user.name} id="" value={user.id} onChange={handleList} /></td> */}
                                    <td><button id={user.id}  name={user.name} onClick={handleSubmit}>Assign</button></td>
                                </tr>
                            </tbody>
                            
                           
                        )
                    })}
                </table>
                <h1>{props.id} </h1>
                {
                    console.log(id,"ll")
                }
            </div>
        </React.Fragment>
    )
}