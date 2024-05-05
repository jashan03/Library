import React, { useState } from 'react';
import axios from 'axios';

export function RemoveBook(){
  const [isbn, setIsbn] = useState('');

  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  const config = {
    headers: {
      role: 'admin'
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     await axios.delete(`http://localhost:3000/admin/books/remove/${isbn}`,config) // add remove
      .then(response => {
        console.log(response.data);
        showMessage('Book removed successfully');
        // Handle success, like showing a success message or redirecting
      })
      .catch(error => {
        console.error('Error removing book:', error);
        // Handle error, like showing an error message or updating state
      });
  };

  return (
    <div>
      <h2>Remove Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={handleChange} />
        </div>
        <button type="submit">Remove Book</button>
      </form>
    </div>
  );
};


