import { useParams } from "react-router-dom";
import Profile from "../../components/articles/Profile";
import { useState, useEffect } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import CircularIndeterminate from "../../components/CircularIndeterminate";

export default function OneUser() {
  const { id } = useParams();
  const [oneUser, setOneUser] = useState();

  useEffect(() => {
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        let userData = res.data.result;
        const { avatar } = userData;
        userData.avatar = process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_USER_AVATAR_PATH + avatar;
        console.log(userData);
        setOneUser(userData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);


  return oneUser ? (

    <Profile {...oneUser} />

  ) :
    <CircularIndeterminate />
    ;
}
