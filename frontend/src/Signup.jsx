import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validation rules (You can customize these rules)
        let newErrors = { ...errors };
        switch (name) {
            case 'name':
                newErrors.name = value.length < 7 ? 'Username must be at least 5 characters long' : '';
                break;
            case 'email':
                newErrors.email = value.length < 10 ? 'Email must be at least 8 characters long' : '';
                break;
            case 'password':
                newErrors.password = value.length < 8 ? 'Password must be at least 8 characters long' : '';
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.name && !errors.email && !errors.password) {
            alert('Form is valid. Submitting...');
        } else {
            alert('Form is not valid. Please correct errors.');
        }

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
    }
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
                        <input type="text" className="form-control w-75" onChange={handleChange} value={formData.name} id="exampleInputEmail1" placeholder="Enter username" name='name' />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control  w-75" onChange={handleChange} value={formData.email} id="exampleInputEmail1" placeholder="Enter email" name='email' />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className='form-control  w-75' onChange={handleChange} value={formData.password} id="exampleInputPassword1" placeholder="password" name='password' />
                        {errors.password && <span className="error">{errors.password}</span>}
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

export default Signup
