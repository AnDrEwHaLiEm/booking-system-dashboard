import TrainForm from "../../components/TrainForm";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import imageimage from "../../assets/news.jpg";
import { authorizedAPIs } from "../../API/axiosSetup";
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


export default function EditNewsForm() {
  const { id } = useParams();
  const [values, setValues] = useState();
  const [inputsData, setInputsData] = useState([...inputs]);
  const dispatch = useDispatch();

  useEffect(() => {
    authorizedAPIs
      .get(`/news/showOne/${id}`)
      .then((res) => {
    //  console.log({res});
        setValues(res.data.selectedNews);
        inputs.forEach(
          (item) => (item.initialValue = res.data.selectedNews[item.id])
        );
        setInputsData([...inputs]);
        console.log(inputsData);

      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleUpdate = async (values , { resetForm }) => {
    const { title, description, caption, image } = values;
    console.log(values);
    await authorizedAPIs
      .put("/news/edit", {
        _id: id,
        title,
        description,
        caption,
        image,
      })
      .then((res) => {
        console.log(res);
        dispatch(showAlert("this news is updated successfully", "success"));
        // resetForm();

      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  

  return  (
      <TrainForm
        handleSubmit={handleUpdate}
        inputsProps={inputsData}
        title="Edit News "
        submitLabel="Edit news"
      />
   
  );
}
