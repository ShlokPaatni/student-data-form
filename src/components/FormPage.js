import React, { useState } from 'react';
import '../App.css';
import { addFormData, getAllFormData } from '../db';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();

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

    const isPhoneField = ['phone', 'fatherphone', 'motherphone'].includes(name);
    const filteredValue = isPhoneField ? value.replace(/\D/g, '') : value;

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    await addFormData(formData);
    alert('Form submitted and saved locally!');

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
      alert('No data to export.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'StudentSubmissions.xlsx');
  };

  return (
    <div className="container">
      <h1>Student Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name*</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            {['Male', 'Female', 'Other'].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div className="form-group">
          <label>Father's Name*</label>
          <input
            type="text"
            name="fathername"
            value={formData.fathername}
            onChange={handleChange}
            placeholder="Enter father's name"
          />
        </div>

        <div className="form-group">
          <label>Father's Phone Number*</label>
          <input
            type="text"
            name="fatherphone"
            value={formData.fatherphone}
            onChange={handleChange}
            placeholder="Enter father's phone number"
          />
        </div>

        <div className="form-group">
          <label>Mother's Name*</label>
          <input
            type="text"
            name="mothername"
            value={formData.mothername}
            onChange={handleChange}
            placeholder="Enter mother's name"
          />
        </div>

        <div className="form-group">
          <label>Mother's Phone Number*</label>
          <input
            type="text"
            name="motherphone"
            value={formData.motherphone}
            onChange={handleChange}
            placeholder="Enter mother's phone number"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>

        <button type="button" className="submit-button" onClick={exportToExcel}>
          Export to Excel
        </button>

        <button type="button" className="submit-button" onClick={() => navigate('/student-data')}>
          View Student Data
        </button>
      </form>
    </div>
  );
}

export default FormPage;
