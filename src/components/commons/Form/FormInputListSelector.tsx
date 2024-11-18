import  * as React from 'react';
import FormInput from './FormInput';
import { Paper, Stack } from '@mui/material';
import FormInputWithButton from './FormInputWithButton';
import { RemoveCircleOutline } from '@mui/icons-material';
import FormInputSelector from './FormInputSelector';
import { TPropsFormInputSelector } from '../../../types/form.types';




type Props =  {
    name: string;
    width: string | number; 
    label: string;
    onState?:Array<TPropsFormInputSelector> | null;
    options: Array<TPropsFormInputSelector> | null;
    onList: React.Dispatch<React.SetStateAction<Array<TPropsFormInputSelector>>>;
    onAdd: React.Dispatch<React.SetStateAction<TPropsFormInputSelector>>;
    onRemove: React.Dispatch<React.SetStateAction<number>>;
}

const FormInputListSelector:React.FC<Props> = (props) => {
    const [options, setOptions] = React.useState<Array<TPropsFormInputSelector>|null>(null);
    const [state, setState] = React.useState<Array<TPropsFormInputSelector> | null>(null);

    const handleAdds = (e:number) => {
        let data = !!options ? options.find(f => f.valueId === e as never) : null   
        props.onAdd(data as never) 
    }

    React.useEffect(()=>{
        props.onList(state as never)      
    },[state])


    React.useEffect(()=>{
        if(!options){
             setOptions(props.options)
        }
    },[options, props.options])

    React.useEffect(()=>{
        if(!!props.onState){
            setState(props.onState)
        }
    },[props.onState])

    return (
        <FormInput 
            label={props.label}
            name={props.name}
            width={props.width}
            render={
                <Paper elevation={0} sx={{p:1, border:'1px solid #C1C1C1'}}>
                    <Stack width={'100%'} rowGap={0.5}>
                        {  
                        !!state?.length  && state.map((item:TPropsFormInputSelector) => (
                            <FormInputWithButton 
                                defaultValue={item.name} 
                                onClick={()=> props.onRemove(item.valueId as never)}
                                iconButton={<RemoveCircleOutline color="primary" />} 
                            />
                            ))
                        } 
                        <FormInputSelector 
                            disabled={!props.options || options?.length === 0 || state?.length === options?.length}
                            width={'100%'}
                            itemSelector={handleAdds}
                            options={options?.filter(e => !state?.includes(e)) as never}
                        />
                    </Stack>
                </Paper>
            }
        />
    )
}

export default FormInputListSelector;