import { useParams } from "react-router-dom";
import TrainArticle from "../../components/articles/TrainArticle";
import { useState, useEffect } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";

export default function OneTrain() {
  const [oneTrain, setOneTrain] = useState();
  const { id } = useParams();

  useEffect(() => {
    authorizedAPIs
      .get(`/train/showOne/${id}`)
      .then((res) => {
        console.log({res});
        setOneTrain(res.data.getOneModel);
        //console.log(res.data.selectedTrain);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);


  return oneTrain? (
    
      <TrainArticle {...oneTrain} />
   
  ):
  <>Loading...</>
  ;
}
