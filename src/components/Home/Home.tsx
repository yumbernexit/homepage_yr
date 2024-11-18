import * as React from 'react';
import { useTranslation,  } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid2, Typography } from '@mui/material';

const HomeUI:React.FC = () => {
  const {t , i18n } = useTranslation();
  const location = useNavigate()
  return (
    <Container maxWidth="lg">
      <Typography>{t('translation:title')} { i18n.language }</Typography>
      <Grid2 display={'flex'} gap={1} >
        <Button onClick={()=> location('majeeko')} >Majeeko</Button>
        <Button onClick={()=> location('majeeko/payment')}>Majeeko Payment</Button>
        
      </Grid2>
    </Container>
  );
}

export default HomeUI;
