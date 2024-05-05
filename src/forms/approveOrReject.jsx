import React, { useState } from 'react';
import axios from 'axios';

export function ApproveOrReject (){
  const [reqId, setReqId] = useState('');
  const [approverId, setApproverId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const config = {
    headers: {
      role: 'admin'
    }
  };

  const handleReqIdChange = (e) => {
    setReqId(e.target.value);
  };

  const handleApproverIdChange = (e) => {
    setApproverId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/admin/issue-requests/${reqId}`,config, { approverID: approverId })
      .then(response => {
        setMessage(response.data.message);
        setError('');
      })
      .catch(error => {
        setMessage('');
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Approve or Reject Issue Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Request ID:</label>
          <input type="text" value={reqId} onChange={handleReqIdChange} />
        </div>
        <div>
          <label>Approver ID:</label>
          <input type="text" value={approverId} onChange={handleApproverIdChange} />
        </div>
        <button type="submit">Approve/Reject Request</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};


