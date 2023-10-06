import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerList() {

    const [manager, setManager] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5051/managerList`)
            .then(res => {
                setManager(res.data.data)
            })
    }, [])

    const handleManagerId = (e) => {
        // alert("df")
        const { id } = e.target
        // navigate(`/assignUsers/${id}`);
        // axios.get(`http://localhost:5051/assignUsers/${id}`)
        // .then(res => {
        //     setManager(res.data.data)
        // })
        console.log(id);
        axios.post('http://localhost:5051/managerList', { managerId: id })
            .then(res => {
                if (res.data.Status == "Success") {
                    console.log("her");
                    navigate('/assignUsers/'+id);
        //             axios.get(`http://localhost:5051/assignUsers/${id}`)
        // .then(res => {
        //     // setManager(res.data.data)
        // })
                }
                else {
                    alert(res.data.Error);
                    navigate('/managerList');
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='d-flex justify-content-around p-3'>
                <h1>Manager lists</h1>
                <Link to='/adminHome'><button className='btn btn-primary'>Back to AdminPage</button></Link>
            </div>
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

                                    <td><button id={item.id} name='3' onClick={handleManagerId}>Assign User</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
