const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");

router.post("/", bookController.addBook);
router.get("/", bookController.getTakenBooks);
router.put("/:id/return", bookController.returnBook);
router.get("/returned", bookController.getReturnedBooks);

module.exports = router;
