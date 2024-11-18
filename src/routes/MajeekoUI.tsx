import { Box, Container, Grid2, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import palette from '../styles/palette';


const MajeekoUI:React.FC = () => {
    return (
        <Box sx={{width:'100%',height:'100vh', p:0, background:palette.disabled.main, }}>
            <Container maxWidth={'md'} sx={{height:'80px',p:0}}>
            </Container>  
            <Outlet />     
        </Box> 
    )
}
export default MajeekoUI;