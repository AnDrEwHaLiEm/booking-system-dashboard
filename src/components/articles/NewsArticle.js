import {
  Avatar,
  Button,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paragraph from "./Paragraph";
import { Link } from "react-router-dom";

const NewsArticle = ({
  title,
  caption,
  description,
  image,
  postDate,
  postedBy,
  editedBy,
  _id ,
  handleDelete,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingX: 4,
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack justifyContent="end" direction="row" spacing={2}>
          <Button
            onClick={handleDelete}
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            component={Link}
            to={"/news/edit/" + _id}
            color="primary"
            variant="contained"
            endIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Stack>

        <img width="200" alt="news image" src={image} />
        <Typography>
          {" "}
          Post date: {new Date(postDate).toDateString()} 
        </Typography>

        <Typography variant="h5">Title: {title}</Typography>
        {/* paragraphs like caption and description it contains title and text of the paragraph */}
        <Paragraph paragraphTitle="Caption" paragraphText={caption} />
        <Paragraph paragraphTitle="Description" paragraphText={description} />
        {/* created by section it consistes of avatar, employee name, and creating date which is the same as post date */}
        <Typography variant="h6">posted By: </Typography>
        <CardHeader
          avatar={
            <Avatar alt={postedBy.firstName} src={postedBy.personalPicture}>
              {postedBy.firstName[0]}
            </Avatar>
          }
          title={postedBy.firstName}
          subheader={new Date(postDate).toDateString()}
        />
        {/* edited by section it consistes of avatar, employee name, and editing date */}
        <Typography variant="h6">Edited By: </Typography>
        <Stack direction="row">
          {editedBy.map(({ employeeName, employeeId, avatar }) => (
            <CardHeader
              key={employeeId}
              avatar={
                <Avatar alt={employeeName} src={avatar}>
                  {" "}
                  {employeeName[0]}{" "}
                </Avatar>
              }
              title={employeeName}
              subheader={new Date(postDate).toDateString()}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default NewsArticle;
