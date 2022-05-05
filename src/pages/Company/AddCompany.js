import BookingForm from '../../components/BookingForm'
import * as Yup from "yup";
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

export default function AddCompany() {
    const dispatch = useDispatch();
    const addCompany = async (values, { resetForm }) => {
        authorizedAPIs
            .post("/company/new", values)
            .then((res) => {
                console.log({ res });
                dispatch(showAlert("this company is add successfully", "success"));
                resetForm();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <BookingForm
                handleSubmit={addCompany}
                inputsProps={inputs}
                title="Add company "
                submitLabel="Add"
            />
        </>
    );
}
