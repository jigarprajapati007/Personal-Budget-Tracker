export const totalAmountIncome = (elem, type) => {
  switch (type) {
    case "income":
      return elem.income;
    case "expense":
      return elem.expense;
    default:
      break;
  }
};

export const totalAmount = (type, data, setTotalIncome, setTotalExpense) => {
  let totalIncome = 0;
  data?.budgetList.budget.forEach((elem) => {
    totalIncome += parseInt(totalAmountIncome(elem, type));
  });
  switch (type) {
    case "income":
      setTotalIncome(totalIncome);
    case "expense":
      setTotalExpense(totalIncome);
    default:
      break;
  }
};
