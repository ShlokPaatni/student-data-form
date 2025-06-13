import React, { useState } from 'react';
import './App.css';
import { addFormData } from './db'; 
import { getAllFormData } from './db';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function App() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    fathername: '',
    fatherphone: '',
    mothername: '',
    motherphone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numeric input for phone numbers
    const isPhoneField = ['phone', 'fatherphone', 'motherphone'].includes(name);
    const filteredValue = isPhoneField ? value.replace(/\D/g, '') : value;

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullname ||
      !formData.email.includes('@') ||
      formData.phone.length !== 10 ||
      formData.fatherphone.length !== 10 ||
      formData.motherphone.length !== 10
    ) {
      alert('Please fill all required fields correctly.');
      return;
    }

    // Save data to IndexedDB
    await addFormData(formData);
    alert('Form submitted and saved locally!');

    // Reset form
    setFormData({
      fullname: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      fathername: '',
      fatherphone: '',
      mothername: '',
      motherphone: '',
    });
  };

  const exportToExcel = async () => {
    const data = await getAllFormData();
  
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "StudentSubmissions.xlsx");
  };

  return (
    <div className="container">
      <h1>Student Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name*</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter full name"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fathername">Father's Name*</label>
          <input
            type="text"
            name="fathername"
            placeholder="Enter father's name"
            value={formData.fathername}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fatherphone">Father's Phone Number*</label>
          <input
            type="text"
            name="fatherphone"
            placeholder="Enter father's phone number"
            value={formData.fatherphone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mothername">Mother's Name*</label>
          <input
            type="text"
            name="mothername"
            placeholder="Enter mother's name"
            value={formData.mothername}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="motherphone">Mother's Phone Number*</label>
          <input
            type="text"
            name="motherphone"
            placeholder="Enter mother's phone number"
            value={formData.motherphone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>

        <button type="button" onClick={exportToExcel} className="submit-button">
          Export to Excel
        </button>
      </form>
    </div>
  );
}

export default App;
