const express = require('express');

const app = express();

// Test API
app.get('/', (req, res) => {
  res.send('Space X server Test');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
