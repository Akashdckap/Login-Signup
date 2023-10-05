import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ManagerList() {
    const [manager, setManager] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5051/managerList')
            .then(res => {
                setManager(res.data.data)
                console.log(res.data.data)
            })
    }, [])

    return (
        <React.Fragment>
            <div>
                <h1>ManagerList</h1>
            </div>
            <div>
                {
                    manager.map((item,index)=>
                    <div key={index} className='taskContainer'>
                        <p><span className='text-white'>Manager's Name : </span>{item.name}</p>
                    </div>)
                }
            </div>

        </React.Fragment>
    )
}
