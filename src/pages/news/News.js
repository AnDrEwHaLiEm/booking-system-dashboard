import NewsCard from "../../components/NewsCard";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import newsImage from "../../assets/news.jpg";
import {authorizedAPIs} from '../../API/axiosSetup'
import React, { useState , useEffect } from 'react';


export default function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {
 
     authorizedAPIs.get('/news/showMany/100')
    .then ((res) => {
      setNews(res.data.resualt)
      // console.log({res});
    
    })
    .catch((err) => {
        console.log(err.message);
      });
  
}, [])
  
  
  return (
    <>
      <Typography gutterBottom variant="h6" component="div" align="center">
        News
      </Typography>
      <Button variant="contained" component={Link} to="/news/new">
        add news
      </Button>
      
       <div
        style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
      >
        {news.map((props) => {
          props.image=newsImage;
          return (
            <Grid key={props.id}>
              <NewsCard {...props} />
            </Grid>
          );
        })}
      </div> 
    </>
  );
}
