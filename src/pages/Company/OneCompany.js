import { useParams } from "react-router-dom";
import ProfileCompany from '../../components/ProfileCompany'
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";




export default function OneCompany() {
    const { id } = useParams();
    const [company, setCompany] = useState({});

    useEffect(() => {
        authorizedAPIs
            .get(`/company/showOne/${id}`)
            .then((res) => {
                console.log(res);
                setCompany(res.data.result);
            })

    }, []);

    return (

        <ProfileCompany {...company} />

    );
}
