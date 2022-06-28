import EnhancedTable from "../../components/Table/table";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { authorizedAPIs } from '../../API/axiosSetup'
import React, { useState, useEffect } from 'react';
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

const intialHeadCells = [
    {
        id: "userName",
        numeric: false,
        label: "full name",
    },
    {
        id: "eventTitle",
        numeric: false,
        label: "event title",
    },

    {
        id: "chairNumber",
        numeric: true,
        label: "chair number",
    },
    {
        id: "paid",
        numeric: false,
        label: "paid",
    }

];


export default function Ticket() {

    const [ticket, setTicket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

        authorizedAPIs.get('/ticket/showMany/100')
            .then((res) => {
                const ticketsData = [...res.data.result];
                setTicket(ticketsData);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, [])


    return (
        <>
            <Typography gutterBottom variant="h6" component="div" align="center">
                Ticket
            </Typography>

            <EnhancedTable
                withEdit
                initialRows={ticket}
                headCells={intialHeadCells}
                path={"/ticket/"}
            />

        </>
    );
}
