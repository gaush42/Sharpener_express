const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize');

const app = express()
const port = 3000

app.use(bodyParser.json())

/*const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sharpener',
    waitForConnections:'true',
    connectionLimit:10,
    queueLimit:0,
})
db.getConnection((err, connection)=>{
    if (err){
        log(`Error connecting to MySQL: ${err.message}`)
    } else {
        log(`Connected to mySQL ${connection.config.database}`);
        connection.release();
    }
})*/
const sequelize = new Sequelize('sharpener', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
});
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database:', sequelize.config.database);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
});

const log = (msg) => console.log(`${msg}`)

app.get('/', (req, res) => {
    res.send("Welcome to the Student Management API!");
});

app.post("/students", (req, res) => {
    const { name, email, age } = req.body;
    const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";
    db.query(sql, [name, email, age], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      log(`Inserted student: ${name}`);
      res.status(201).json({ id: result.insertId });
    });
});
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});
app.get("/students/:id", (req, res) => {
    db.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Student not found" });
      res.json(results[0]);
    });
});
app.put("/students/:id", (req, res) => {
    const { name, email, age } = req.body;
    const sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?";
    db.query(sql, [name, email, age, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
      log(`Updated student ID ${req.params.id}`);
      res.json({ message: "Student updated" });
    });
});
app.delete("/students/:id", (req, res) => {
    db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
      log(`Deleted student ID ${req.params.id}`);
      res.json({ message: "Student deleted" });
    });
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
