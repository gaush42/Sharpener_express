const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

app.get('/orders',(req, res)=>{
    res.send('Here is the list of all orders.');
})
app.post('/orders',(req, res)=>{
    res.send('A new order has been created.');
})
app.get('/users',(req, res)=>{
    res.send('Here is the list of all users.');
})
app.post('/users',(req, res)=>{
    res.send('A new user has been added.');
})
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
  });

app.listen(port,()=>{
    console.log('Server is up and running on port 3000! Ready to handle requests.')
})