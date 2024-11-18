import { createTheme } from '@mui/material';
import palette from './palette';


export const style = createTheme({
    ...palette,
    components:{
        MuiContainer:{
            styleOverrides: {
                root: {
                    paddingLeft:'0 !important',
                    paddingRight:'0 !important'
                }
            }
        },
        MuiInputLabel:{
            styleOverrides: {
                root: {
                    transform: 'translate(0px, -16px) scale(0.7) !important'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                     padding:'8px'
                }
            }
        },
        MuiRadio: {
            styleOverrides: {
                root:{
                    padding:'0px 4px 0px 0px'
                }
            }
        },
        MuiStepLabel: {
            styleOverrides: {
                root: {
                    minWidth:'120px'
                }
            }
        },
        MuiListItemText:{
            styleOverrides:{
                primary: {
                    lineHeight:1,
                    fontSize:'0.9rem'
                },
                root: {
                    lineHeight:1,
                }
            }
        }
    }
})