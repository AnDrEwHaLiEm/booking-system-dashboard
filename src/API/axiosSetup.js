import axios from "axios";
import Cookies from "js-cookie";

const authinticationAPIs = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}`,
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME);
console.log(token);
const authorizedAPIs = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}`,
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    authorization: token,
  },
});

const uploadImageAPIS = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}`,
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'multipart/form-data',
    authorization: token,
  },
})

export { authinticationAPIs, authorizedAPIs, uploadImageAPIS };
