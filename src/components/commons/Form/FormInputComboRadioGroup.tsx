import * as React from 'react';
import FormInput from './FormInput';
import { FormControlLabel, Radio, RadioGroup,TextFieldProps} from '@mui/material';
import { TPropsFormComboRadioGroup } from '../../../types/form.types';

type Props = TextFieldProps & {
    name: string;
    label: string;
    defaultValue?:string;
    options: Array<TPropsFormComboRadioGroup> | [];
    combo?:React.ReactNode;
    noMapLanguage?:boolean;
}


const FormInputComboRadioGroup:React.FC<Props> = (props) => {
    const [value, setValue] = React.useState<string|null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value as never === value){
            setValue(null)
        }else{
           setValue((event.target as HTMLInputElement).value as never); 
        }
        
      };

    return (
        <FormInput 
            name={props.name}
            label={props.label}
            width={'100%'}
            edit={true}
            type="text"
            render={
             <RadioGroup
                row
                name={'abrasive'}
                onChange={handleChange}
                value={value}
                >
                {!!props.options.length && props.options.map((option:TPropsFormComboRadioGroup) => (
                    <FormControlLabel 
                        slotProps={{
                            typography: {variant:'caption'}
                        }}
                        value={props.value}
                        control={<Radio sx={{py:0}}  />} 
                        label={option.name}/>
                    ))}
                {props.combo}
             </RadioGroup>
        }
    />
    )
}

export default FormInputComboRadioGroup;