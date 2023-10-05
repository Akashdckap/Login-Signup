
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

                console.log(res);
                // if (res.data.Status === "Success") {
                //     setManagerList(res.data.data)
                //     navigate('/managerList');
                // }
                // else {
                //     alert(res.data.Error)
                //     navigate('/adminHome');
                // }
            }).catch(err => console.log(err))
    }, [])
    console.log(managerList);
    return (
        <div>
            <h1>ManagerList</h1>
            <div>
                <table className="table wd-75">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {managerList.map((item, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td style={{ cursor: 'pointer' }}>Assign</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}
