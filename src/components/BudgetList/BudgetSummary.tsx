import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header.tsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { totalAmount } from "../utils/calculateFunction.tsx";
import { Button, TextField } from "@mui/material";
import {
  filterCategoryFromList,
  filterReset,
} from "../../redux/feature/budget.tsx";

export const BudgetSummary = () => {
  const [showDetail, setShowDetail] = useState("budget");
  const data = useSelector((state) => state) as any;
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    totalAmount("income", data, setTotalIncome, setTotalExpense);
    totalAmount("expense", data, setTotalIncome, setTotalExpense);
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="div-summary">
        <Accordion
          className="accordian"
          expanded={showDetail == "budget"}
          onClick={() => setShowDetail("budget")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="title"
          >
            Budget Summary
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
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
                      Remaining Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.budgetList.budget.length > 0 &&
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
                          {row.income - row.expense < 0 ? (
                            <h5 className="mark">{row.income - row.expense}</h5>
                          ) : (
                            <h5 className="unmark">
                              {row.income - row.expense}
                            </h5>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="total">
              <h3 className="unmark" style={{ fontSize: 20 }}>
                Total Income: {totalIncome}
              </h3>
              <h3 className="mark" style={{ fontSize: 20 }}>
                Total Expense: {totalExpense}
              </h3>
              <h3 className="budget-total">
                Remaining Total Budget: {totalIncome - totalExpense}
              </h3>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordian"
          expanded={showDetail == "income"}
          onClick={() => setShowDetail("income")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="title"
          >
            Income Summary
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="th-tag">
                      Income (Rs.)
                    </TableCell>
                    <TableCell align="left" className="th-tag">
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.budgetList.budget.length > 0 &&
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
                          {row.date}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="total">
              <h3 className="unmark" style={{ fontSize: 20 }}>
                Total Income: {totalIncome}
              </h3>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordian"
          expanded={showDetail == "expense"}
          onClick={() => setShowDetail("expense")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            className="title"
          >
            Expense Summary
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <div className="div-filter-category">
                <TextField
                  id="outlined-basic"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  variant="standard"
                  type="text"
                  placeholder="Search Category"
                  className="input input-advance"
                  value={category}
                  onChange={(event) => {
                    dispatch(filterCategoryFromList(event.target.value));
                    setCategory(event.target.value);
                  }}
                />{" "}
                <Button
                  className="submit"
                  variant="outlined"
                  onClick={() => {
                    dispatch(filterReset());
                    setCategory("");
                  }}
                >
                  Reset
                </Button>
              </div>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="th-tag">
                      Expenses (Rs.)
                    </TableCell>
                    <TableCell align="left" className="th-tag">
                      Category
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.budgetList.budget.length > 0 &&
                    data?.budgetList.budget?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" className="th-tag">
                          {row.expense}
                        </TableCell>
                        <TableCell align="left" className="th-tag">
                          {row.category}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="total">
              <h3 className="mark" style={{ fontSize: 20 }}>
                Total Expense: {totalExpense}
              </h3>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
