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
        id: "hallName",
        validation: Yup.string().min(2).max(30).required("Name is requair is required"),
        initialValue: "",
        label: "hall name",
        type: "text",
    },
    {
        id: "address",
        validation: Yup.string().min(2).max(30).required("Address is required"),
        initialValue: "",
        label: "Address ",
        type: "text",
    },
    {
        id: "hallType",
        validation: Yup.string()
            .oneOf(["Stage", "Cinema", "theater"])
            .required("Type is required"),
        options: [
            { value: "Stage", label: "Stage" },
            { value: "Cinema", label: "Cinema" },
            { value: "theater", label: "theater" }
        ],
        initialValue: "",
        label: "type",
        type: "options",
    },
    {
        id: "chairClassA",
        validation: Yup.number().required("chairClassA is required"),
        label: "Number of class A chair",
        type: "number",
        initialValue: '',
    },
    {
        id: "chairClassB",
        validation: Yup.number().required("chairClassB is required"),
        label: "Number of class B chair",
        type: "number",
        initialValue: '',
    },
    {
        id: "chairClassC",
        validation: Yup.number().required("chairClassC is required"),
        label: "Number of class C chair",
        type: "number",
        initialValue: '',
    },
    {
        id: "companyName",
        validation: Yup.string(),
        label: "company Name",
        type: "options",
        initialValue: '',
        options: [],
    }
];

export default function EditHalls() {
    const { id } = useParams();
    const [values, setValues] = useState();
    const [inputsData, setInputsData] = useState([...inputs]);
    const dispatch = useDispatch();

    useEffect(() => {
        authorizedAPIs.get('/company/showMany/100')
            .then((res) => {
                const index = inputs.length - 1;
                inputs[index].options = [];
                res.data.result.forEach(
                    (company) => {
                        let label = company.companyName;
                        let value = company._id;
                        inputs[index].options = [{ label, value }, ...inputs[index].options];
                    }
                );
                console.log(inputs[index].options)
            })
            .catch((err) => {
                console.log(err.message);
            });

    })


    useEffect(() => {
        authorizedAPIs
            .get(`/halls/showOne/${id}`)
            .then((res) => {
                setValues(res.data.result);
                inputs.map(
                    (item) => {
                        (item.initialValue = res.data.result[item.id])
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
            .put("/halls/edit", values)
            .then((res) => {
                dispatch(showAlert("this halls is updated successfully", "success"));
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
            });
    };



    return values ? (
        <>
            <BookingForm
                handleSubmit={handleUpdate}
                inputsProps={inputsData}
                title="Edit halls "
                submitLabel="Edit halls"
            />
        </>
    ) : (
        <> NOT FOUND</>
    )
}
