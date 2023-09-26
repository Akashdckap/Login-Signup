import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/register', values)
            .then(res => {
                if (res.data.Status == "Success") {
                    navigate('/login');
                } else {
                    alert("Error");
                }
            })
            .then(err => console.log(err));
    }
    return (
        <div>
            <div className='container'>
                <div>
                    <h1>Sign up</h1>
                </div>

                <form className='container-fluid m-10' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={e => setValues({ ...values, name: e.target.value })} id="exampleInputEmail1" placeholder="Enter username" name='name' />
                        {/* {firstnameError ? <label className='text-danger p-2 '>FirstName is required</label> : ""} */}
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" onChange={e => setValues({ ...values, email: e.target.value })} id="exampleInputEmail1" placeholder="Enter email" name='email' />
                        {/* {emailError ? <label className='text-danger p-2 '>email is required</label> : ""} */}

                    </div>
                    <div className="form-group">
                        <input type="password" className='form-control' onChange={e => setValues({ ...values, password: e.target.value })} id="exampleInputPassword1" placeholder="password" name='password' />
                        {/* {passwordError ? <label className='text-danger p-2 '>password is required</label> : ""} */}
                    </div>
                    <button type='submit'>Register</button>
                    <div>
                        <p>Already have an account <Link to='/login'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
