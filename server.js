const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

const studentRoutes = require('./routes/studentRoutes')
const courseRoutes = require('./routes/courseRoutes')

app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

app.use('/students', studentRoutes)
app.use('/courses', courseRoutes)

app.get('/', (req,res) => {
    res.send('Welcome to the Student & Course Portal API!')
})

app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(port,()=>{
    console.log('Server is up and running on port 3000! Ready to handle requests.')
})