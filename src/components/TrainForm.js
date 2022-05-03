// react imports
import React from "react";

//Box Box Box ---
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// material ui imports
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";

// formik imports
import { Formik } from "formik";

// yup imports for validation
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  inputsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
  },
  submit: {
    margin: "auto",
    display: "block",
  },
}));

export default function TrainForm({
  inputsProps,
  handleSubmit,
  title,
  submitLabel,
  children
}) {
  const classes = useStyles();

  const validationSchema = {};
  const initialValues = {};
  inputsProps.forEach(({ id, validation, initialValue }) => {
    validationSchema[id] = validation;
    initialValues[id] = initialValue;
  });

  return (
    <Container component="main">
      <CssBaseline />
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          {title}
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={Yup.object().shape(validationSchema)}
          onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            resetForm,
            values,
          }) => (
            <form
              className={classes.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                // resetForm()
              }}
            >
               {children}
              <div
                className={classes.inputsContainer}
                style={{
                  display: "grid",
                  gridTemplateColumns: " auto auto auto auto",
                }}
              >
                {inputsProps.map(({ id, label, type, options }) =>
                  options ? (
                    <FormControl
                      error={Boolean(touched[id] && errors[id])}
                      size="small"
                      margin="normal"
                      key={id + label + type}
                    >
                      <InputLabel id="demo-simple-select-label">
                        {label}
                      </InputLabel>
                      <Select
                        type={type}
                        id={id}
                        label={label}
                        name={id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[id]}
                        variant="outlined"
                        key={id + label + type}
                      >
                        {options.map(({ label, value }) => (
                          <MenuItem key={label + value} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {touched[id] && errors[id]}
                      </FormHelperText>
                    </FormControl>
                  ) : (
                    <TextField
                      error={Boolean(touched[id] && errors[id])}
                      helperText={touched[id] && errors[id]}
                      size="small"
                      margin="normal"
                      type={type}
                      id={id}
                      label={label}
                      name={id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[id]}
                      variant="outlined"
                      key={id + label + type}
                    />
                  )
                )}
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ marginTop: 50 }}
                  disabled={isSubmitting}
                  className={classes.submit}
                >
                  {submitLabel}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
