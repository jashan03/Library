import React, { useState } from 'react';
import axios from 'axios';

export function Signup() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    ContactNumber: '',
    LibId: '',
    Role: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/reader/signup', formData);
      if (response.status === 200) {
        setSuccessMsg(response.data.msg);
        setErrorMsg('');
        setFormData({
          Name: '',
          Email: '',
          ContactNumber: '',
          LibId: '',
          Role: ''
        });
      }
    } catch (error) {
      setErrorMsg('Oops! Something went wrong.');
      setSuccessMsg('');
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required /><br></br>
        <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required /><br></br>
        <input type="text" name="ContactNumber" placeholder="Contact Number" value={formData.ContactNumber} onChange={handleChange} required /><br></br>
        <input type="text" name="LibId" placeholder="Library ID" value={formData.LibId} onChange={handleChange} required /><br></br>
        <input type="text" name="Role" placeholder="Role" value={formData.Role} onChange={handleChange} required /><br></br>
        <button type="submit">Signup</button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
}


