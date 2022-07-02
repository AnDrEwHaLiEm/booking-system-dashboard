import EnhancedTable from "../../components/Table/table";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";


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
            <Button variant="contained" component={Link} to="/halls/new">
                Add halls
            </Button>
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
