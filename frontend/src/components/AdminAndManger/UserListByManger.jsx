import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import Item from 'antd/es/list/Item';

export default function UserListByManger() {

    const [userList, setUsers] = useState([]);
    const [managerId, setManagerId] = useState('')


    const [exits, setExits] = useState({});
    // const [buttonText, setButtonText] = useState('Unassigned');

    // const [assign, setAssign] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:5051/usersList')
            .then(res => {
                // console.log(res)
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
                console.log(res);
                // if (res.data.Status === "Success") {
                //     alert("User assigned successfully")

                //     // window.location.reload(true)
                // }
                // else {

                //     alert(res.data.Error)
                //     // let exitsId = {};
                //     // exitsId.userId = res.data.userId;

                //     // setExits(exitsId)

                // }
            })
            .catch(err => {
                alert("Can not assign the users")
            })
    }


    // const load = (userId) =>{
    //     const payload = {
    //         managerId: managerId,
    //         userId: userId
    //     }
    //     axios.post('http://localhost:5051/adminHome/managerList', payload)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 alert("User assigned successfully")
    //                 window.location.reload(true)
    //             }
    //             else {


    //                 let exitsId = {};
    //                 exitsId.userId = res.data.userId;

    //                 setExits(exitsId)
    //             }
    //         })
    //         .catch(err => {
    //             alert("Can not assign the users")
    //         })
    // }


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
                                {/* <th>id</th> */}
                            </tr>
                        </thead>
                        <tbody className="userList">
                            {userList.map((user, index) => {

                                return (
                                    <tr key={index}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.user_name}</td>
                                        <td>{user.email}</td>

                                        <td><input type='button' value="Assign" id={user.id} onClick={handleUserAssign}></input></td>

                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

