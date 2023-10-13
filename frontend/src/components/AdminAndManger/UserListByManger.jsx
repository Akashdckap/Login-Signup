import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

export default function UserListByManger() {
    const [userList, setUsers] = useState([]);
    const [setId, setBothId] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5051/usersList/${id}`)
            .then(res => {


                
                setUsers(res.data.data)
                setBothId(res.data.right)

            })
            .catch(err => console.log(err))
    }, []);

    // console.log("setId", setId);
    // console.log("managerIdm----", id);

    // let users = setId.filter(ele => ele);
    // console.log(users);

    //id.user_id == 1 ? "already assigned" : "newly assign"


    // useEffect(() => {
    const handleUserAssign = (e) => {
        const payload = {
            managerId: id,
            userId: e.target.id
        }
        axios.post('http://localhost:5051/adminHome/managerList', payload)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("User assigned successfully")
                    window.location.reload(true)
                }
                else {
                    alert(res.data.Error)

                }

            })
            .catch(err => {
                alert("Can not assign the users")
            })
    }
    // handleUserAssign()
    // }, [])

    let idx = [];
    setId.filter(id => idx.push(id.user_id));
    return (
        <React.Fragment>
            <div>
                <div className='d-flex justify-content-around p-3'>
                    <h2>User lists Page</h2>
                    <Link to='/adminHome/managerList'><button className='btn btn-outline-success'>Back to ManangerList</button></Link>
                </div>
                <div className='userListContainer'>
                    <table className="table container-sm border border-5">
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
                                        <td>{user.user_name}</td>
                                        <td>{user.email}</td>
                                        <td><input type='button' className={idx.filter(id => id == user.id) == user.id ? "btn btn-outline-danger btn-sm" : "btn btn-outline-success btn-sm"} value={idx.filter(id => id == user.id) == user.id ? "Unassign" : "Assign"} id={user.id} onClick={handleUserAssign}></input></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

