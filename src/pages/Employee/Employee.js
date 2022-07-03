import EnhancedTable from "../../components/Table/table";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#BB3B62',
  borderColor: '#BB3B62',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#BB3B62',
    borderColor: '#BB3B62',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#BB3B62',
    borderColor: '#BB3B62',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[700]),
  backgroundColor: pink[700],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));


const intialHeadCells = [
  {
    id: "avatar",
    numeric: false,
    label: "avatar",
    type: "file",
  },
  {
    id: "fullName",
    numeric: false,
    label: "full Name",
  },

  {
    id: "gender",
    numeric: false,
    label: "gender",
  },
];



export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = async (arr) => {
    await authorizedAPIs
      .delete(`/employee/delete/${arr}`)
      .then((res) => {
        dispatch(showAlert("deleted successfully ", "success"));
      })
      .catch((err) => {
        dispatch(showAlert("Can't delete", "error"));
        window.location.reload();
        console.log(err.message);
      });
  };
  useEffect(() => {
    authorizedAPIs
      .get("/employee/showMany/100")
      .then((res) => {
        const employeesUnmergedNames = [...res.data.result];
        employeesUnmergedNames.forEach(
          (employee) =>
          (employee.fullName = employee.firstName + " " + employee.lastName,
            employee.avatar = process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_EMPLOYEE_AVATAR_PATH + employee.avatar
          )
        );
        console.log(employeesUnmergedNames);
        setEmployees(employeesUnmergedNames);
      })

  }, []);

  return (
    <div>
      <ColorButton variant="contained" component={Link} to="/employee/add-employee">
        Add employee
      </ColorButton>

      <EnhancedTable
        handleDeleteAPI={handleDelete}
        initialRows={employees}
        headCells={intialHeadCells}
        path={"/employee/"}
      />

    </div>
  );
}
