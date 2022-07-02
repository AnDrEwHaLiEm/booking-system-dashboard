import BookingForm from "../../components/BookingForm";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import imageCover from "../../assets/news.jpg";
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
    disabled: true,
  },
  {
    id: "lastName",
    validation: Yup.string().min(2).max(30).required("last name is required"),
    initialValue: "",
    label: "last name ",
    type: "text",
    disabled: true,
  },
  {
    id: "email",
    validation: Yup.string().min(7).max(30).required("email is required"),
    initialValue: "",
    label: "email",
    type: "text",
    disabled: true,
  },
  {
    id: "phoneNumber",
    validation: Yup.string().min(11).required("phone is required"),
    initialValue: "",
    label: "phone",
    type: "text",
    disabled: true,
  },
  {
    id: "nationalId",
    validation: Yup.string().min(14).max(14).required("national Id is required"),
    initialValue: "",
    label: "national Id",
    type: "text",
    disabled: true,
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
    disabled: true,
  },
  {
    id: "age",
    validation: Yup.number().required("age is required"),
    label: "age",
    type: "number",
    initialValue: '',
    disabled: true,
  },
  {
    id: "isaPartner",
    validation: Yup.boolean(),
    label: "is a partner",
    type: "checkbox",
    initialValue: "true",
    disabled: false,
  }
];

export default function EditUser() {
  const { id } = useParams();
  const [values, setValues] = useState();
  const [inputsData, setInputsData] = useState([...inputs]);
  const dispatch = useDispatch();

  useEffect(() => {
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        console.log({ res });
        setValues(res.data.result);
        inputs.forEach(
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
    const {
      isaPartner,
    } = values;
    console.log(values);
    await authorizedAPIs
      .put("/user/edit", {
        _id: id,
        isaPartner,
      })
      .then((res) => {
        console.log(res);
        dispatch(showAlert("this user is updated successfully", "success"));
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
        title="Make Partner"
        submitLabel="Make Partner"
      />
    </>
  ) : (
    <> NOT FOUND</>
  );
}
