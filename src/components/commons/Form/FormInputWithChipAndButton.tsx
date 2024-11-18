import { Box, Chip, IconButton, InputAdornment, Paper, TextField as TextFieldMui , TextFieldProps } from '@mui/material';
import * as React from 'react';
import palette from '../../../styles/palette';



type Props = TextFieldProps & {
    button: React.ReactNode;
    defaultValue?: null | string;
    startIconAddorment?: React.ReactNode;
    chip?: string
}


const FormInputWithChipAndButton:React.FC<Props> = (props) => {
    return <Paper  elevation={0} sx={{border: `1px solid ${palette.disabled}`, width:'100%', display:'flex'}} >
        <TextFieldMui
        {...props}
        sx={{ border: 'none', '.MuiOutlinedInput-notchedOutline':{border:'none'}, width:'calc(100% - 30px)' }}
        variant='outlined'  
        InputProps={{
            startAdornment:<InputAdornment position='start'>
                <IconButton sx={{px:1}}>
                    {props.startIconAddorment}
                </IconButton>
            </InputAdornment>,
            endAdornment:<InputAdornment position="end" sx={{mr:2}}>
                
                <Chip sx={{borderRadius:2.5, height: 20}} label={props.chip}  />  
                
                
            </InputAdornment>
        }}     
        /> 
        <Box sx={{                    
            borderLeft:'1px solid #C1C1C1',
            height: '100%',
            //padding: '0px 5px',
            right: 0,
            textAlign: 'center',
            display: 'inline-grid',
            width:30
            // background: '#c1c1c152',
            // ':hover':{
            //     background: '#C1C1C1',
            // }
            }}
        alignItems='center'>
            {props.button}
        </Box>
        </Paper>
}

export default FormInputWithChipAndButton;