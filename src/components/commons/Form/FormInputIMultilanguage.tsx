import * as React from 'react';
import FormInput from './FormInput';

import {  alpha,  Box, Button, Chip, Divider,  IconButton, InputAdornment,  InputBase,   Paper,  Stack,  Typography } from '@mui/material';

import FormInputSelector from './FormInputSelector';
import { ILanguages, TFormMultilanguageRecordOption } from '../../../types/form.types';
import palette from '../../../styles/palette';
import { useTranslation } from 'react-i18next';

const languages = ['IT','ES','EN','DE','FR'];

type PropsLanguage = 'IT'|'ES'|'EN'|'DE'|'FR';

const composeInitState = (lang:keyof ILanguages):TFormMultilanguageRecordOption => {
    let _state =  Object.assign({}, { [lang]: {
            translated: 5, 
            value: null
        }})
    return _state
}

type Props = {
    name: string;
    label: string;
    width: string | number;
    options: TFormMultilanguageRecordOption  | null;
    multiline?: boolean;
    callback: React.Dispatch<React.SetStateAction<any>>;
    onList?:React.Dispatch<React.SetStateAction<any>>
}


const FormInputMultiLanguage:React.FC<Props> = (props) => {
    const  {i18n} = useTranslation();
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [state, setState] = React.useState<TFormMultilanguageRecordOption|null>(null)
    
    const language  = 'IT'
    

    const keyInputLanguage = React.useMemo(()=>{ 
        if(!state) return;   
        let keysLanguages = Object.keys(state as never) 
        return keysLanguages.includes(language as never) ? language : keysLanguages[0] 
    },[language, state])


    const diferenceLanguage = React.useMemo(()=> {
         return state ? languages.filter((e) => !Object.keys(state).includes(e)) : []
    },[state])


    React.useEffect(()=>{
        if(!props.options && language){
            let _state = composeInitState(language as never)
            setState(_state)
        }else{
            setState(props.options as never) 
        }
       
    },[props.options, language])

    const handleChange = (lang:PropsLanguage, value: string) => {
        if(!state) return null
        let newState = {
            ...state,
            [lang]: {
                ...state[lang],
                value: value,
                translated:5
            }
        }
        setState(newState) 
        props.callback(newState)
    }    

    const addLangToState = (lang:ILanguages) => {
          let newvalue = composeInitState(lang as never) 
          setState({...state, ...newvalue})    
    }   
    

    return (
    <React.Fragment>
        <FormInput
            name={props.name}
            label={props.label}
            width={props.width}
            render={
            <React.Fragment>
                <Paper elevation={0} sx={{display:'flex', border:`1px solid ${palette.disabled}`}}>
                    <InputBase
                        fullWidth
                        value={state?.[language as ILanguages]?.value as never ?? ''}
                        size="small"
                        onChange={(e)=> handleChange(language as ILanguages, e.target.value)}
                        multiline={props.multiline}
                        sx={{  
                            minHeight:!!props.multiline ? 31 : 23,
                            padding: '1px 12px', 
                            border:'none', 
                            '&.MuiOutlinedInput-notchedOutline':{border:'none'}
                        }} 
                        endAdornment={<InputAdornment position='end'  >       
                              {!!state && state[language as ILanguages]?.translated === 0 ? <></> :
                                <Chip label={ 
                                    !!state && state[language as ILanguages]?.translated === 5 ? 'M'  : 'A'
                                    } 
                                    size='small'
                                    component={'small'}/> 
                                
                                }
                            </InputAdornment>
                        }
                    />            
                    <Box   
                        sx={{
                        width: 38,
                        background: alpha(palette.disabled.main, 0.6),
                        fontSize:10,
                        display:'inline-flex',
                        alignItems:'center',
                        justifyContent:'center',
                        borderLeft: '1px solid #C1C1C1'
                        }}>
                            <IconButton sx={{p:0}} onClick={()=> setOpenDialog(!openDialog)}>
                            <Typography variant="caption">{keyInputLanguage}</Typography>     
                            </IconButton> 
                    </Box> 
                </Paper>
                {!!openDialog && <Box width={'100%'} sx={{ top:37, position:'absolute', zIndex:1000}} >
                <Paper elevation={1}  sx={{padding:1, backgroundColor:"#e5eff8"}}  >
                    {  !!state && Object.keys(state).map((ele:string, i:number) => (
                        <Paper elevation={0} sx={{display:'flex', border:`1px solid ${palette.disabled}`,mt:0.5,}}>
                        <InputBase
                        fullWidth
                        size="small"
                        id={'input_'+i}
                        sx={{  
                            padding: '6px 12px', 
                            border:'none', 
                            '&.MuiOutlinedInput-notchedOutline':{border:'none'}
                        }}
                        multiline={props.multiline}
                        value={!!state && state[ele as PropsLanguage]?.value as never}
                        onChange={(e)=>  handleChange(ele as PropsLanguage, e.target.value)}
                        endAdornment={ <InputAdornment position='end'  >
                           {state[ele as PropsLanguage]?.translated !== 0 &&  
                                <Chip label={ state[ele as PropsLanguage]?.translated === 5 ? 'M' : 'A'} 
                                      size='small' 
                                      component={'small'} />}
                        </InputAdornment>
                        }
                        />
                        <Box 
                            sx={{
                            borderLeft:'1px solid #C1C1C1',
                            display: 'inline-grid',
                            width: '30px',
                            textAlign: 'center'
                            }} alignItems={'center'} >
                            <IconButton disabled sx={{p:0}} onClick={()=> setOpenDialog(true)}>
                                <Typography variant="caption" color="primary.main" sx={{textTransform:'uppercase'}}>{ele}</Typography> 
                            </IconButton>    
                            </Box> 
                        </Paper>
                    ))} 
                    <Divider  />
                    <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        
                        <Stack sx={{width:'60%'}}>
                            <FormInputSelector 
                                width={'100%'}
                                itemSelector={addLangToState}
                                noMapLanguage
                                options={diferenceLanguage.map((e:string) => ({valueId:e, name:e})) as never}
                            /> 
                       </Stack>
                       
                        <Stack flexGrow={0} direction={'row'} gap={1} alignItems={'center'} justifyContent={'flex-end'}>
                            <Button size="small" variant='outlined' onClick={()=> setOpenDialog(false)}>{i18n.t('buttons.close')}</Button>
                            {/* <Button size="small" variant='contained' onClick={()=> props.callback(state)}>{usesInstance.t('buttons.save')}</Button> */}
                        </Stack>
                    </Stack>
                </Paper>
                </Box>}
            </React.Fragment>
            
            }
        />
      
    </React.Fragment>)
}

export default FormInputMultiLanguage;