import { alpha, Box, IconButton, InputAdornment, TextField as TextFieldMui , TextFieldProps } from '@mui/material';
import * as React from 'react';


type Props = TextFieldProps & {
    iconButton: React.ReactNode;
    defaultValue: null | string;
}


const FormInputWithButton:React.FC<Props> = (props) => {
    return <TextFieldMui
        disabled
        value={props.defaultValue}
        variant='outlined'
        InputProps={{
            inputProps:{
                style: {
                    background:alpha("#e3e305", 0.1),
                    marginRight:'12px',
                    color:'#000'
                },
            },
            endAdornment: <InputAdornment position='end' onClick={props.onClick}>
                <Box sx={{
                        overflow: 'hidden',
                        borderLeft:'1px solid #C1C1C1',
                        position: 'absolute',
                        top:0,
                        verticalAlign: 'middle',
                        height: '100%',
                        padding: '0px 5px',
                        right: 0,
                        textAlign: 'center',
                        display: 'inline-grid',
                        // background: '#c1c1c152',
                        // ':hover':{
                        //     background: '#C1C1C1',
                        // }
                    }}
                    alignItems='center'>
                    <IconButton sx={{p:0}} disabled={props.disabled}>
                        {props.iconButton}
                    </IconButton>
                </Box>
            </InputAdornment>
        }}
        />
}

export default FormInputWithButton;