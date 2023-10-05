import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UsersList() {

    const [userList, setUserList] = useState([])
    // useEffect(()=>{
    //     axios.get('http://localhost:5051/managerList')
    // })

    return (
        <div>
            <h1>UsersList</h1>
        </div>
    )
}
