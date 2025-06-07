import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch students on mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('/api/students');
                setStudents(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Could not fetch students.');
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    if (loading) return <p>Loading students...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (students.length === 0) return <p>No students registered yet.</p>;

    return (
        <div>
            <h2>Student List</h2>
            <ul className="student-list">
                {students.map((student) => (
                    <li key={student._id} className="student-item">
            <span className="student-info">
              {student.name} &mdash; {student.email} &mdash; {student.enrollmentNumber}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;
