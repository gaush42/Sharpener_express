const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sharpener'
});


db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});


app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId, name, email });
    });
});


app.get('/users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});


app.post('/buses', (req, res) => {
    const { busNumber, totalSeats, availableSeats } = req.body;
    db.query(
        'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)',
        [busNumber, totalSeats, availableSeats],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ id: result.insertId, busNumber, totalSeats, availableSeats });
        }
    );
});


app.get('/buses/available/:seats', (req, res) => {
    const minSeats = parseInt(req.params.seats);
    db.query('SELECT * FROM Buses WHERE availableSeats > ?', [minSeats], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Server listen
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
