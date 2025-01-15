import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [method, setMethod] = useState('');
  const [params, setParams] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paramsArray = params.split(',').map((param) => Number(param.trim()));

    try {
      const response = await axios.post('http://localhost:5000/rpc', {
        method,
        params: paramsArray,
      });
      setResult(response.data.result);
    } catch (error) {
      setResult(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Simple RPC Client</h1>
      <form className="rpc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Method Name:</label>
          <input
            type="text"
            className="form-input"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g., factorial, add, subtract"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Parameters (comma-separated):</label>
          <input
            type="text"
            className="form-input"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            placeholder="e.g., 4 or 3,5"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Invoke
        </button>
      </form>
      {result !== '' && (
        <div className="result-container">
          <h2 className="result-title">Result:</h2>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
