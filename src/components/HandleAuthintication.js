import React, { useEffect, useState } from "react";
import PagesRoutes from "../pages/index";
import Cookies from "js-cookie";
import AutinticationRoutes from '../pages/'
import CircularIndeterminate from "./CircularIndeterminate";

// const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME);

const Handleauthintication = () => {
  // const [isLogged, setIslogged] = useState(false);
  // const [isloading, setIsloading] = useState(true);

  // const handleLogOut = () => Cookies.remove(process.env.REACT_APP_TOKEN_NAME);

  // useEffect(() => {
  //   authorizedAPIs
  //     .post(
  //       "/authintication/authinticate",
  //       JSON.stringify({
  //         token,
  //       })
  //     )
  //     .then(() => {
  //       setIslogged(true);
  //       setIsloading(false);
  //     })
  //     .catch(() => {
  //       setIslogged(false);
  //       setIsloading(false);
  //       handleLogOut();
  //     });
  // }, []);

  // return isloading ? (
  //   <CircularIndeterminate />
  // ) : isLogged ? (
  //   <PagesRoutes />
  // ) : (
  //   <AutinticationRoutes />
  // );

  return(
    <PagesRoutes />
  )
};

export default Handleauthintication;
