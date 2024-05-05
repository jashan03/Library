import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ListIssue(){
  const [issueRequests, setIssueRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      role: 'admin'
    }
  };

  useEffect(() => {
    
    axios.get('http://localhost:3000/admin/issue-requests',config)
      .then(response => {
        setIssueRequests(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Issue Requests</h2>
      <ul>
        {issueRequests.map(request => (
          <li key={request._id}>
            <p>Request ID: {request._id}</p>
            <p>Book ID: {request.BookId}</p>
            <p>Reader ID: {request.ReaderId}</p>
            <p>Request Type: {request.RequestType}</p>
            <p>ApprovalDate: {request.ApprovalDate}</p>
            <p>ApproverID: {request.ApproverID}</p>

          </li>
        ))}
      </ul>
    </div>
  );
};


