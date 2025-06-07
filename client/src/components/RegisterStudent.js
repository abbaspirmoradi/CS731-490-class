import React, { useState } from 'react';
import axios from 'axios';

function RegisterStudent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        enrollmentNumber: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // clear previous message
        try {
            const res = await axios.post('/api/students', formData);
            setMessage(`Student ${res.data.name} registered successfully!`);
            setFormData({ name: '', email: '', enrollmentNumber: '' });
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2>Register Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="enrollmentNumber"
                    placeholder="Enrollment Number"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p style={{ marginTop: '15px', color: '#007bff' }}>{message}</p>}
        </div>
    );
}

export default RegisterStudent;
