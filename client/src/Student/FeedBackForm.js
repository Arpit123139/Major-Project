import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from '@mui/material/Box';
import { FaStar } from 'react-icons/fa';

function FeedbackPage() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");

  const labels = {
    0: "Unrated",
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const submitFeedback = async () => {
    const token = localStorage.getItem('token');
    console.log(value)
    console.log(review)
    const response = await fetch(`/api/v1/submitFeedback/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: value,
        feedback: review,
      }),
    });

    const data = await response.json();

    if (response.status === 422 || !data) {
      console.log("Error submitting feedback");
    } else {
      console.log("Feedback submitted successfully:", data);
      // Optionally, you can handle success actions here
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Rate Your Experience</h1>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
            onChange={(e) => setValue(e.target.value)}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<FaStar style={{ opacity: 0.55, fontSize: "inherit" }} />}
          />
          {value !== null && (
            <Box sx={{ ml: 2, fontSize: "16px" }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </div>
      <div style={{ marginBottom: "20px", width: "300px" }}>
        <h1 style={{ fontSize: "18px", marginBottom: "10px" }}>Feedback</h1>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your feedback here..."
          style={{ width: "100%", minHeight: "100px", padding: "10px" }}
        />
      </div>
      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={submitFeedback}
      >
        Submit Feedback
      </button>
    </div>
  );
}

export default FeedbackPage;
