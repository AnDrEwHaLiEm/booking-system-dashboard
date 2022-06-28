import React, { useEffect, useState } from "react";
import PagesRoutes from "../pages/index";
import Cookies from "js-cookie";
import Login from '../pages/logein/login in';
import CircularIndeterminate from "./CircularIndeterminate";
import { authorizedAPIs } from "../API/axiosSetup";

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME);

const Handleauthintication = () => {
  const [isLogged, setIslogged] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const handleLogOut = () => Cookies.remove(process.env.REACT_APP_TOKEN_NAME);
  const handelSubmit = async (data) => {
    console.log(data);
    await authorizedAPIs
      .post(
        "/authintication/login", data
      )
      .then((res) => {
        console.log(res);
        setIslogged(true);
        setIsloading(false);
        Cookies.set(process.env.REACT_APP_TOKEN_NAME, '123=' + res.data.token);
      })
      .catch(() => {
        setIslogged(false);
        setIsloading(false);
        handleLogOut();
      });
  }

  useEffect(() => {
    authorizedAPIs
      .post(
        "/authintication/authinticate",
        JSON.stringify({
          token,
        })
      )
      .then((res) => {
        console.log(res);
        setIslogged(true);
        setIsloading(false);
      })
      .catch(() => {
        setIslogged(false);
        setIsloading(false);
        handleLogOut();
      });
  }, []);

  return isloading ? (
    <CircularIndeterminate />
  ) : isLogged ? (
    <PagesRoutes />
  ) : (
    <Login handelSubmit={handelSubmit} />
  );

};

export default Handleauthintication;
