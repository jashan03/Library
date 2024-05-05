import React, { useState } from 'react';
import axios from 'axios';

// hvvsdgc
export function Search() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: ''
  });
  const [searchResult, setSearchResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/user/reader/search', { params: formData });
      setSearchResult(response.data);
      setErrorMsg('');
    } catch (error) {
      setErrorMsg(error.response.data.message || 'Oops! Something went wrong.');
      setSearchResult([]);
    }
  };

  return (
    <div>
      <h2>Book Search Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} /><br></br>
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} /><br></br>
        <input type="text" name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleChange} /><br></br>
        <button type="submit">Search</button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {searchResult.length > 0 && (
        <div>
          <h3>Search Result:</h3>
          <ul>
          {searchResult.map((book) => (
    <li key={book._id}>
      <strong>{book.Title}</strong> by {Array.isArray(book.Authors) ? book.Authors.join(', ') : book.Authors}
    </li>
  ))}
</ul>
        </div>
      )}
    </div>
  );
}

