const express = require('express')
const router = express.Router()

router.get('/orders',(req, res)=>{
    res.send('Here is the list of all orders.');
})
router.post('/orders',(req, res)=>{
    res.send('A new order has been created.');
})
router.get('/users',(req, res)=>{
    res.send('Here is the list of all users.');
})
router.post('/users',(req, res)=>{
    res.send('A new user has been added.');
})

module.exports = router