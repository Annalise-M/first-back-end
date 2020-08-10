const express = require('express')
const app = express()
const port = 3000

// console.log('hello worldsssss');

app.get('/', (req, res) => {
  res.send('hello worldsssss')
})

app.get('/sup-buttercup', (req, res) => {
    res.json({
        name: req.query.name,
        code: req.query.password
    });
  });

app.get('/babessss', (req, res) => {
    // console.log(req.headers);
    // console.log(req.query.username);
    // console.log(req.query.password);
    
    // only one res.send at a time // Only RES. method used ONCE
    // res.send(`hey there beautiful. Thanks for logging on ${req.query.username}. Here is your password: ${req.query.password}`);

    res.json({
        name: req.query.username,
        code: req.query.password
    });
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


