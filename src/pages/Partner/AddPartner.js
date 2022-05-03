import BookingForm from "../../components/BookingForm";
import * as Yup from "yup";
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

export default function AddPartner() {


  const dispatch = useDispatch();





  const handleSubmit = async (values, { resetForm }) => {
    const sendValue = { ...values, isaPartner: true };
    console.log(sendValue);
    await authorizedAPIs
      .post('/user/new', sendValue)
      .then((res) => {
        console.log({ res });
        dispatch(showAlert("this user is add successfully", "success"));
        resetForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <BookingForm
        inputsProps={inputs}
        title="Add user "
        submitLabel="create"
        handleSubmit={handleSubmit}
      >
      </BookingForm>
    </>
  );
}
