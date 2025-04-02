const express = require('express')
const app = express()
const port = 3000

/*const addUserMiddleware = ((req,res,next)=>{
    req.user = 'Guest'
    next()
})*/

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
app.listen(port,()=>{
    console.log('Server is up and running on port 3000! Ready to handle requests.')
})