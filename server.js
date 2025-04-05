const express = require('express');
const app = express();
const mysql = require('mysql2');

const port = 3000;

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sharpener'
})
connection.connect((err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Connection established")

    const SqlQuery = `create table student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30)
    )`
    connection.execute(SqlQuery, (err)=>{
        if(err){
            console.log(err)
            connection.end()
            return
        }
        console.log('Table created')
    })
})

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to the E-commerce API!");
});


app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
