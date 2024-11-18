import * as React from 'react';
import FormInput from './FormInput';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TPropsFormRadioGroup } from '../../../types/form.types';


type Props = {
    name: string;
    label: string;
    value: string| number | null;
    options:  TPropsFormRadioGroup[] | null;
    onSelected:React.Dispatch<React.SetStateAction<string>>;
    noMapLanguage?:boolean;
}


const FormInputRadioGroup:React.FC<Props> = (props) => {
    return (
        <FormInput 
            label={props.label}
            width={'100%'}
            edit={true}
            type="combo"
            render={
             <RadioGroup
                    row
                    name={props.name}
                    value={props.value}
                    >
                    {!!props.options && props.options.map((value: TPropsFormRadioGroup) => (
                        <FormControlLabel 
                        slotProps={{
                            typography: {variant:'caption'},
                        }} 
                        sx={{mr:3}}  
                        value={value.value} 
                        control={<Radio 
                            onChange={(e) => props.onSelected(e.target.value as never)}
                            sx={{py:0}}/>} label={  value.name as never} />
                    ))}
            </RadioGroup>
        }
    />
    )
}

export default FormInputRadioGroup;