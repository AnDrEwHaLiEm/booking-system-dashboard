import { Divider, Typography } from '@mui/material';
import React from 'react';

const Paragraph = ({ paragraphTitle, paragraphText }) => {
    return (
        <>
            <Divider sx={{ padding: 1 }} />
            <Typography variant='h6'>{paragraphTitle} </Typography>
            <Typography variant='body1' sx={{ paddingLeft: 2 , width: 500}} >{paragraphText} </Typography>
        </>
    );
}

export default Paragraph;
