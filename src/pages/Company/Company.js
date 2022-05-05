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
    companyName: "Company Name",
    numeric: false,
    label: "Company Name",
    type: "string",
  },
  {
    address: "Address",
    numeric: false,
    label: "Address",
    type: "string",
  },
  {///////////////////////////////////////////////////////////////////////////
    serves: "Serves",
    numeric: false,
    label: "Serves",
    type: "string",
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
  // console.log({ company });
  useEffect(() => {
    authorizedAPIs
      .get("/company/showMany/100")
      .then((res) => {
        const companysUnmergedNames = [...res.data.result];
        companysUnmergedNames.forEach(
          (company) =>
            (company.fullName = company.firstName + " " + company.lastName)
        );
        setEmployees(companysUnmergedNames);
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
