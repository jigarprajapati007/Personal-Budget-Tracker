import { configureStore } from "@reduxjs/toolkit";
import budgetList from "../feature/budget.tsx";

// create store
export const store = configureStore({
    reducer:{
        budgetList
    }
})