import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const validate = () => {
        let newErrors = { ...errors };
        let isVaild = true;

        if (formData.email.trim() === "" && formData.password.trim() === "") {
            newErrors.email = 'Email is required';
            newErrors.password = 'password is required';
            isVaild = false;
        }
        setErrors(newErrors);
        return isVaild;

        // if (formData.name.length < 7 && formData.name.trim() !== "") {
        //     newErrors.name = 'Username must be at least 5 characters long';
        //     isVaild = false;
        // }
        // if (formData.email.length < 10 && formData.email.trim() !== "") {
        //     newErrors.email = 'Email must be at least 8 characters long';
        //     isVaild = false;
        // }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        delete errors[name]
    };

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('http://localhost:4000/userLogin', formData)
                .then(res => {
                    console.log(res)
                    if (res.data.Status === "Success") {
                        localStorage.setItem('user_id', res.data.user_id)
                        localStorage.setItem('user_name', res.data.user_name)
                        localStorage.setItem('user_token', res.data.token)
                        navigate("/userHome")
                    } else {
                        alert(res.data.Error);
                    }
                })
                .catch(err => console.log(err));
        }
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
                        <input type="email" className="form-control  w-75" onChange={handleChange} value={formData.email} id="exampleInputEmail1" placeholder="Enter email" name='email' />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className='form-control  w-75' onChange={handleChange} value={formData.password} id="exampleInputPassword1" placeholder="password" name='password' />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <button type='submit' className="btn btn-primary">Login</button>
                    <div>
                        <p className='p-3'>Already have an account  <Link to='/userRegister' className='btn btn-light border-secondary'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
