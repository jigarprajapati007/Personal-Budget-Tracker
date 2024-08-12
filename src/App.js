import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./components/Home/Home.tsx";
import './css/global.css'
import { ListOfUserBudget } from "./components/BudgetList/ListOfUserBudget.tsx";
import { BudgetSummary } from "./components/BudgetList/BudgetSummary.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/add",
      element:<Home/>,
    },
    {
      path: "/",
      element: <ListOfUserBudget/>,
    },
    {
      path: "/summary",
      element: <BudgetSummary/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
