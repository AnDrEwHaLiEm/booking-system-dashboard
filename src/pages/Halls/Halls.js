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
        id: "hallName",
        numeric: false,
        label: "name",
    },
    {
        id: "address",
        numeric: false,
        label: "Address",
    },

    {
        id: "hallType",
        numeric: false,
        label: "Type",
    },
    {
        id: "numberOfChair",
        numeric: false,
        label: "Number of chair",
    }
];



export default function Halls() {
    const [halls, setHalls] = useState([]);
    const dispatch = useDispatch();

    const handleDelete = async (arr) => {
        await authorizedAPIs
            .delete(`/halls/delete/${arr}`)
            .then((res) => {
                dispatch(showAlert("deleted successfully ", "success"));
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
                console.log(err.message);
            });
    };

    useEffect(() => {
        authorizedAPIs
            .get("/halls/showMany/100")
            .then((res) => {
                setHalls(res.data.result);
            })

    }, []);

    return (
        <div>
            <ColorButton  variant="contained" component={Link} to="/halls/new"  >
                Add halls
            </ColorButton >
            <EnhancedTable
                withEdit
                handleDeleteAPI={handleDelete}
                initialRows={halls}
                headCells={intialHeadCells}
                path={"/halls/"}
            />

        </div>
    );
}
