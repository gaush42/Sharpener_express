const express = require('express')
const router = express.Router()

router.get('/books',(req, res)=>{
    res.send('Here is the list of all books.');
})
router.post('/books',(req, res)=>{
    res.send('A new book has been added.');
})

module.exports = router