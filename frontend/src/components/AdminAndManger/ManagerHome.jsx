import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function ManagerHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate();
  const [managerId, setId] = useState('')
  const [userList, setUsers] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    let token = localStorage.getItem('manager_token')

    axios.get("http://localhost:4000/managerHome", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        console.log(res.data.data[0].name)
        if (res.data.Status === "Success") {
          setName(res.data.data[0].name)
          setId(res.data.id)
          setUsers(res.data.data)
          navigate('/managerHome')
        }
        else {
          alert(res.data.Error)
          navigate('/adminOrManagerLogin')
        }
      })

  }, [])

  const handleDeleteAccount = () => {
    localStorage.removeItem('manager_id')
    localStorage.removeItem('manager_name')
    localStorage.removeItem('manager_token')
    navigate('/adminOrManagerLogin')
  }

  return (
    <React.Fragment>
      <div>
        <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Manager Home page</h1></center>
      </div>
      <div className='d-flex justify-content-around p-3'>
        <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
        <button className='btn btn-outline-danger' onClick={handleDeleteAccount}>Logout</button>
      </div>
      <div>
        <table className="table container-sm border border-5">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">View Tasks</th>
            </tr>
          </thead>
          {
            userList.length > 0 ? userList.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.user_name}</td>
                    <td>{item.email}</td>
                    <td><Link to={`/managerHome/viewTasks/${item.id}`}><button className='btn btn-outline-success btn-sm' id={item.id} data-set={managerId}>View Task</button></Link></td>                  </tr>
                </tbody>
              )
            }) : <h1 className='text-danger'>You don't have any users</h1>
          }
        </table>
      </div>
    </React.Fragment>
  )
}
