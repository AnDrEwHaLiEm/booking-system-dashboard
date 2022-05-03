import TrainForm from "../../components/TrainForm";
import * as Yup from "yup";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";




const inputs = [
  {
    id: "trainNumber",
    validation: Yup.number().min(0).required("trainNumber is required"),
    initialValue: "",
    label: "Train Number ",
    type: "number",
    
  },
  {
    id: "trainType",
    validation: Yup.string().min(2).max(30).required("type is required"),
    initialValue: "",
    label: "Train Type ",
    type: "text",
  },
  {
    id: "percentSpeed",
    validation: Yup.number()
      .min(0)
      .max(30)
      .required("percentSpeed is required"),
    initialValue: "",
    label: "percent Speed ",
    type: "number",
  },
  {
    id: "percentCost",
    validation: Yup.number().min(0).max(30).required("percentCost is required"),
    initialValue: "",
    label: "percent Cost  ",
    type: "number",
  },
];

export default function NewsForm() {

  
  const dispatch = useDispatch();


  


  const handleSubmit = async (values, { resetForm }) => {
  
    console.log(values);
    await authorizedAPIs
      .post('/train/new"', values)
      .then((res) => {
        console.log({ res });
        dispatch(showAlert("this news is add successfully", "success"));
        resetForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <TrainForm
        inputsProps={inputs}
        title="Add train "
        submitLabel="create"
        handleSubmit={handleSubmit}
      >
      </TrainForm>
    </>
  );
}
