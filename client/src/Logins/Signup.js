import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For HTTP requests
// import { Helmet } from 'react-helmet'; // For adding custom styles


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'student', // Default selection
  });
  
  

  const handleFormChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserTypeChange = (event) => {
    setFormData((prevData) => ({ ...prevData, type: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log(formData)
      const response = await axios.post('/api/user/signup', {
        ...formData,
      });

      if (response.status === 201) { // Assuming 201 (Created) for successful signup
        alert(`Registered successfully as ${formData.type}!`);
        navigate('/'); // Use appropriate redirect logic
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
          <label htmlFor="type">User Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleUserTypeChange}>
            <option value="student">Student</option>
            <option value="teacher">Admin</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
