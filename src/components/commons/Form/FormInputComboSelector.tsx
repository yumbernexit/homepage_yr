import  * as React from 'react';
import FormInput from './FormInput';
import { Box, Grid2 as Grid, IconButton, Paper, Stack, TextField } from '@mui/material';
import { RemoveCircleOutline } from '@mui/icons-material';
import FormInputSelector from './FormInputSelector';
import { TPropsFormInputSelector } from '../../../types/form.types';
import palette from '../../../styles/palette';

type Props = {
    name: string;
    width: string | number; 
    label: string;
    options: Array<TPropsFormInputSelector> | null;
    children?: React.ReactNode;
    widthElements:number; 
    labelFirst: string;
    onState: React.Dispatch<React.SetStateAction<any>>;
}

const FormInputComboSelector:React.FC<Props> = (props) => {
    const [state, setState] = React.useState<any[] | null>(null);
    

    const handleAdds = (value:string) => {
        if(!state && !!value){ 
            setState([props.options?.find(e => e.valueId === +value as never)])
        }else{
           setState([...state as never, props.options?.find(e => e.valueId === +value as never) ]) 
        }  
    }

    const removeItem = (value:string) => {
        if(!state) return null
        let newState = state.filter(e => e !== value )
        setState(newState)
    }

    React.useEffect(()=> {
        if(!!state){
            props.onState(state)
        }
    },[state])

    return (
        <FormInput 
            {...props}
            label={props.label}
            name={props.name}
            width={props.width}
            edit={true}
            type="text"
            render={
                <Paper elevation={0} sx={{p:1, border:'1px solid #C1C1C1',}}>
                    <Stack width={'100%'} rowGap={0.5}>
                        {  
                        !!state && state.map((item) => (
                            <Paper elevation={0} sx={{border:`1px solid ${palette.disabled.main}`, display:'inline-flex',pb:1}}>
                                <Grid container display={'flex'} wrap='wrap' columns={12} sx={{mt:4,px:2}} columnSpacing={1}>
                                    <Grid columns={props.widthElements}>
                                        <FormInput
                                            name={item}
                                            width={'100%'}
                                            label={props.labelFirst}
                                            edit={true}
                                            type="text"
                                            render={<TextField value={item.name.IT.value} />}
                                        />
                                    </Grid>
                                    {props.children}
                                </Grid>
                                <Box sx={{borderLeft:`1px solid ${palette.disabled}`, padding:'0px 5px', display:'flex', justifyContent:'center'}}>
                                    <IconButton sx={{p:0}} onClick={() => removeItem(item)}>
                                        <RemoveCircleOutline color="primary" />
                                    </IconButton>
                                </Box>
                            </Paper>
                            )) 
                            
                        }
                        <FormInputSelector 
                            disabled={!props.options?.length || !props.options}
                            width={'100%'}
                            itemSelector={handleAdds}
                            options={props.options}
                        /> 
                    </Stack>
                </Paper>
            }
        />
    )
}

export default FormInputComboSelector;