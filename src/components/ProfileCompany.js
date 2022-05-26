import React from "react";
import { Link } from "react-router-dom";

// material components
import {
    CardHeader,
    Divider,
    Card,
    Stack,
    CardContent,
    Button,
    Avatar,
    Typography,
} from "@mui/material";

import { useState } from "react";

function ProfileCompany({
    companyName,
    address,
    email,
    phoneNumber,
    serves,
    admin,
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
                <Typography variant="body2">admin : </Typography>
                <Stack direction="row">
                    {admin.map(({ firstName, lastName, avatar }) => (
                        <CardHeader
                            key={firstName + avatar}
                            avatar={
                                <Avatar alt={firstName + " " + lastName} src={avatar}>
                                    {" "}
                                    {firstName}{" "}{lastName}
                                </Avatar>
                            }
                            title={firstName + " " + lastName}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ProfileCompany;
