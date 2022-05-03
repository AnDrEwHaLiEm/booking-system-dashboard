import { Divider, Paper,  Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Paragraph from "./Paragraph";


const ContactArticle = ({
    name ,
    phone ,
    email,
    hear_about_us,
    message
}) => {
    return (
        <Box
            sx={{
                width: 500,
                margin: "auto",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingX: 4,
                '& > :not(style)': {
                    m: 1,
                },
            }}
        >
            <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h6'>Name: {name}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant='h6'>Phone: {phone}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant='h6'>Email: {email}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant='h6'> heared about us from: {hear_about_us}</Typography>
            <Paragraph paragraphTitle="Messege" paragraphText={message}/>
           
            

            </Paper>
        </Box>
    );
}

export default ContactArticle;
