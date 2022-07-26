import transactionDAO from '../daos/transaction.js';
import transactionTypesDAO from '../daos/transaction_type.js';
import categoryDAO from '../daos/category.js';
import ApiError from '../helpers/ApiError.js';

const calculateStatsByType = async (statsByType) => {
  let result = [];
  const transactionTypes = await transactionTypesDAO.getAllTransactionTypes();

  const expense = statsByType.find((type) => type.id === 2);
  const income = statsByType.find((type) => type.id === 1);

  if (income) {
    result.push(income);
  }

  if (expense) {
    expense.total_amount = -expense.total_amount;
    result.push(expense);
  }

  if (result.length !== transactionTypes.length) {
    transactionTypes.forEach((type) => {
      const found = result.find((item) => item.id === type.id);
      if (!found) {
        result.push({
          total: 0,
          total_amount: 0,
          name: type.name,
          id: type.id,
        });
      }
    });
  }

  result.sort((a, b) => a.id - b.id);

  return result;
};

const calculateStatsByCategory = async (statsByCategory) => {
  const result = [];
  const categories = await categoryDAO.getAllCategories();

  categories.forEach((category) => {
    const found = statsByCategory.filter((item) => item.id === category.id);

    if (found.length === 0) {
      result.push({
        total: 0,
        total_amount: 0,
        name: category.name,
        id: category.id,
      });
    } else if (found.length === 1) {
      if (found[0].type === 2) {
        found[0].total_amount = -found[0].total_amount;
      }

      result.push(found[0]);
    } else {
      const total = found.reduce((acc, item) => acc + item.total, 0);
      const income = found.find((item) => item.type === 1);
      const expense = found.find((item) => item.type === 2);

      const totalAmount = income.total_amount - expense.total_amount;

      result.push({
        total,
        total_amount: Math.round(totalAmount * 100) / 100,
        name: category.name,
        id: category.id,
      });
    }
  });
  result.sort((a, b) => a.id - b.id);
  return result;
};

const calculateStatsByLastSixMonths = async (statsByLastSixMonths) => {
  const lastSixMonths = [];
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 6, 1);
  for (let i = 0; i < 6; i++) {
    const month = lastMonth.getMonth() + 1;
    const year = lastMonth.getFullYear();
    lastSixMonths.push({ month: month + 1, year });
    lastMonth.setMonth(lastMonth.getMonth() + 1);
  }
  let result = [];

  if (statsByLastSixMonths.length === 0) {
    result = lastSixMonths.map((month) => ({
      total: 0,
      total_amount: 0,
      month: month.month,
      year: month.year,
    }));
  } else {
    lastSixMonths.forEach((month) => {
      const monthStats = statsByLastSixMonths.filter(
        (stat) => stat.month === month.month && stat.year === month.year
      );
      if (monthStats.length === 0) {
        result.push({
          total: 0,
          total_amount: 0,
          month: month.month,
          year: month.year,
        });
      } else {
        const monthIncome = monthStats.find((stat) => stat.type === 1);
        const monthExpense = monthStats.find((stat) => stat.type === 2);

        if (monthIncome && monthExpense) {
          const totalAmount =
            monthIncome.total_amount - monthExpense.total_amount;
          result.push({
            total: monthIncome.total + monthExpense.total,
            total_amount: Math.round(totalAmount * 100) / 100,
            month: month.month,
            year: month.year,
          });
        } else if (monthIncome) {
          result.push({
            total: monthIncome.total,
            total_amount: monthIncome.total_amount,
            month: month.month,
            year: month.year,
          });
        } else if (monthExpense) {
          result.push({
            total: monthExpense.total,
            total_amount: -monthExpense.total_amount,
            month: month.month,
            year: month.year,
          });
        }
      }
    });

    result.sort((a, b) => {
      if (a.year > b.year) {
        return -1;
      } else if (a.year < b.year) {
        return 1;
      } else {
        if (a.month > b.month) {
          return -1;
        } else if (a.month < b.month) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
  return result;
};

class TransactionService {
  transactionNotFound(transaction) {
    if (!transaction) {
      throw ApiError.notFound();
    }
  }

  createTransaction(transaction, userId) {
    const { description, amount, type, date, category_id } = transaction;
    return transactionDAO.createTransaction(
      description,
      amount,
      type,
      date,
      category_id,
      userId
    );
  }

  async getTransaction(id, userId) {
    const transaction = await transactionDAO.getTransaction(id, userId);

    this.transactionNotFound(transaction);

    return transaction;
  }

  getUserTransactions(userId, filters, limit, offset) {
    return transactionDAO.getUserTransactions(userId, filters, limit, offset);
  }

  async updateTransaction(id, transaction, userId) {
    const { description, amount, date, category_id } = transaction;
    const updatedTransaction = await transactionDAO.updateTransaction(
      id,
      description,
      amount,
      date,
      category_id,
      userId
    );

    this.transactionNotFound(transaction);

    return updatedTransaction;
  }

  async deleteTransaction(id, userId) {
    const transaction = await transactionDAO.deleteTransaction(id, userId);

    this.transactionNotFound(transaction);

    return transaction;
  }

  async showStats(userId) {
    const stats = await transactionDAO.showStats(userId);

    stats.groupByType = await calculateStatsByType(stats.groupByType);
    stats.groupByCategory = await calculateStatsByCategory(
      stats.groupByCategory
    );
    stats.groupByLastSixMonths = await calculateStatsByLastSixMonths(
      stats.groupByLastSixMonths
    );

    return stats;
  }
}

export default new TransactionService();
