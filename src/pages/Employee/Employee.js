import EnhancedTable from "../../components/Table/table";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
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
      <Button variant="contained" component={Link} to="/employee/add-employee">
        Add employee
      </Button>

      <EnhancedTable
        handleDeleteAPI={handleDelete}
        initialRows={employees}
        headCells={intialHeadCells}
        path={"/employee/"}
      />

    </div>
  );
}
