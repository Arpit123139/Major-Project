import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ApplyHostel = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hostelName: '',
        block: '',
        roomNo: ''
    });

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    console.log(token);


    const handlehostelNameChange = (event) => {
        const selectedHostel = event.target.value;
        const blockOptions = selectedHostel === 'fresher' ? ['A', 'B', 'C'] : ['X', 'Y', 'Z'];
        setFormData((prevData) => ({ ...prevData, hostelName: selectedHostel, block: '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(formData)
            const status = "Pending"
            const { hostelName, block, roomNo } = formData;
            const response = await fetch(`/api/v1/applyHostel`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    hostelName, block, status, roomNo
                })
            });
            console.log(response);
            if (response.status === 200) { // Assuming 201 (Created) for successful signup
                alert(`Registered successfully!`);
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
            <h2>Apply for hostel</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="hostelName">Hostel Name</label>
                    <select
                        id="hostelName"
                        name="hostelName"
                        value={formData.hostelName}
                        onChange={handlehostelNameChange}
                    >
                        <option>select the option below</option>
                        <option value="fresher">Fresher Block</option>
                        <option value="aryabhata">Aryabhata Hostel</option>
                    </select>
                </div>
                {formData.hostelName && (
                    <div className="input-group">
                        <label htmlFor="block">Block</label>
                        <select
                            id="block"
                            name="block"
                            value={formData.block}
                            onChange={(event) => setFormData((prevData) => ({ ...prevData, block: event.target.value }))}
                        >
                            <option >select the Block</option>
                            {formData.hostelName === 'fresher' &&
                                ['A', 'B', 'C'].map((block) => (
                                    <option key={block} value={block}>
                                        Block {block}
                                    </option>
                                ))}
                            {formData.hostelName === 'aryabhata' &&
                                ['X', 'Y', 'Z'].map((block) => (
                                    <option key={block} value={block}>
                                        Block {block}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                <div className="input-group">
                    <label htmlFor="roomNo">Room Number</label>
                    <input
                        id="roomNo"
                        name="roomNo"
                        type="text"
                        value={formData.roomNo}
                        onChange={(event) => setFormData((prevData) => ({ ...prevData, roomNo: event.target.value }))}
                    />
                </div>
                <button type="submit" className="btn-submit">
                    Apply
                </button>
            </form>
        </div>
    );
};

export default ApplyHostel;
