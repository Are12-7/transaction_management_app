import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/transaction";

const TransactionContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // ADD INCOME
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncome();
  };

  // GET INCOME
  const getIncome = async () => {
    const response = await axios.get(`${BASE_URL}/get-income`);
    setIncomes(response.data);
    console.log(response.data);
  };

  // DELETE INCOME
  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete-income/${id}`);
    getIncome();
  };

  // TOTAL INCOME
  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  // ADD EXPENSES
  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  // GET EXPENSES
  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  // DELETE EXPENSE
  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
    getExpenses();
  };

  // CALCULATE TOTAL EXPENSES
  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  // CALCULATE TOTAL BALANCE
  const totalBalance = () => {
    return Math.round(totalIncome() - totalExpenses(), 3);
  };

  // HISTORY
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <TransactionContext.Provider
      value={{
        addIncome,
        getIncome,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
