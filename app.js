const express = require('express');

const app = express();

const port = 5001;

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.get('/bye', (req, res) => {
  res.send('bye!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
