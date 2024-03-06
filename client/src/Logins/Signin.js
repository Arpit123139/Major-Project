import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useAuth } from '../Auth/Auth';
import { Form, Button, Alert } from "react-bootstrap";
import BackgroundImage from '../assets/img/signin.png'
import "./login.css";

const Signin = () => {
  const history = useNavigate("");

  const [inpval, setINP] = useState({
    email: "",
    password: ""
  });

  const storeTokenInLS = useAuth();

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    });
  }
  // const handleUserTypeChange = (event) => {
  //   setINP((prevData) => ({ ...prevData, type: event.target.value }));
  // };

  const addinpdata = async (e) => {
    e.preventDefault();
    console.log(inpval)
    const { email, password } = inpval;
    try {
      const response = await axios.post('/api/v1/signin', {
        email,
        password,
      })
      if (response.status === 200) {
  // ------------ get the token from the local storage  
  //       const storeTokenInLs = useAuth();
  // // Function to retrieve token from localStorage
  // const getToken = () => {
  //   return localStorage.getItem('token');
  // }
  // const retrievedToken = getToken();

        storeTokenInLS(response.data.token);
        alert("Signin successful!");
        console.log("data added");
        history(`/homepage`);
      } else {
        console.error("-Error:", response.statusText);
        alert("Signin failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("---Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="sign-in__wrapper"
    style={{ backgroundImage: `url(${BackgroundImage})` }}>
      {/* <Helmet>
        <style>{'body { background: linear-gradient(#141e30, #243b55); }'}</style>
      </Helmet> */}
      <div class="login-box">
        <form className="shadow p-4 bg-white rounded">
        <div className="h4 mb-2 text-center">Sign In</div>
          <div className="mb-1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={inpval.email} onChange={setdata} name="email" required="" />
          </div>
          <div className="mb-1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={inpval.password} onChange={setdata} name="password" required="" />
          </div>
          <br />
          {/* <div className="input-group">
            <label htmlFor="type">User Type</label>
            <select id="type" name="type" value={inpval.type} onChange={handleUserTypeChange}>
              <option value="student">Student</option>
              <option value="teacher">Admin</option>
              
            </select>
          </div> */}
          <button className="w-100 mb-2" type="submit" onClick={addinpdata}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
