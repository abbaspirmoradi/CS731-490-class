import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterStudent from './components/RegisterStudent';
import StudentList from './components/StudentList';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
        <BrowserRouter>
        <div className="nav-bar">
        <Link to="/">Register Student</Link>
    <Link to="/students">Student List</Link>
    </div>

    <div className="content">
        <Routes>
        <Route path="/" element={<RegisterStudent />} />
    <Route path="/students" element={<StudentList />} />
    </Routes>
    </div>
    </BrowserRouter>
);
}

export default App;
