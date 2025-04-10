const Book = require("../model/books");
const { Op } = require("sequelize");

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { name } = req.body;
    const book = await Book.create({ name });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to add book" });
  }
};

// Get all taken books (not yet returned)
exports.getTakenBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { returned_on: null } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch taken books" });
  }
};

// Return a book and calculate fine if overdue
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const today = new Date();
    const dueDate = new Date(book.taken_on);
    dueDate.setDate(dueDate.getDate() + 0);

    let fine = 0;
    if (today > dueDate) {
      const diffDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      fine = diffDays * 10;
    }

    book.returned_on = today;
    book.fine = fine;
    await book.save();

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to return book" });
  }
};

// Get all returned books
exports.getReturnedBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { returned_on: { [Op.ne]: null } }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch returned books" });
  }
};
