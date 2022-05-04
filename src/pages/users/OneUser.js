import { useParams } from "react-router-dom";
import Profile from "../../components/articles/Profile";
import { useState, useEffect } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";

export default function OneUser() {
  const { id } = useParams();
  const [oneUser, setOneUser] = useState();

  useEffect(() => {
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        console.log(res.data.result);
        setOneUser(res.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);


  return oneUser ? (

    <Profile {...oneUser} />

  ) :
    <>Loading...</>
    ;
}
