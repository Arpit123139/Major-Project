import React, {  useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const EditStudentProfile = () => {

    // const [getdiseasedata, setDiseasedata] = useState([]);
    // console.log(getdiseasedata);



    const navigate = useNavigate();
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        collegeid:"",
        phone:"",
        semester:""
    })
    
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    console.log(token);


    const getdata = async () => {

        const res = await fetch(`/api/v1/studentProfile/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data.user)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateProfile = async(e)=>{
        e.preventDefault();
        
        const {name,email,collegeid,phone,semester} = inpval;
        
        const res2 = await fetch(`/api/v1/editStudentProfile/${token}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,collegeid,phone,semester
            })
        });

        const data2 = await res2.json();
        console.log("asdsd",data2.user);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            alert("data updated");
            navigate('/homepage');
        }
    }


  return (
    <div className="container">
        <h1>edit profile</h1>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" token="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">collegeid</label>
                        <input type="text" value={inpval.collegeid} onChange={setdata} name="collegeid" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Phone</label>
                        <input type="text" value={inpval.phone} onChange={setdata} name="phone" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">semester</label>
                        <input type="text" value={inpval.semester} onChange={setdata} name="semester" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" onClick={updateProfile} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
  )
}

export default EditStudentProfile