import { createSlice, current } from "@reduxjs/toolkit";
import User from "../../service/UserSchema";

localStorage.setItem("incomeFilter", "No");
localStorage.setItem("dateFilter", "No");
localStorage.setItem("expenseFilter", "No");

const initialState = {
  budget: JSON.parse(localStorage.getItem("BudgetList") as any) || ([] as any),
};
// card slice
const budgetList = createSlice({
  name: "budgetList",
  initialState,
  reducers: {
    // add
    addUserBudgetCost: (state: any, action) => {
      const budgetDetail: any = [...state.budget];
      let modifiedArr = {
        ...action?.payload,
        id: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(2, 10),
      };
      budgetDetail.unshift(modifiedArr);
      state.budget = [...budgetDetail];
      localStorage.setItem("BudgetList", JSON.stringify(state.budget));
    },

    // // remove perticular iteams
    removeFromList: (state: any, action) => {
      const data = state.budget.filter(
        (ele: { id: string }) => ele.id !== action.payload
      );
      state.budget = data;
      localStorage.setItem("BudgetList", JSON.stringify(state.budget));
    },

    // // clear
    updateListdata: (state, action) => {
      let newArr = [...state.budget];
      newArr.forEach((ele: User) => {
        if (ele.id === action.payload.id) {
          ele.category = action.payload.category;
          ele.id = action.payload.id;
          ele.description = action.payload.description;
          ele.expense = action.payload.expense;
          ele.income = action.payload.income;
          ele.date = action.payload.date;
        }
      });
      state.budget = [...newArr];
      localStorage.setItem("BudgetList", JSON.stringify(state.budget));
    },

    //filter
    filterIncomeFromList: (state: any, action) => {
      if (action.payload.length > 0) {
        const data = state.budget.filter((ele: User) =>
          ele.income.includes(action.payload)
        );
        state.budget = data;
        localStorage.setItem("incomeFilter", action.payload);
      } else {
        state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
        localStorage.setItem("incomeFilter", "No");
        let expense = localStorage.getItem("expenseFilter") || "";
        let date = localStorage.getItem("dateFilter") || "";
        if (date === "No" && expense === "No") {
          state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
        } else if (date !== "No" && date.length > 0) {
          const data = state.budget.filter((ele: User) =>
            ele.date.includes(date)
          );
          state.budget = data;
        } else if (expense !== "No" && expense.length > 0) {
          const data = state.budget.filter((ele: User) =>
            ele.expense.includes(expense)
          );
          state.budget = data;
        }
      }
    },

    filterExpenseFromList: (state: any, action) => {
      if (action.payload.length > 0) {
        const data = state.budget.filter((ele: User) =>
          ele.expense.includes(action.payload)
        );
        state.budget = data;
        localStorage.setItem("expenseFilter", action.payload);
      } else {
        state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
        localStorage.setItem("expenseFilter", "No");
        let income = localStorage.getItem("incomeFilter") || "";
        let date = localStorage.getItem("dateFilter") || "";
        if (income === "No" && date === "No") {
          state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
        } else if (date !== "No" && date.length > 0) {
          const data = state.budget.filter((ele: User) =>
            ele.date.includes(date)
          );
          state.budget = data;
        } else if (income !== "No" && income.length > 0) {
          const data = state.budget.filter((ele: User) =>
            ele.income.includes(income)
          );
          state.budget = data;
        }
      }
    },

    filterDateFromList: (state: any, action) => {
      if (action.payload.length > 0) {
        const data = state.budget.filter((ele: User) =>
          ele.date.includes(action.payload)
        );
        state.budget = data;
        localStorage.setItem("dateFilter", action.payload);
      } else {
        state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
        localStorage.setItem("dateFilter", "No");
        let income = localStorage.getItem("incomeFilter") || "";
        let expense = localStorage.getItem("expenseFilter") || "";
        if (income == "No" && expense == "No") {
          state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
        } else if (expense !== "No" && expense.length > 0) {
          const data = state.budget.filter((ele: User) =>
            ele.expense.includes(expense)
          );
          state.budget = data;
        } else if (income !== "No" && income.length > 0) {
          const data = state.budget.filter((ele: User) =>
            ele.income.includes(income)
          );
          state.budget = data;
        }
      }
    },

    filterCategoryFromList: (state: any, action) => {
      if (action.payload.length > 0) {
        const data = state.budget.filter((ele: User) =>
          ele.category.includes(action.payload)
        );
        state.budget = data;
      } else {
        state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
      }
    },

    filterReset: (state: any) => {
      state.budget = JSON.parse(localStorage.getItem("BudgetList") as any);
    },
  },
});

export const {
  addUserBudgetCost,
  removeFromList,
  updateListdata,
  filterIncomeFromList,
  filterExpenseFromList,
  filterDateFromList,
  filterReset,
  filterCategoryFromList,
} = budgetList.actions;

export default budgetList.reducer;
