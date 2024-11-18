import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';

type Props = {
    loading: boolean;
}

const LoadingUI:React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
 
    React.useEffect(()=>{
        setOpen(props.loading)
    },[props.loading])

    return (<Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,  position:'absolute', backgroundColor:'#ffffff'}}
        open={open}
      >
        <CircularProgress color="info" />
      </Backdrop>)
}
export default LoadingUI;