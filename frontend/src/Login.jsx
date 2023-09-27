import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    // const [emailerrors, setEmailErrors] = useState(true)
    // const [passworderrors, setPasswordErrors] = useState(true)
    
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status == "Success") {
                    navigate('/home');
                } else {
                    alert(res.data.Error);
                    // setEmailErrors(res.data.EmailError)
                    // setPasswordErrors(res.data.passwordError)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className='container w-50 p-20'>
                <div>
                    <h1>Login page</h1>
                </div>

                <form className='container-fluid m-10' onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control  w-75" onChange={e => setValues({ ...values, email: e.target.value })} id="exampleInputEmail1" placeholder="Enter email" name='email' />
                        {/* {emailError ? <label className='text-danger p-2 '>email is required</label> : ""} */}
                        {/* <p>{emailerrors}</p> */}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className='form-control  w-75' onChange={e => setValues({ ...values, password: e.target.value })} id="exampleInputPassword1" placeholder="password" name='password' />
                        {/* <p>{passworderrors}</p> */}
                        {/* {passwordError ? <label className='text-danger p-2 '>password is required</label> : ""} */}
                    </div>
                    <button type='submit' className="btn btn-primary">Login</button>
                    <div>
                        <p className='p-3'>Already have an account  <Link to='/register' className='btn btn-light border-secondary'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
