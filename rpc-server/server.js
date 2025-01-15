const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// RPC Methods
const methods = {
  factorial: (n) => {
    if (n < 0) return null; // Negative numbers do not have a factorial
    if (n === 0) return 1;
    return n * methods.factorial(n - 1);
  },
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// Endpoint for RPC
app.post('/rpc', (req, res) => {
  const { method, params } = req.body;

  if (!methods[method]) {
    return res.status(400).json({ error: `Method '${method}' not found.` });
  }

  try {
    const result = methods[method](...params);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the method.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`RPC server is running on http://localhost:${PORT}`);
});
