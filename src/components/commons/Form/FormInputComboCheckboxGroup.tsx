import * as React from 'react';
import FormInput from './FormInput';
import {  Checkbox, FormControlLabel, FormGroup, TextFieldProps, Grid2, CheckboxProps } from '@mui/material';



type PropsValues =  {
    label:string;
    value: string;
    name?:string;
}

export type PropsStateGroupCheckbox = {
    [key in PropsValues['label']]: boolean
}

type Props = CheckboxProps & {
    name: string;
    label?: string;
    defaultValue:PropsStateGroupCheckbox | null;
    options: PropsValues[] | null;
    combo?:React.ReactNode;
}



const FormInputComboCheckboxGroup:React.FC<Props> = (props) => {
    const [state, setState] = React.useState<PropsStateGroupCheckbox|null>(null);

    React.useEffect(()=>{
        if(!!props.defaultValue){
            setState(props.defaultValue)
        }
    },[props.defaultValue])

    return (
        <FormInput 
            name='combo'
            label={props.label}
            width={'100%'}
            render={
                <Grid2 container spacing={1}>
                    <Grid2 >
                        <FormGroup
                                row
                                >
                                {!!props.options && props.options.map((value:PropsValues) => (
                                    <FormControlLabel 
                                        name={value.name}
                                        label={value.label}
                                        slotProps={{
                                            typography:{variant:'caption'}
                                        }} 
                                        control={<Checkbox 
                                                name={value.value} 
                                                checked={!!state && state[value.value]} 
                                                sx={{py:0}}  
                                                onChange={props.onChange} />} />
                                ))}
                                
                            
                        </FormGroup>
                    </Grid2>
                    <Grid2 size={4}>
                        {props.combo}
                    </Grid2>
                    
            </Grid2>
        }
    />
    )
}

export default FormInputComboCheckboxGroup;