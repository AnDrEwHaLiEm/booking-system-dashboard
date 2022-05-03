import EnhancedTable from "../../components/Table/table";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {authorizedAPIs} from '../../API/axiosSetup'
import React, { useState , useEffect } from 'react';
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

const intialHeadCells = [
  {
    id: "trainType",
    numeric: false,
    label: "Train Type",
  },
  {
    id: "trainNumber",
    numeric: true,
    label: "Train Number",
  },

 
];


export default function Train() {

  const [train, setTrain] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = async (arr) => {
    await authorizedAPIs
      .delete(`/train/delete/${arr}`)
      .then((res) => {
        dispatch(showAlert("deleted successfully ", "success"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
 
     authorizedAPIs.get('/train/showMany/100')
    .then ((res) => {
      setTrain(res.data.resualt)

    })
    .catch((err) => {
  
        console.log(err.message);
      });
  
}, [])
  
  
  return (
    <>
      <Typography gutterBottom variant="h6" component="div" align="center">
        train
      </Typography>
      <Button variant="contained" component={Link} to="/train/new">
        add train
      </Button>
      
     
      <EnhancedTable
          withEdit
          handleDeleteAPI={handleDelete}
          initialRows={train}
          headCells={intialHeadCells}
          path={"/train/"}
        />

    </>
  );
}
