const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoute');
const sequelize = require('./config/sequelize');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/expenses', expenseRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
});
