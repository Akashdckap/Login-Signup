import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function ManagerHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem('token')
    axios.get("http://localhost:5051/managerHome", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        console.log(res.data.data)
        if (res.data.Status === "Success") {
          setName(res.data.name)
          setUsers(res.data.data)
          navigate('/managerHome')
        }
        else {
          alert(res.data.Error)
          navigate('/adminOrManagerLogin')
        }
      })

  }, [])

  const handleViewTask = (e) =>{
    const { id } = e.target
    // console.log(id)
    axios.post('http://localhost:5051/managerHome',{ taskId : id })
    .then(res=>{
      if(res.data.Status == "Success" ){
        // alert("Hi");;
        navigate('/users/taskList')
      }
      else{
        console.log("Hello");
      }
    })
    .catch(err=>console.log(err))
  }

  const handleDeleteAccount = () => {
    localStorage.removeItem('token')
    navigate('/adminOrManagerLogin')
  }

  return (
    <React.Fragment>
      <div>
        <center><h1 style={{ color: 'ThreeDDarkShadow' }}>Manager Home page</h1></center>
        <div className='d-flex justify-content-around'>
          <h3>Welcome to our site <span style={{ color: 'blue' }}>{name}</span></h3>
          <button className='btn btn-outline-danger' onClick={handleDeleteAccount}>Logout</button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          {users.map((item,index)=>{
            return(
              <tbody key={index}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td><button  onClick={handleViewTask} id={item.id}>View Task</button></td>
                </tr>
              </tbody>
            )
          })}
          <tbody>
            <tr>
              <td>{users.name}</td>
              <td>{users.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>

  )
}
