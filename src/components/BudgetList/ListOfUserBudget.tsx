import React, { createContext, Fragment, useEffect, useState } from "react";
import { Header } from "../Header/Header.tsx";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Update } from "../UserDetails/Update.tsx";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  filterIncomeFromList,
  filterExpenseFromList,
  filterDateFromList,
  removeFromList,
  filterReset,
} from "../../redux/feature/budget.tsx";
import { Toaster } from "../Toaster/Toaster.tsx";
import { Button, TextField } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { totalAmount } from "../../utils/calculateFunction.tsx";
import { CSVLink, CSVDownload } from "react-csv";

export const ListOfUserBudget = () => {
  const data = useSelector((state) => state) as any;
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [incomeValue, setIncomeValue] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalRent, setTotalRent] = useState(0);
  const [totalGrocery, setTotalGrocery] = useState(0);
  const budget = JSON.parse(localStorage.getItem("BudgetList") as any);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const setEmptyToUserData = () => setUserData({});

  useEffect(() => {
    totalAmount("income", data, setTotalIncome, setTotalExpense);
    totalAmount("expense", data, setTotalIncome, setTotalExpense);
    findExpenseRent();
  }, [data]);

  useEffect(() => {
    if (budget?.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const findExpenseRent = () => {
    let totalRent = 0;
    let totalGrocery = 0;
    data?.budgetList.budget.forEach((elem) => {
      if (elem.category == "rent") {
        totalRent += parseInt(elem.expense);
      } else {
        totalGrocery += parseInt(elem.expense);
      }
    });

    setTotalRent(totalRent);
    setTotalGrocery(totalGrocery);
  };
  const CustomLabel = ({ dataEntry }) =>
    `${dataEntry.title}: ${dataEntry.value}`;

  return (
    <userContext.Provider value={{ userData, setEmptyToUserData }}>
      <div className="container">
        <Header />
        {budget?.length > 0 && Object.values(userData)?.length == 0 && (
          <div className="pie-chart">
            <h3 className="h3-piechart-title">Information</h3>
            <PieChart
              style={{ marginBottom: 30 }}
              label={CustomLabel}
              labelStyle={() => ({
                fontSize: "5px",
              })}
              data={[
                { title: "Groceries", value: totalGrocery, color: "#E38627" },
                { title: "Rent", value: totalRent, color: "#F20C45" },
                { title: "Income", value: totalIncome, color: "#C13C37" },
              ]}
            />
            <div className="main-sub-pie-div">
              <div className="pie-chart-div">
                <div></div>
                <h4 className="h4-tag">Income: (Rs.)</h4>
              </div>
              <div className="pie-chart-div">
                <h1></h1>
                <h4 className="h4-tag">Groceries: (Rs.)</h4>
                <h5></h5>
                <h4 className="h4-tag">Rent: (Rs.)</h4>
              </div>
            </div>
          </div>
        )}
        {Object.values(userData)?.length ? (
          <main>
            <Update />
          </main>
        ) : isLoading ? (
          <CircularProgress className="load" />
        ) : (
          <div className="table-div">
            {budget?.length > 0 ? (
              <Fragment>
                <TableContainer className="sub-div-table" component={Paper}>
                  <div className="div-filter">
                    {!openFilter ? (
                      <img
                        className="filter-icon"
                        width="50"
                        height="50"
                        onClick={() => setOpenFilter(true)}
                        src="https://img.icons8.com/clouds/100/filter.png"
                        alt="filter"
                      />
                    ) : (
                      <img
                        className="filter-icon"
                        width="50"
                        height="50"
                        onClick={() => setOpenFilter(false)}
                        src="https://img.icons8.com/clouds/100/multiply.png"
                        alt="multiply"
                      />
                    )}
                    {openFilter && (
                      <div className="filter">
                        <TextField
                          id="outlined-basic"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          variant="standard"
                          type="text"
                          placeholder="Search Income"
                          className="input input-advance"
                          value={incomeValue}
                          onChange={(event) => {
                            dispatch(filterIncomeFromList(event.target.value));
                            setIncomeValue(event.target.value);
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          variant="standard"
                          type="text"
                          placeholder="Search Expense"
                          className="input input-advance"
                          value={expenseValue}
                          onChange={(event) => {
                            dispatch(filterExpenseFromList(event.target.value));
                            setExpenseValue(event.target.value);
                          }}
                        />
                        <input
                          type="date"
                          className="input input-date"
                          name="date"
                          placeholder="DD-MM-YYYY"
                          value={dateValue}
                          onChange={(event) => {
                            dispatch(filterDateFromList(event.target.value));
                            setDateValue(event.target.value);
                          }}
                        />
                        <Button
                          className="submit"
                          variant="outlined"
                          onClick={() => {
                            dispatch(filterReset());
                            setDateValue("");
                            setExpenseValue("");
                            setIncomeValue("");
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    )}
                    <CSVLink
                      data={budget}
                      className="csv"
                      filename={"Budget_Report.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  </div>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" className="th-tag">
                          Income (Rs.)
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          Category of Expense
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          Expense (Rs.)
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          Description
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          Date
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          Update
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.budgetList.budget.length > 0 ? (
                        data?.budgetList.budget?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left" className="th-tag">
                              {row.income}
                            </TableCell>
                            <TableCell align="left" className="th-tag">
                              {row.category}
                            </TableCell>
                            <TableCell align="left" className="th-tag">
                              {row.expense}
                            </TableCell>
                            <TableCell align="left" className="th-tag">
                              {row.description}
                            </TableCell>
                            <TableCell align="left" className="th-tag">
                              {row.date}
                            </TableCell>
                            <TableCell align="left" className="th-tag">
                              <img
                                onClick={() => setUserData(row)}
                                width="40"
                                height="40"
                                src="https://img.icons8.com/cute-clipart/64/edit.png"
                                alt="edit"
                              />
                            </TableCell>
                            <TableCell align="left" className="th-tag">
                              <img
                                onClick={() => {
                                  dispatch(removeFromList(row.id));
                                  setOpen(true);
                                }}
                                width="40"
                                height="40"
                                src="https://img.icons8.com/cute-clipart/64/filled-trash.png"
                                alt="filled-trash"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <h3 className="no-data">Opps!! Not found.</h3>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
            ) : (
              <Fragment>
                <h3 className="no-data">Opps!! Seems Like No Data Added.</h3>
                <Link className="list-1" to="/add">
                  Add Data
                </Link>
              </Fragment>
            )}
          </div>
        )}
        <Toaster
          open={open}
          handleClose={handleClose}
          messege={"Removed Succesfully."}
        />
      </div>
    </userContext.Provider>
  );
};
export const userContext = createContext({});
