import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For HTTP requests
// import { Helmet } from 'react-helmet'; // For adding custom styles
import { useAuth } from '../Auth/Auth';


const Signup = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegeid:'',
    phone:''
  });

  const storeTokenInLS = useAuth();

  const handleFormChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleUserTypeChange = (event) => {
  //   setFormData((prevData) => ({ ...prevData, type: event.target.value }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    try {
      console.log(formData)
      const { name, email, password,collegeid,phone } = formData;
      const response = await axios.post('/api/v1/signup', {
        name, email, password, url1,collegeid,phone
      });
      console.log(response);
      if (response.status === 200) { // Assuming 201 (Created) for successful signup
        alert(`Registered successfully as ${formData.type}!`);
        storeTokenInLS(response.data.token);
        navigate('/homepage'); // Use appropriate redirect logic
      } else {
        // Handle other status codes appropriately
        // Consider using more granular error handling
        console.error('Error:', response.status, response.data);
        alert('Error registering. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      {/* <Helmet>
        <style>{`
          body { background: linear-gradient(#141e30, #243b55); }
        `}</style>
      </Helmet> */}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="collegeid">collegeid</label>
          <input
            type="text"
            id="collegeid"
            name="collegeid"
            value={formData.collegeid}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="url" >pic</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        </div>
        <button type="submit" className="btn-submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
