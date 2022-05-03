import React from "react";
import { Link } from "react-router-dom";
import avatarImage from "../../assets/avatar.jpg";

// material components
import {
  CardHeader,
  Divider,
  Card,
  Avatar,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

import { useState } from "react";

function Profile({
  avatar,
  firstName,
  lastName,
  email,
  phoneNumber,
  nationalId,
  age,
  gender
}) {


  return (
    <Card style={{ margin: "auto", maxWidth: 400, "*": { padding: 0 } }}>
      <CardHeader
        avatar={
          <Avatar
            src={avatar}
            sx={{ width: 56, height: 56 }}
            aria-label="recipe"
          >
            <img style={{ width: "inherit" }} src={avatarImage} />
          </Avatar>
        }
        title={firstName + " " + lastName}
        email={email}
      />
      <CardContent>
        <Typography variant="body2">{"phone: " + phoneNumber}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"email: " + email}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"nationalIdNumber: " + nationalId}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"age: " + age}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"gender: " + gender}</Typography>
      </CardContent>
    </Card>
  );
}

export default Profile;
