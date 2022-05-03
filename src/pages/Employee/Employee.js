import EnhancedTable from "../../components/Table/table";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import avatarImage from "../../assets/avatar.jpg";
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";


const intialHeadCells = [
  {
    id: "personalPicture",
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
    id: "jobTitle",
    numeric: false,
    label: "job title",
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
        console.log(err.message);
      });
  };
 // console.log({ employees });
  useEffect(() => {
    authorizedAPIs
      .get("/employee/showMany/100")
      .then((res) => {
        const employeesUnmergedNames = [...res.data.result];
        employeesUnmergedNames.forEach(
          (employee) =>
            (employee.fullName = employee.firstName + " " + employee.lastName)
        );
        setEmployees(employeesUnmergedNames);
      })
     
  }, []);

  return (
    <div>
      <Button variant="contained" component={Link} to="/employee/add-employee">
        Add employee
      </Button>
    
        <EnhancedTable
          withEdit
          handleDeleteAPI={handleDelete}
          initialRows={employees}
          headCells={intialHeadCells}
          path={"/employee/"}
        />
      
    </div>
  );
}
