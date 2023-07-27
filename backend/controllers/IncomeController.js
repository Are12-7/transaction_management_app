const IncomeModel = require("../models/Income");

// ADD INCOME
const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeModel({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // INPUT VALIDATION
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    // SAVE TO DB
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

// GET INCOME
const getIncome = async (req, res) => {
  try {
    const incomes = await IncomeModel.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE INCOME
const deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeModel.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while deleting Income" });
    });
};

module.exports = {
  addIncome,
  getIncome,
  deleteIncome,
};
