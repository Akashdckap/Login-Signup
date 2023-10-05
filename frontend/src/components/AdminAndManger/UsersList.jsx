import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UsersList() {

    const [userList, setUserList] = useState([])
    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     axios.get('http://localhost:5051/userList', { headers: { Authorization: `Bearer ${token}` } })
    // })

    return (
        <div>
            <h1>UsersList</h1>
        </div>
    )
}
