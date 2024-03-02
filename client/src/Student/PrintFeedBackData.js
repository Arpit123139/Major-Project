
import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

const PrintFeedBackData = () => {



    const [feedback, setfeedback] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`/api/v1/getfeedback`, {
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
            setfeedback(data.result)
            console.log(feedback)
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
                    <h2>Feedback Data</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Rating</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((feedbackEntry, index) => (
                                <tr key={index}>
                                    <td>{feedbackEntry.rating}</td>
                                    <td>{feedbackEntry.review}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PrintFeedBackData