import * as React from 'react';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import {IconButton, InputAdornment, MenuItem, TextField, TextFieldProps } from '@mui/material';
import FormInput from './FormInput';
import { TPropsFormInputSelect } from '../../../types/form.types';



type Props = TextFieldProps & {
    options: Array<TPropsFormInputSelect> | null;
    width: string | number;
    defaultValue?: string| number | null;
    noMaplanguage?: boolean;
    onCancel?:boolean | null;
    onRemove:React.Dispatch<React.SetStateAction<number|null>>;
}

const   FormInputSelect:React.FC<Props> = (props) => {



    React.useEffect(()=>{},[props])

    return (
        <FormInput
            name={`form-select-`+props.name}
            label={props.label as never}
            width={props.width}
            render={
                <TextField 
                    name={props.name}
                    onChange={props.onChange}
                    select
                    value={props.value}
                    slotProps={{
                        select: {
                           IconComponent:KeyboardArrowDown,
                            disabled: props.disabled || !!(props.value && props.onCancel) , 
                        },
                        input: {
                            endAdornment:( !!props.onCancel && !!props.value ) ? <InputAdornment position='end' sx={{mr:2}} >
                                            <IconButton sx={{p:0}} onClick={()=> props.onRemove(null) }>
                                            <Close  sx={{fontSize:'1rem'}} color="primary" />  
                                            </IconButton>
                                        </InputAdornment> : <></>
                        }
                    }}
                >
                { 
               !!props.options && props.options.map((e:TPropsFormInputSelect, i:number) => 
                <MenuItem key={`option_${props.name}_${i}`} value={e.valueId} >
                    {/* { !props.noMaplanguage ?  e.name[USECASE.LANGUAGE]?.value as never : e.name as string} */}
                    {e.name}
                </MenuItem> )
                } 
                 </TextField>  
            }
        />
    ) 
}

export default FormInputSelect