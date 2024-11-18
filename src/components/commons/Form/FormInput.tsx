import { FormControl, Grid2, GridBaseProps, GridSize, InputLabel, TextField , Grid2Props} from '@mui/material';
import * as React from 'react';

type PropsForm = Grid2Props & {
    name?: string;
    defaultValue?: any;
    edit?: boolean;
    type?: 'text'|'number'|'email'|'combo';
    label?: string;
    width: string | number;
    render: React.ReactNode;
}

const FormInput:React.FC<PropsForm> = (props) => {
    const [value, setValue] = React.useState<null|string>(null)

    React.useEffect(()=>{
        if(!props.edit){
            setValue(props.defaultValue)
        }
    },[props.edit, props.defaultValue])
    
    return (
        <Grid2 size={props.size as never}>
            <FormControl sx={{width:props.width, position:'relative'}} >
                {!!props.label && 
                    <InputLabel shrink   size='small' sx={{maxWidth:'none', ml:props.type === 'combo' ? '-8px' : 0}} >{props.label}</InputLabel>}
                {/* {props.render ? 
                <TextField
                    name={props.name}
                    fullWidth
                    slotProps={{
                        inputLabel: {shrink: false},
                    }}
                    size="small"
                    type={props.type}
                    disabled={!props.edit}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                 */}
                {
                props.render
                }
            </FormControl>
    </Grid2>
    )
}

export default FormInput;