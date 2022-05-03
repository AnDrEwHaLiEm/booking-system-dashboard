import TrainForm from "../../components/TrainForm";
import * as Yup from "yup";
import {authorizedAPIs} from '../../API/axiosSetup'
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

const inputs = [
  {
    id: "title",
    validation: Yup.string().min(3).max(30).required("title is required"),
    initialValue: "",
    label: "title ",
    type: "text",
  },
  {
    id: "description",
    validation: Yup.string().min(3).max(30).required("description is required"),
    initialValue: "",
    label: "description ",
    type: "text",
  },
  {
    id: "caption",
    validation: Yup.string().min(3).max(30).required("caption is required"),
    initialValue: "",
    label: "caption ",
    type: "text",
  },
  {
    id: "image",
    type: "file",
  },

];


export default function NewsForm() {

  const dispatch = useDispatch();

 const handleSubmit = async (values , { resetForm }) => {
    const { title, description, caption, image } = values;
    console.log(values);
    await authorizedAPIs.post('/news/new' , {title, description, caption, image})
    .then ((res) => {
      console.log({res});
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
        title="Add News "
        submitLabel="create news"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
