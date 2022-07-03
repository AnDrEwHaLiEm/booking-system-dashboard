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
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#BB3B62',
  borderColor: '#BB3B62',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#BB3B62',
    borderColor: '#BB3B62',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#BB3B62',
    borderColor: '#BB3B62',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[700]),
  backgroundColor: pink[700],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));

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
          <ColorButton
            onClick={handleDelete}
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </ColorButton>
          <ColorButton
            component={Link}
            to={"/news/edit/" + _id}
            color="primary"
            variant="contained"
            endIcon={<EditIcon />}
          >
            Edit
          </ColorButton>
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
