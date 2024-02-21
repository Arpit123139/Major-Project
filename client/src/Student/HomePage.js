
import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

const HomePage = () => {



    const [getuserdata, setStudentDetail] = useState({});
    console.log("dsdsds ", getuserdata);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`/api/v1/studentProfile/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
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
            setStudentDetail(data.user)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])





    return (
        <>
            <div className="container mt-3">
                        <div className="row">
                            <div className="left_view col-lg-6 col-md-6 col-12">



                                <table class="table table-bordered table-hover" >
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={getuserdata.url} style={{ width: 250, height: 175 }} alt="profile" />
                                            </td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={`/editStudentProfile`}> <button className="btn btn-primary" >edit</button></NavLink>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={`/editImage`}> <button className="btn btn-primary" >change image</button></NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3 className="mt-3">Name: <span >{getuserdata.name}</span></h3>
                                            </td>
                                            <td>
                                                <h3 className="mt-3"> email: <span >{getuserdata.email}</span></h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
            </div>
        </>
    )
}

export default HomePage