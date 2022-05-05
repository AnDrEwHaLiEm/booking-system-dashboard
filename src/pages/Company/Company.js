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
    id: "companyName",
    numeric: false,
    label: "company name",
  },
  {
    id: "address",
    numeric: false,
    label: "Address",
  },

  {
    id: "email",
    numeric: false,
    label: "Email",
  },
];



export default function Company() {
  const [company, setEmployees] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = async (arr) => {
    await authorizedAPIs
      .delete(`/company/delete/${arr}`)
      .then((res) => {
        dispatch(showAlert("deleted successfully ", "success"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    authorizedAPIs
      .get("/company/showMany/100")
      .then((res) => {
        setEmployees(res.data.result);
      })

  }, []);

  return (
    <div>
      <Button variant="contained" component={Link} to="/company/add-company">
        Add Company
      </Button>

      <EnhancedTable
        withEdit
        handleDeleteAPI={handleDelete}
        initialRows={company}
        headCells={intialHeadCells}
        path={"/company/"}
      />

    </div>
  );
}
