import EnhancedTable from "../../components/Table/table";
import { Typography } from "@mui/material";
import { authorizedAPIs } from '../../API/axiosSetup'
import React, { useState, useEffect } from 'react';
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

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


export default function User() {

  const [user, setuser] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = async (arr) => {
    await authorizedAPIs
      .delete(`/user/delete/${arr}`)
      .then((res) => {
        dispatch(showAlert("deleted successfully ", "success"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {

    authorizedAPIs.get('/user/showMany/100/false')
      .then((res) => {
        const userUnmergedNames = [...res.data.result];
        userUnmergedNames.forEach(
          (user) =>
          (user.fullName = user.firstName + " " + user.lastName,
            user.avatar = process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_USER_AVATAR_PATH + user.avatar
          )
        );
        console.log(userUnmergedNames);
        setuser(userUnmergedNames);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, [])


  return (
    <>
      <Typography gutterBottom variant="h6" component="div" align="center">
        user
      </Typography>

      <EnhancedTable
        withEdit
        handleDeleteAPI={handleDelete}
        initialRows={user}
        headCells={intialHeadCells}
        path={"/user/"}
      />

    </>
  );
}
