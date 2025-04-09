const express = require("express");
const router = express.Router();
const Book = require("../model/books");
const { Op } = require("sequelize");

// Add a new book (Take Book)
router.post("/", async (req, res) => {
  const { name } = req.body;
  const book = await Book.create({ name });
  res.json(book);
});

// Get all taken books
router.get("/", async (req, res) => {
  const books = await Book.findAll({ where: { returned_on: null } });
  res.json(books);
});

// Return a book
router.put("/:id/return", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).send("Book not found");

  const today = new Date();
  const dueDate = new Date(book.taken_on);
  dueDate.setDate(dueDate.getDate() + 1);

  let fine = 0;
  if (today > dueDate) {
    const diffTime = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    fine = diffTime * 10; // ₹10/day fine
  }

  book.returned_on = today;
  book.fine = fine;
  await book.save();
  res.json(book);
});

// Get all returned books
router.get("/returned", async (req, res) => {
  const books = await Book.findAll({ where: { returned_on: { [Op.ne]: null } } });
  res.json(books);
});

module.exports = router;
