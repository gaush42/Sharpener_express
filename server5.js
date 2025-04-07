const express = require('express');
const app = express();
const sequelize = require('./config/sequelize');
const User = require('./model/user');

app.use(express.json());

sequelize.sync().then(() => console.log("Database synced"));

app.get("/users/:id/bookings", async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        where: { userId: req.params.id },
        include: [
          {
            model: Bus,
            attributes: ["busNumber"],
          },
        ],
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get("/buses/:id/bookings", async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        where: { busId: req.params.id },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});  

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});