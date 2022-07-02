import React from "react";

// material components
import {
    CardHeader,
    Divider,
    Card,
    CardContent,
    Typography,
} from "@mui/material";


function ProfileCompany({
    companyName,
    address,
    email,
    phoneNumber,
    serves
}) {
    return (
        <Card style={{ margin: "auto", maxWidth: 400, "*": { padding: 0 } }}>
            <CardHeader
                title={companyName}
                email={email}
            />
            <CardContent>
                <Typography variant="body2">{"phone: " + phoneNumber}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">{"email: " + email}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">{"address: " + address}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">{"serves : " + serves}</Typography>
                <Divider sx={{ marginY: 2 }} />
            </CardContent>
        </Card>
    );
}

export default ProfileCompany;
