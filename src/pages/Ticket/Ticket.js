import { Button, Typography } from "@mui/material";
import * as Yup from "yup";
import { authorizedAPIs } from '../../API/axiosSetup'
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import BookingForm from "../../components/BookingForm";
import { showAlert } from "../../Redux/actions/viewAlert";


/*
 "firstName": "Dolagy",
    "lastName": "Baky",
    "phoneNumber": "01275770956",
    "eventTitle": "Ali Gandel Party",
    "poster": "image1.jpg",
    "presenter": [
        "Ali Gandel"
    ],
    "startTime": 1656438897956,
    "endTime": 1656439196513,
    "hallName": "ElSawey",
    "address": "Assuit"


*/

const inputs = [
    {
        id: "firstName",
        validation: Yup.string(),
        initialValue: "",
        label: "first name ",
        disabled: true,
        type: "text",
    },
    {
        id: "lastName",
        validation: Yup.string(),
        initialValue: "",
        label: "last name ",
        disabled: true,
        type: "text",
    },
    {
        id: "phoneNumber",
        validation: Yup.string(),
        initialValue: "",
        label: "phone",
        disabled: true,
        type: "text",
    },
    {
        id: "eventTitle",
        validation: Yup.string(),
        initialValue: "",
        label: "address",
        disabled: true,
        type: "text",
    },
    {
        id: "hallName",
        validation: Yup.string(),
        initialValue: "",
        label: "Hall Name",
        disabled: true,
        type: "text",
    },
    {
        id: "address",
        validation: Yup.string(),
        initialValue: "",
        label: "Hall Name",
        disabled: true,
        type: "text",
    },
    {
        id: "startTime",
        validation: Yup.date(),
        label: "From",
        disabled: true,
        type: "text",
        initialValue: '',
    },
    {
        id: "endTime",
        validation: Yup.date(),
        label: "To",
        disabled: true,
        type: "text",
        initialValue: '',
    },
    {
        id: "paid",
        validation: Yup.boolean(),
        label: "is Paid",
        disabled: false,
        type: "checkbox",
        initialValue: "",
    }
];

export default function Ticket() {
    const [id, setId] = useState();
    const [values, setValues] = useState();
    const [inputsData, setInputsData] = useState([...inputs]);
    const dispatch = useDispatch();
    const getOneTicket = async (values) => {
        await authorizedAPIs.get(`/ticket/ShowOne/${values}`)
            .then((res) => {
                dispatch(showAlert("successfully", "success"));
                setId(values);
                setValues(res.data);
                inputs.forEach(
                    (item) => {
                        (
                            item.id === "startTime" || item.id === "endTime" ?
                                item.initialValue = new Date(res.data[item.id]).toLocaleString()
                                : item.initialValue = res.data[item.id]
                        )
                    }
                );
                setInputsData([...inputs]);
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
                console.log(err.message);
                setValues();
            });
    }
    const handleUpdate = async (values, { resetForm }) => {
        const {
            paid
        } = values;
        await authorizedAPIs
            .put("/ticket/edit", {
                _id: id,
                paid
            })
            .then((res) => {
                console.log(res);
                dispatch(showAlert("successfully", "success"));
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
            });
    };


    return (
        <>
            <Typography gutterBottom variant="h6" component="div" align="center">
                Ticket
            </Typography>
            <Formik
                initialValues={{ TicketId: "" }}
                onSubmit={async (values) => {
                    getOneTicket(values.TicketId);
                }}
            >
                <Form>
                    <Field name="TicketId" type="text" />
                    <Button type="submit">Submit</Button>
                </Form>
            </Formik>
            {values ? (
                <>
                    <BookingForm
                        handleSubmit={handleUpdate}
                        inputsProps={inputsData}
                        title="Ticket"
                        submitLabel="submit Ticket"
                    />
                </>
            ) : <></>
            }
        </>
    );
}
