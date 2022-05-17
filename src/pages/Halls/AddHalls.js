import BookingForm from "../../components/BookingForm";
import * as Yup from "yup";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";



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
            { value: "theater", label:"theater"}
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
        id: "company_id",
        validation: Yup.string(),
        label: "company Name",
        type: "options",
        initialValue: '',
        options: [],
    }
];

export default function AddHalls() {
    const [flag, setFlag] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {

        authorizedAPIs.get('/company/showMany/100')
            .then((res) => {
                inputs[6].options = [];
                res.data.result.forEach(
                    (company) => {
                        let label = company.companyName;
                        let value = company._id;
                        inputs[6].options = [{ label, value }, ...inputs[6].options];
                    }
                );
                setFlag(true);
                console.log(inputs);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, [])



    const handleSubmit = async (values, { resetForm }) => {
        const sendValue = { ...values, isaPartner: true };
        console.log(sendValue);
        await authorizedAPIs
            .post('/halls/new', sendValue)
            .then((res) => {
                console.log({ res });
                dispatch(showAlert("this halls is add successfully", "success"));
                resetForm();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        flag ? (
            <>
                <BookingForm
                    inputsProps={inputs}
                    title="Add halls"
                    submitLabel="create"
                    handleSubmit={handleSubmit}
                >
                </BookingForm>
            </>
        )
            : (
                <>Loading</>
            )
    );
}
