import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [fetchData, setFetchDatas] = useState([])

    // let alertMsg = document.querySelector(".alertMessage")
    // function alertMessage(text, color) {
    //     alertMsg.innertext = text
    //     alertMsg.style.color = color
    //     window.setTimeout(() => {
    //         alertMsg.innertext = ''
    //         alertMsg.color = ''
    //     }, 1000)
    // }
    useEffect(() => {
        fetch("http://localhost:8081/register")
            .then(res => res.json())
            .then(data => setFetchDatas(data))
            .catch(err => err.json());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // let inputs = document.querySelectorAll('.form-control')
        // inputs.forEach(ele => {
        //     if (ele.value == "") {
        //         alert("Please enter the values")
        //         console.log("Please enter the values");
        //         navigate('/register');
        //     }
        //     else {
        axios.post('http://localhost:8081/register', values)
            .then(res => {
                if (res.data.Status == "Success") {
                    navigate('/login');
                    console.log(res.data.Status);
                } else {
                    alert("Error");
                }
            })
            .catch(err => err.json());
        //     }
        // })
    }
    fetchData.forEach(ele => {
        console.log(ele);
    })


    return (
        <div>
            <p className='alertMessage'></p>
            <div className='container w-50 p-20'>
                <div>
                    <h1 className='signUp'>Sign up</h1>
                </div>

                <form className='container-fluid m-10' onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control w-75" onChange={e => setValues({ ...values, name: e.target.value })} id="exampleInputEmail1" placeholder="Enter username" name='name' />
                        {/* {firstnameError ? <label className='text-danger p-2 '>FirstName is required</label> : ""} */}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control  w-75" onChange={e => setValues({ ...values, email: e.target.value })} id="exampleInputEmail1" placeholder="Enter email" name='email' />
                        {/* {emailError ? <label className='text-danger p-2 '>email is required</label> : ""} */}

                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className='form-control  w-75' onChange={e => setValues({ ...values, password: e.target.value })} id="exampleInputPassword1" placeholder="password" name='password' />
                        {/* {passwordError ? <label className='text-danger p-2 '>password is required</label> : ""} */}
                    </div>
                    <button type='submit' className="btn btn-primary">Register</button>
                    <div>
                        <p className='p-3'>Already have an account  <Link to='/login' className='btn btn-light border-secondary'>Login</Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register
