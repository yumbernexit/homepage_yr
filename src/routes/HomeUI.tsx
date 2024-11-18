import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';


const HomeContainerUI:React.FC = () => {
    return (
        <Container maxWidth={'lg'}>
            <Box sx={{height:'80px'}}>
                <Typography>headers Home</Typography>
            </Box>    
            <Outlet />     
        </Container> 
    )
}
export default HomeContainerUI;