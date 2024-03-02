
import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

const PrintRoomComplaints = () => {



    const [roomissues, setRoomIssues] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`/api/v1/getcomplain`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);
        if (res.status === 404) {
            console.error("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setRoomIssues(data.result)
            console.log(roomissues)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])





    return (
        <>
            <div>
                {/* Display other components related to student profile */}
                <div>
                    <h2>Room Complaints Data</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>issues</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomissues.map((issuesEntry, index) => (
                                <tr key={index}>
                                    <td>{issuesEntry.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PrintRoomComplaints