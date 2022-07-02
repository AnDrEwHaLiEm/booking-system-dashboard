import React, { useEffect, useState } from "react";
import PagesRoutes from "../pages/index";
import Cookies from "js-cookie";
import Login from '../pages/logein/login in';
import CircularIndeterminate from "./CircularIndeterminate";
import { authorizedAPIs } from "../API/axiosSetup";
import { useDispatch } from "react-redux";
import { showAlert } from "../Redux/actions/viewAlert";

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME);

const Handleauthintication = () => {
  const [isLogged, setIslogged] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const dispatch = useDispatch()
  const handleLogOut = () => Cookies.remove(process.env.REACT_APP_TOKEN_NAME);
  const handelSubmit = async (data) => {
    await authorizedAPIs
      .post(
        "/authintication/login", data
      )
      .then((res) => {
        console.log(res);
        setIslogged(true);
        setIsloading(false);
        Cookies.set(process.env.REACT_APP_TOKEN_NAME, '123=' + res.data.token);
        window.location.reload();
      })
      .catch(() => {
        setIslogged(false);
        setIsloading(false);
        dispatch(showAlert("Email or password is invalid"))
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
