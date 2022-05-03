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
    validation: Yup.string().min(14).max(14).required("national Id is required"),
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
  },
  {
    id: "isaPartner",
    validation: Yup.boolean(),
    label: "is a partner",
    type: "checkbox",
    initialValue: "true",
  }
];

export default function EditPartner() {
  const { id } = useParams();
  const [values, setValues] = useState();
  const [inputsData, setInputsData] = useState([...inputs]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ id });
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        console.log({ res });
        setValues(res.data.result);
        inputs.forEach(
          (item) => (item.initialValue = res.data.result[item.id])
        );
        inputs.avatar.initialValue = "";
        console.log(inputs)
        setInputsData(inputs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleUpdate = async (values, { resetForm }) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nationalId,
      avatar,
      password,
      gender,
      age,
      isaPartner,
    } = values;
    console.log(values);
    await authorizedAPIs
      .put("/user/edit", {
        _id: id,
        firstName,
        lastName,
        email,
        phoneNumber,
        nationalId,
        avatar,
        password,
        gender,
        age,
        isaPartner,
      })
      .then((res) => {
        console.log(res);
        dispatch(showAlert("this user is updated successfully", "success"));
        // resetForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return values ? (
    <>
      <BookingForm
        handleSubmit={handleUpdate}
        inputsProps={inputsData}
        title="Edit Prtner "
        submitLabel="Edit Partner"
      />
    </>
  ) : (
    <> NOT FOUND</>
  );
}
