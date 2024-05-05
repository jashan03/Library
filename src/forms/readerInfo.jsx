import React, { useState } from 'react';
import axios from 'axios';

export function ReaderInfo() {
  const [readerId, setReaderId] = useState('');
  const [issueInfo, setIssueInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const config = {
    headers: {
      role: 'admin'
    }
  };

  const handleChange = (e) => {
    setReaderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.get(`http://localhost:3000/admin/issue-info/${readerId}`,config)
      .then(response => {
        setIssueInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Issue Information for Reader</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reader ID:</label>
          <input type="text" value={readerId} onChange={handleChange} />
        </div>
        <button type="submit">Get Issue Information</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {issueInfo.length > 0 && (
        <div>
          <h3>Issue Information</h3>
          <ul>
            {issueInfo.map(issue => (
              <li key={issue._id}>
                <p>ReaderID: {issue.ReaderID}</p>
                <p>IssueApproverID: {issue.IssueApproverID}</p>
                <p>IssueStatus: {issue.IssueStatus}</p>
                <p>IssueDate: {issue.IssueDate}</p>
                <p>ExpectedReturnDate: {issue.ExpectedReturnDate}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

