import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const EditImage = () => {

    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    console.log(token);
    
    
    console.log(url)
    const updateProfilePic = async(e)=>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("file", image)
        formdata.append("upload_preset", "testing")
        formdata.append("cloud_name", "dpywvy2za")
        const res1=await fetch('https://api.cloudinary.com/v1_1/dpywvy2za/image/upload',{
          method:"post",
          body:formdata
        })
        
        const ImgData=await res1.json()
        const url1=ImgData.url
        setUrl(url1);
        console.log(url1) 
        //const pus=url1.toString()
        console.log("asdasjbaskjbkjasbfakjs")
        const res2 = await fetch(`/api/v1/editImage/${token}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               url:url1
            })
        });
        console.log("asdjankajs: "+res2.status)

        const data2 = await res2.json();
        console.log("asdsd",data2.user,url1);

        if(res2.status === 404 || !data2){
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
                        <label for="exampleInputEmail1" class="form-label">pic</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>                   
                    </div>
                    <button type="submit" onClick={updateProfilePic} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
  )
}

export default EditImage