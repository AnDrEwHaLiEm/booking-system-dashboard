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
    disable: false,
    type: "text",
  },
  {
    id: "lastName",
    validation: Yup.string().min(2).max(30).required("last name is required"),
    initialValue: "",
    label: "last name ",
    disable: false,
    type: "text",
  },
  {
    id: "email",
    validation: Yup.string().min(7).max(30).required("email is required"),
    initialValue: "",
    label: "email",
    disable: false,
    type: "text",
  },
  {
    id: "phoneNumber",
    validation: Yup.string().min(11).required("phone is required"),
    initialValue: "",
    label: "phone",
    disable: false,
    type: "text",
  },
  {
    id: "nationalId",
    validation: Yup.string().min(14).max(14).required("national Id is required"),
    initialValue: "",
    label: "national Id",
    disable: false,
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
    disable: false,
    type: "text",
  },
  {
    id: "age",
    validation: Yup.number().required("age is required"),
    label: "age",
    disable: false,
    type: "number",
    initialValue: '',
  },
  {
    id: "workAt",
    validation: Yup.string(),
    label: "company Name",
    type: "text",
    initialValue: "",
    options: [],
  },
  {
    id: "isaPartner",
    validation: Yup.boolean(),
    label: "is a partner",
    disable: false,
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
    authorizedAPIs.get('/company/showMany/100')
      .then((res) => {
        const index = inputs.length - 2;
        inputs[index].options = [];
        res.data.result.forEach(
          (company) => {
            let label = company.companyName;
            let value = company._id;
            inputs[index].options = [{ label, value }, ...inputs[index].options];
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
      });

  })

  useEffect(() => {
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        setValues(res.data.result);
        inputs.forEach(
          (item) => {
            (item.initialValue = res.data.result[item.id])
          }
        );
        setInputsData([...inputs]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, inputsData);

  const handleUpdate = async (values, { resetForm }) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nationalId,
      gender,
      age,
      isaPartner,
      workAt,
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
        gender,
        age,
        isaPartner,
        workAt,
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
        title="Edit Prtner "
        submitLabel="Edit Partner"
      />
    </>
  ) : (
    <> NOT FOUND</>
  );
}
