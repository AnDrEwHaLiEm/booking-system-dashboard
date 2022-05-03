import TrainForm from "../../components/TrainForm";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import imageCover from "../../assets/news.jpg";
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
    id: "carsNumber",
    validation: Yup.string()
      .min(0)
      .required("carsNumber is required"),
    initialValue: "",
    label: "carsNumber ",
    type: "text",
  },
  {
    id: "carsChairNumber",
    validation: Yup.string()
      .min(0)
      .required("carsChairNumber is required"),
    initialValue: "",
    label: "carsChairNumber ",
    type: "text",
  },
  {
    id: "trainType",
    validation: Yup.string().min(2).max(30).required("type is required"),
    initialValue: "",
    label: "type ",
    type: "text",
  },
  {
    id: "percentSpeed",
    validation: Yup.number()
      .min(0)
      .required("percentSpeed is required"),
    initialValue: "",
    label: "percent Speed ",
    type: "number",
  },
  {
    id: "percentCost",
    validation: Yup.number()
      .min(0)
      .required("percentCost is required"),
    initialValue: "",
    label: "percent Cost  ",
    type: "number",
  },
];

export default function EditNewsForm() {
  const { id } = useParams();
  const [values, setValues] = useState();
  const [inputsData, setInputsData] = useState([...inputs]);
  const dispatch = useDispatch();

  useEffect(() => {
    authorizedAPIs
      .get(`/train/showOne/${id}`)
      .then((res) => {
        console.log({res});
        setValues(res.data.getOneModel);
        inputs.forEach(
          (item) => (item.initialValue = res.data.getOneModel[item.id])
        );
        setInputsData(inputs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleUpdate = async (values, { resetForm }) => {
    const {
      trainNumber,
      carsNumber,
      carsChairNumber,
      trainType,
      percentSpeed,
      percentCost,
    } = values;
    console.log(values);
    await authorizedAPIs
      .put("/train/edit", {
        _id: id,
        trainNumber,
        carsNumber,
        carsChairNumber,
        trainType,
        percentSpeed,
        percentCost,
      })
      .then((res) => {
        console.log(res);
        dispatch(showAlert("this train is updated successfully", "success"));
        // resetForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return values ? (
    <>
      <TrainForm
        handleSubmit={handleUpdate}
        inputsProps={inputsData}
        title="Edit Train "
        submitLabel="Edit Train"
      />
    </>
  ) : (
    <> NOT FOUND</>
  );
}
