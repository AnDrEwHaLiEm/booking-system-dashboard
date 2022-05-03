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
  personalPicture,
  firstName,
  lastName,
  email,
  phone_number,
  nationalIdNumber,
  authority,
  age,
  jobTitle,
  gender,
  address
}) {
 

  return (
    <Card style={{ margin: "auto", maxWidth: 400, "*": { padding: 0 } }}>
      <CardHeader
       avatar={
        <Avatar
          src={personalPicture}
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
        <Typography variant="body2">{"phone: " + phone_number}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"nationalIdNumber: " + nationalIdNumber}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"authority: " + authority}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"age: " + age}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"gender: " + gender}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"address: " + address}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2">{"job Title: " + jobTitle}</Typography>
       
        
     
          
      </CardContent>
    </Card>
  );
}

export default Profile;
