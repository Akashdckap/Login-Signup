import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status == "Success") {
                    navigate('/');
                } else {
                    alert(res.data.Error);
                }
            })
            .then(err => console.log(err));
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <h3>Login up</h3>
                </div>

                <form className='container-fluid m-10' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" onChange={e => setValues({ ...values, email: e.target.value })} placeholder="Enter email" name='email' />
                        {/* {emailError ? <label className='text-danger p-2 '>email is required</label> : ""} */}

                    </div>
                    <div className="form-group">
                        <input type="password" className='form-control' id="exampleInputPassword1" onChange={e => setValues({ ...values, password: e.target.value })} placeholder="password" name='password' />
                        {/* {passwordError ? <label className='text-danger p-2 '>password is required</label> : ""} */}
                    </div>
                    <button type='submit'>Register</button>
                    <div>
                        <p>Don't have account <Link to='/register'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
