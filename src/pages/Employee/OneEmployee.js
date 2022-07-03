import { useParams } from "react-router-dom";
import Profile from '../../components/articles/Profile'
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import CircularIndeterminate from "../../components/CircularIndeterminate";


export default function OneEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    authorizedAPIs
      .get(`/employee/showOne/${id}`)
      .then((res) => {
        let employeeData = res.data.result;
        const { avatar } = employeeData; 
        employeeData.avatar = process.env.REACT_APP_MY_BACKEND_HOST + process.env.REACT_APP_EMPLOYEE_AVATAR_PATH + avatar;
        setEmployee(res.data.result);
      })

  }, []);

  return (employee ?
    <Profile {...employee} />
    : <CircularIndeterminate />
  );
}
