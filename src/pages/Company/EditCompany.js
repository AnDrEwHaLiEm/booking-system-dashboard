import BookingForm from "../../components/BookingForm";
import * as Yup from "yup";
import { useParams } from "react-router";
import React from 'react';
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";


const inputs = [
    {
        id: "companyname",
        validation: Yup.string().min(2).max(30).required(" company name is required"),
        initialValue: "",
        label: "Company Name ",
        type: "text",
    },
    {
        id: "Address",
        validation: Yup.string().min(2).max(30).required("Address is required"),
        initialValue: "",
        label: "Address ",
        type: "text",
    },
    {
        id: "serves",
        validation: Yup.string().min(7).max(30).required("serves is required"),
        initialValue: "",
        label: "email",
        type: "text",
    },
];

export default function EditCompany() {
    const { id } = useParams();
    const [values, setValues] = useState();
    const [inputsData, setInputsData] = useState([...inputs]);
    const dispatch = useDispatch();

    useEffect(() => {
        authorizedAPIs
            .get(`/company/showOne/${id}`)
            .then((res) => {
                console.log({ res });
                setValues(res.data.result);
                inputs.map(
                    (item) => {
                        (item.id == "avatar" ? item.initialValue = '' : item.initialValue = res.data.result[item.id])
                    }
                );
                setInputsData([...inputs]);
                console.log(inputsData);

            })
            .catch((err) => {
                console.log(err.message);
            });
    }, inputsData);

    const handleUpdate = async (values, { resetForm }) => {
        values._id = id;
        await authorizedAPIs
            .put("/company/edit", values)
            .then((res) => {
                dispatch(showAlert("this company is updated successfully", "success"));
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
            });
    };



    return (
        <BookingForm
            handleSubmit={handleUpdate}
            inputsProps={inputsData}
            title="Edit company "
            submitLabel="Edit company"
        />

    );
}
