import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

export default function UserListByManger() {

    const [userList, setUsers] = useState([]);
    const [managerId, setManagerId] = useState('')
    // const [buttonText, setButtonText] = useState('Unassigned');

    // const [assign, setAssign] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:5051/usersList')
            .then(res => {
                setManagerId(id)
                setUsers(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])


    const handleUserAssign = (e) => {
        const payload = {
            managerId: managerId,
            userId: e.target.id
        }
        axios.post('http://localhost:5051/adminHome/managerList', payload)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("User assigned successfully")
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => {
                alert("Can not assign the users")
            })
    }
    // console.log(assign.buttonText ? );
    return (
        <React.Fragment>
            <div>
                <div className='d-flex justify-content-around p-3'>
                    <h2>User lists Page</h2>
                    <Link to='/adminHome/managerList'><button className='btn btn-outline-success'>Back to ManangerList</button></Link>
                </div>
                <div className='userListContainer'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">User Name</th>
                                <th scope="col">User Email</th>
                                <th>Assign to</th>
                            </tr>
                        </thead>
                        <tbody className="userList">
                            {userList.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td><input type='button' className='assign btn btn-outline-success btn-sm' id={user.id} name={user.name} value="assigned" onClick={handleUserAssign}></input></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

