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
    id: "firstName",
    validation: Yup.string().min(2).max(30).required("first name is required"),
    initialValue: "",
    label: "first name ",
    type: "text",
  },
  {
    id: "lastName",
    validation: Yup.string().min(2).max(30).required("last name is required"),
    initialValue: "",
    label: "last name ",
    type: "text",
  },
  {
    id: "email",
    validation: Yup.string().min(7).max(30).required("email is required"),
    initialValue: "",
    label: "email",
    type: "text",
  },
  {
    id: "phoneNumber",
    validation: Yup.string().min(11).required("phone is required"),
    initialValue: "",
    label: "phone",
    type: "text",
  },
  {
    id: "nationalId",
    validation: Yup.string().min(14).max(14).required("national id is required"),
    initialValue: "",
    label: "national Id",
    type: "text",
  },
  {
    id: "avatar",
    validation: Yup.mixed().required("avatar is required"),
    initialValue: "",
    label: "avatar",
    type: "file",
  },
  {
    id: "password",
    validation: Yup.string().min(0).max(30).required("password is required"),
    initialValue: "",
    label: "password",
    type: "text",
  },
  {
    id: "gender",
    validation: Yup.string()
      .oneOf(["Male", "Female"])
      .required("gender is required"),
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" }
    ],
    initialValue: "",
    label: "gender",
    type: "text",
  },

  {
    id: "age",
    validation: Yup.number().required("age is required"),
    label: "age",
    type: "number",
    initialValue: '',
  }
];

export default function EditEmployee() {
  const { id } = useParams();
  const [values, setValues] = useState();
  const [inputsData, setInputsData] = useState([...inputs]);
  const dispatch = useDispatch();

  useEffect(() => {
    authorizedAPIs
      .get(`/employee/showOne/${id}`)
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
  },inputsData);

  const handleUpdate = async (values, { resetForm }) => {
    values._id = id;
    await authorizedAPIs
      .put("/employee/edit", values)
      .then((res) => {
        dispatch(showAlert("this employee is updated successfully", "success"));
      })
      .catch((err) => {
        dispatch(showAlert(err.message, "error"));
      });
  };



  return (
    <BookingForm
      handleSubmit={handleUpdate}
      inputsProps={inputsData}
      title="Edit employee "
      submitLabel="Edit employee"
    />

  );
}
