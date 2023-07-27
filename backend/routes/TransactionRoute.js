const router = require("express").Router();

const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");
const {
  addIncome,
  getIncome,
  deleteIncome,
} = require("../controllers/IncomeController");

router.get("/get-income", getIncome);
router.post("/add-income", addIncome);
router.delete("/delete-income/:id", deleteIncome);
// EXPENSES
router.get("/get-expenses", getExpenses);
router.post("/add-expense", addExpense);
router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;
