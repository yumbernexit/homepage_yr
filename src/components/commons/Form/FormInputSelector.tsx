import { KeyboardArrowDown } from '@mui/icons-material';
import { MenuItem, Paper, TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import palette from '../../../styles/palette';
import { TPropsFormInputSelector } from '../../../types/form.types';




type Props =  TextFieldProps & {
    width:string | number;
    options: Array<TPropsFormInputSelector> | null;
    noMapLanguage?: boolean;
    itemSelector: React.Dispatch<React.SetStateAction<any>>
}

const FormInputSelector:React.FC<Props> = (props) => {
    const [value, setValue] = React.useState<string|null>(null)
    
    React.useEffect(() => {
        handleAdd();
    }, [value])

    const handleAdd = () => {
        if(!!value){
            setValue(null)
            props.itemSelector(value)
        }
    }

    return (
        <Paper elevation={0} sx={{display:'flex', flexDirection:'row', border:`1px solid ${palette.disabled}`}}>
            <TextField  
                SelectProps={{
                    IconComponent:KeyboardArrowDown
                }}
                disabled={props.disabled}
                value={value}
                onChange={(e) => setValue(e.target.value) }
                sx={{
                    width:'100%',
                    border:0, 
                    '.MuiOutlinedInput-notchedOutline':{border:0}}} 
                select>
                {!!props.options && 
                        props.options.map((item:TPropsFormInputSelector,index:number) => (
                        <MenuItem key={item.valueId+'_'+index} value={item.valueId}>{
                           //!props.noMapLanguage ? item.name[USECASE.LANGUAGE]?.value as never : item.name as string
                           item.name
                            }</MenuItem>
                    ))
                }
            </TextField>
        </Paper>)

}

export default FormInputSelector;