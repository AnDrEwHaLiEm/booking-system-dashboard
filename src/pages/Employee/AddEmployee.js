import BookingForm from '../../components/BookingForm'
import * as Yup from "yup";
import { uploadImageAPIS } from "../../API/axiosSetup";
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

export default function AddEmployee() {
  const dispatch = useDispatch();
  const addEmployee = async (values, { resetForm }) => {
    const formData = new FormData();
    var imagefile = document.querySelector('#avatar');
    formData.append("avatarImage", imagefile.files[0]);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email.department);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("nationalId", values.nationalId);
    formData.append("password", values.password);
    formData.append("gender", values.gender);
    formData.append("age", values.age);

    await uploadImageAPIS.post('/employee/new', formData).then((res) => {
      dispatch(showAlert("successfully Operation", "success"));
      resetForm();
    }).catch((err) =>
      dispatch(showAlert(err.message, "error"))
    );
  };
  return (
    <>
      <BookingForm
        handleSubmit={addEmployee}
        inputsProps={inputs}
        title="Add employee "
        submitLabel="Add"
      />
    </>
  );
}
