import React, { useEffect, useState } from 'react';
import '../App.css';
import { getAllFormData } from '../db';
import { useNavigate } from 'react-router-dom';

function StudentData() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllFormData();
      setStudents(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Stored Student Data</h1>
      <button onClick={() => navigate('/')} className="submit-button">Back to Form</button>

      {students.length === 0 ? (
        <p>No student data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Father Name</th>
              <th>Father Phone</th>
              <th>Mother Name</th>
           
            </tr>
          </thead>
          <tbody>
            {students.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.fullname}</td>
                <td>{entry.gender}</td>
                <td>{entry.phone}</td>
                <td className="wrap-text">{entry.email}</td>
                <td>{entry.address}</td>
                <td>{entry.fathername}</td>
                <td>{entry.fatherphone}</td>
                <td>{entry.mothername}</td>
            
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentData;
