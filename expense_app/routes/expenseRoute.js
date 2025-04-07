const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

router.post('/', expenseController.createExpense);
router.get('/', expenseController.getExpenses);
router.delete('/:id', expenseController.deleteExpense);
router.put('/:id', expenseController.updateExpense);

module.exports = router;
