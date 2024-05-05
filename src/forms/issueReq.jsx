import React, { useState } from 'react';
import axios from 'axios';

export function IssueReq() {
  const [formData, setFormData] = useState({
    BookId: '',
    ReaderId: ''
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
      const response = await axios.post('http://localhost:3000/user/reader/issue-request', formData);
      console.log(response)
      if (response.status === 201) {
        setSuccessMsg(response.data.message);
        setErrorMsg('');
        setFormData({
          BookId: '',
          ReaderId: ''
        });
      }
    } catch (error) {
      setErrorMsg(error.response.data.message || 'Oops! Something went wrong.');
      setSuccessMsg('');
    }
  };

  return (
    <div>
      <h2>Issue Request Form</h2>
      <form onSubmit={handleSubmit}>
        
        <input type="text" name="BookId" placeholder="Book ID" value={formData.BookId} onChange={handleChange} required /><br></br>
        <input type="text" name="ReaderId" placeholder="Reader ID" value={formData.ReaderId} onChange={handleChange} required /><br></br>
        <button type="submit">Submit Request</button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
}

