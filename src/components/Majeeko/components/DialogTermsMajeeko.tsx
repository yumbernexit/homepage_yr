import { CancelOutlined } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Link, List, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useTranslation, Trans } from 'react-i18next';

type Props = {
    open:boolean;
    type:'terms'|'cookies'|'privacy' | null;
    onClose:React.Dispatch<React.SetStateAction<boolean>>;
} 

const DialogTermsMajeeko:React.FC<Props> = (props) => {
    const {t} = useTranslation()
    const theme = useTheme()
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

    return(
    <Dialog open={props.open} fullScreen={fullscreen} > 
        <DialogTitle display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant='body1' color="primary">
                { !!props.type && t(`majeeko:modals.${props.type}`)}
            </Typography>
            
            <Stack flexGrow={0}>
                <IconButton sx={{p:0}} onClick={()=> props.onClose(false)}>
                    <CancelOutlined />
                </IconButton>
            </Stack>    
        </DialogTitle>
        <DialogContent>
            <Box sx={{width:'500px'}}>
                <Trans 
                
                defaults={`majeeko:modals.${props.type}_body`}
                components={{
                    title: <Typography variant='h6' color='primary'></Typography>,
                    h2: <Typography variant='body1' sx={{my:1}}></Typography>,
                    h4: <Typography variant='body2' sx={{my:1}}></Typography>,
                    h3: <Typography variant='body1' color='textDisabled' sx={{my:1}}></Typography>,
                    p:<Typography variant='body1' color="textDisabled" sx={{lineHeight:1}}></Typography>,
                    strong: <b></b>,
                    ul: <List sx={{ml:2}}></List>,
                    ol: <List sx={{ml:2}}></List>,
                    li: <ListItemText  primaryTypographyProps={{ component:'span', color:'textDisabled'}}  ></ListItemText>,
                    a: <Link color='textSecondary'></Link>
                }}
                />
                
            </Box>
        </DialogContent>
    </Dialog>)
}

export default DialogTermsMajeeko;