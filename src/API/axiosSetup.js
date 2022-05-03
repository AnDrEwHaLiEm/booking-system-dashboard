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

// const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME);

const authorizedAPIs = axios.create({
  baseURL: `${process.env.REACT_APP_MY_BACKEND_HOST}`,
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    authorization: `123=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjcxMzkxNTY4NmUwYzJkODkyOTFlOGYiLCJlbWFpbCI6ImRvbGFneWRvbGFneTExOTlAZ21haWwuY29tIiwiaWF0IjoxNjUxNTg3OTcwfQ.jmEsjTsGyAitwbEonc14IMqqhSv9XJgHug6WT5pBygs`,
  },
});

export { authinticationAPIs, authorizedAPIs };
