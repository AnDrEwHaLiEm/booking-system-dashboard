import { useParams } from "react-router-dom";
import Profile from "../../components/articles/Profile";
import { useState, useEffect } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import { useDispatch } from "react-redux";
import { showAlert } from "../../Redux/actions/viewAlert";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function OnePartner() {
  const { id } = useParams();
  const [onePartner, setOnePartner] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        setOnePartner(res.data.result);
      })
      .catch((err) => {
        dispatch(showAlert(err.message, "error"));
        console.log(err.message);
      });
  }, [id]);


  return onePartner ? (

    <Profile {...onePartner} />

  ) :
    <CircularIndeterminate />
    ;
}
