
import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import feedback from '../assets/img/feedback.jpg'
import Feedback2 from '../assets/img/Feedback2.png'
import Feedback1 from '../assets/img/Feedback1.png'
import Feedback3 from '../assets/img/Feedback3.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const PrintFeedBackData = () => {

    const images = [Feedback1,Feedback2, Feedback3];

    const [feedback, setfeedback] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const containerStyle = {
        display: 'flex',
        height: '100vh',
      };
    
      const halfStyle = {
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        border: 'none', // Set border to none to make it invisible
      };
    
      const leftHalfStyle = {
        ...halfStyle,
        backgroundColor: '#f2f2f2', // Optional: Add background color for the left half
      };
    
      const rightHalfStyle = {
        ...halfStyle,
        width: '50%', // Adjust the width to your preference
        backgroundImage: `url(${feedback})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
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
            <div style={containerStyle}>
                <div style={leftHalfStyle}>
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
                <div style={rightHalfStyle}>
        {/* Content for the right half goes here */}
        <div >
          <div className="w-3/4 z-0">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={3000}
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              className="z-0"
            >
              {images.map((item, index) => (
                <div key={index}>
                  <img
                    src={item}
                    alt={`Room ${index + 1}`}
                    className=""
                    style={{ width: '75%', height: 'auto' }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
            </div>
        </>
    )
}

export default PrintFeedBackData