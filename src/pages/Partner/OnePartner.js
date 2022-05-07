import { useParams } from "react-router-dom";
import Profile from "../../components/articles/Profile";
import { useState, useEffect } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";

export default function OnePartner() {
  const { id } = useParams();
  const [onePartner, setOnePartner] = useState();

  useEffect(() => {
    authorizedAPIs
      .get(`/user/showOne/${id}`)
      .then((res) => {
        setOnePartner(res.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);


  return onePartner ? (

    <Profile {...onePartner} />

  ) :
    <>Loading...</>
    ;
}
