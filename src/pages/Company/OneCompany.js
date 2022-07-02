import { useParams } from "react-router-dom";
import ProfileCompany from '../../components/ProfileCompany'
import { useEffect, useState } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import CircularIndeterminate from "../../components/CircularIndeterminate";




export default function OneCompany() {
    const { id } = useParams();
    const [company, setCompany] = useState([]);
    const [value, setValue] = useState(false)
    useEffect(() => {
        authorizedAPIs
            .get(`/company/showOne/${id}`)
            .then((res) => {
                console.log(res);
                setCompany(res.data.result);
                setValue(true)
            })

    }, []);

    return (
        value ?
            <ProfileCompany {...company} />
            : <CircularIndeterminate />

    );
}
