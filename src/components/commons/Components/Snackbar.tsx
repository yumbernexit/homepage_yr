import { Snackbar as SnackbarMui, SnackbarProps, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Cancel, CheckCircleOutline, Info, Warning } from '@mui/icons-material';
import { TSnackbarContentTypes } from '../../../types/form.types';



type Props =  SnackbarProps & {
  type: TSnackbarContentTypes
}


const Snackbar:React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    
      const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    
      const handleExited = () => {
          setOpen(false);
      };


      React.useEffect(()=>{
        if(!!props.open){
            setOpen(props.open)
        }
      },[props.open])

    return (
      <React.Fragment>
        <SnackbarMui
              key={props.key}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              TransitionProps={{ onExited: handleExited }}
              message={
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                {props.type === 'success' && <CheckCircleOutline color='success' />}
                {props.type === 'error' &&  <Cancel color='error'/>}
                {props.type === 'info' && <Info color="info" />}
                {props.type === 'warning' && <Warning color="warning" />}
                <Typography variant='caption'>{props.message as string}</Typography>
                </Stack>
                }
              anchorOrigin={{vertical:'top', horizontal:'right'}}
                ContentProps={{
                    sx: {
                        background: 'white',
                        color:'#202020'
                    },    
                }}
                
            />
      </React.Fragment>
    );
  }

export default Snackbar