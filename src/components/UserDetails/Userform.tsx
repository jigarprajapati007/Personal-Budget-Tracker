import React, { useState } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { addUserBudgetCost } from "../../redux/feature/budget.tsx";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Toaster } from "../Toaster/Toaster.tsx";

export const Userform = () => {
  const [open, setOpen] = useState(false);

  const userSchema = Yup.object({
    income: Yup.number().required("Income is required").positive().integer(),
    expense: Yup.number().required("Expense is required").positive().integer(),
    description: Yup.string().required(),
    category: Yup.string().required("Category of expense is required."),
    date: Yup.string().required("Date is required."),
  });
  const handleChangeData = (event: SelectChangeEvent, setFieldValue) => {
    setFieldValue("category", event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          income: "",
          expense: "",
          description: "",
          category: "rent",
          date: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          setOpen(true);
          dispatch(addUserBudgetCost(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          resetForm
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">Add Details</h2>
            <h3>Income (Rs.):</h3>
            <TextField
              className="input"
              id="outlined-basic"
              type="income"
              name="income"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.income}
              placeholder="Income"
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              variant="standard"
            />
            <p>{errors.income && touched.income && errors.income}</p>
            <h3>Expense (Rs.):</h3>
            <TextField
              className="input"
              id="outlined-basic"
              type="income"
              name="expense"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.expense}
              placeholder="Expense"
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              variant="standard"
            />
            <p>{errors.expense && touched.expense && errors.expense}</p>
            <h3>Description :</h3>
            <TextField
              className="input-dec"
              id="outlined-basic"
              type="income"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              multiline
              rows={4}
              placeholder="Description"
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              variant="standard"
            />
            <p>
              {errors.description && touched.description && errors.description}
            </p>
            <h3>Select Expense Category :</h3>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.category}
                  className="select-tool"
                  onChange={(event) => handleChangeData(event, setFieldValue)}
                >
                  <MenuItem value={"rent"}>Rent</MenuItem>
                  <MenuItem value={"grocery"}>Groceries</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <p>{errors.category && touched.category && errors.category}</p>
            <h3>Select Date :</h3>
            <input
              type="date"
              className="input input-date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              placeholder="DD-MM-YYYY"
            />
            <p>{errors.date && touched.date && errors.date}</p>
            <br />
            <Button className="submit" type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        )}
      </Formik>
      <Toaster open={open} handleClose={handleClose} messege={'Added Succesfully.'}/>
    </div>
  );
};
