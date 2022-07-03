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
        let userData = res.data.result;
        const { avatar } = userData;
        userData.avatar = process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_USER_AVATAR_PATH + avatar;
        console.log(userData);
        setOnePartner(userData);
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
