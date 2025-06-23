import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage';
import StudentData from './components/StudentData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/student-data" element={<StudentData />} />
      </Routes>
    </Router>
  );
}

export default App;

