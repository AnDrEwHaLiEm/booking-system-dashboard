import React from "react";

// material components
import {
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function NewsCard({
  fullWidth,
  noOptions,
  image,
  title,
  caption,
  postDate,
  _id,
}) {
  const postDateInString = new Date(postDate);
  const Component = noOptions ? Card : Link;
  return (
    <Card
      style={{
        maxWidth: fullWidth ? "unset" : 320,
        margin: 30,
        textDecoration: "none",
      }}
      component={Component}
      to={"/news/" + _id}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="100"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{caption}</Typography>
      </CardContent>

      {!noOptions && (
        <CardHeader
          subheader={
            "post date : " +
            postDateInString.toDateString() 
          }
        />
      )}
    </Card>
  );
}

export default NewsCard;
