import {
  Avatar,
  Button,
  CardHeader,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


const TrainArticle = ({
  trainNumber,
  carsNumber,
  carsChairNumber,
  trainType,
  percentSpeed,
  percentCost,
  _id,
}) => {
    let carsnumber = [];
    let carschairnumber = [];
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
   { 
     <Paper elevation={3} sx={{ padding: 2}}>
        <Typography variant="h5" sx={{ margin: 2 }}>
          Train Number : {trainNumber}
        </Typography>
        <Divider />
        <Typography variant="h5" sx={{ margin: 2 }}>
          Train Type : {trainType}
        </Typography>
        <Divider />
        {/* //////////////////////////////////////////////// */}
        {carsNumber.map((car) => {
        carsnumber +=  car + " , "
        })}
        <Typography variant="h5" sx={{ margin: 2 }}>
          Cars Number : {carsnumber}
        </Typography>
        <Divider />
        {/* //////////////////////////////////////////// */}
        {carsChairNumber.map((chair) => {
        carschairnumber +=  chair + " , "
        })}
        <Typography variant="h5" sx={{ margin: 2 }}>
        Cars Chair Number : {carschairnumber}
        </Typography>
        <Divider />
        {/* /////////////////////////////////////// */}
        <Typography variant="h5" sx={{ margin: 2 }}>
          Percent Speed : {percentSpeed}
        </Typography>
        <Divider />
        <Typography variant="h5" sx={{ margin: 2 }}>
          Percent Cost : {percentCost}
        </Typography>
      </Paper>}
    </Box>
  );
};

export default TrainArticle;
