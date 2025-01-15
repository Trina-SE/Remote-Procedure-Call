import React, { useState } from 'react';
import axios from 'axios';

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
    <div style={{ padding: '20px' }}>
      <h1>Simple RPC Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Method Name:</label>
          <input
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g., factorial, add, subtract"
            required
          />
        </div>
        <div>
          <label>Parameters (comma-separated):</label>
          <input
            type="text"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            placeholder="e.g., 4 or 3,5"
            required
          />
        </div>
        <button type="submit">Invoke</button>
      </form>
      {result !== '' && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
