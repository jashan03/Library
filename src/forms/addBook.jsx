import React, { useState } from 'react';
import axios from 'axios';

export function AddBook(){
  const [formData, setFormData] = useState({
    LibId: '',
    Title: '',
    Authors: '',
    Publisher: '',
    Version: '',
    TotalCopies: '',
    AvailableCopies: ''
  });

  const config = {
    headers: {
      role: 'admin'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/admin/books', formData,config)
      .then(response => {
        console.log(response.data);
        // Handle success, like showing a success message or redirecting
      })
      .catch(error => {
        console.error('Error adding book:', error);
        // Handle error, like showing an error message or updating state
      });
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Library ID:</label>
          <input type="text" name="LibId" value={formData.LibId} onChange={handleChange} required />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="Title" value={formData.Title} onChange={handleChange} required />
        </div>
        <div>
          <label>Authors:</label>
          <input type="text" name="Authors" value={formData.Authors} onChange={handleChange} />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" name="Publisher" value={formData.Publisher} onChange={handleChange} />
        </div>
        <div>
          <label>Version:</label>
          <input type="text" name="Version" value={formData.Version} onChange={handleChange} />
        </div>
        <div>
          <label>Total Copies:</label>
          <input type="number" name="TotalCopies" value={formData.TotalCopies} onChange={handleChange} />
        </div>
        <div>
          <label>Available Copies:</label>
          <input type="number" name="AvailableCopies" value={formData.AvailableCopies} onChange={handleChange} />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};


