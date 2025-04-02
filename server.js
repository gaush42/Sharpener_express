const express = require('express');
const app = express();
const port = 3000;


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
