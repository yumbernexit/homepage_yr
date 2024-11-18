import { Box,  Grid2, TextField } from '@mui/material';
import * as React from 'react';
import FormInput from '../../commons/Form/FormInput';
import { TFormMajeekoType, TMAjeekoInfoDTO } from '../../../types/majeeko.type';
import FormInputRadioGroup from '../../commons/Form/FormInputRadioGroup';
import { useTranslation } from 'react-i18next';
import { commonGrid } from '../../../styles/common';


type Props = {
    onChange:React.Dispatch<React.SetStateAction<TMAjeekoInfoDTO>>;
    data:TMAjeekoInfoDTO;
}

const StepDataBilling:React.FC<Props> = (props) => {
    const {t} = useTranslation();
    const [type, setType] = React.useState<TFormMajeekoType>('customer')
    const [state, setState] = React.useState<TMAjeekoInfoDTO|null>(null)

    React.useEffect(()=>{
        if(!!props.data){
            setState(props.data)
        }
    },[props.data])

    // const handleChange = (event:React.ChangeEvent<HTMLInputElement>)  =>{
    //     setState({
    //         ...state,
    //         [event.target.name]:event.target.value
    //     })
    // }

    React.useEffect(()=>{},[state])

    return (
        <Box  sx={{p :1}}>
            <Grid2 container  sx={{py:2, px:3 }}>
                <Grid2 size={{xs:12, sm: 6}} mt={commonGrid.mt}>
                    <FormInputRadioGroup
                        value={type}
                        onSelected={(e)=>setType(e as never)}
                        name="service"
                        label={'Tipologia'}
                        options={[
                            {value:'customer', name:'Customer'},
                            {value:'business', name:'Business'}
                        ]}
                    />
                </Grid2>
            </Grid2>
            { type === 'customer' && 
            <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                <FormInput label={t('majeeko:labels.firstName')} width={'100%'} 
                            render={<TextField  name="first_name" value={state?.first_name} required 
                                                onChange={(e) => props.onChange({first_name:e.target.value as never })}  />} />
                <FormInput label={t('majeeko:labels.lastName')} width={'100%'} 
                            render={<TextField  name="last_name" value={state?.last_name} required  
                                                onChange={(e) => props.onChange({last_name:e.target.value as never })}  />}/>
                <FormInput label={t('majeeko:labels.ssn')}width={'100%'} 
                            render={<TextField  name="ssn" value={state?.ssn} required  
                                                onChange={(e) => props.onChange({ssn:e.target.value as never })} />} />
            </Grid2>
            }
            { type === 'business' && 
                <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                    <FormInput  size={{xs:12,md:5}} label="Bussines Name *" width={'100%'} 
                                render={<TextField name="businessName" value={state?.business_name}
                                        onChange={(e) => props.onChange({business_name:e.target.value as never })}
                                />} 
                                />
                    <FormInput  size={{xs:12,md:3}} label="vat *" width={'100%'} 
                                render={<TextField  name="vat" required value={state?.vat}
                                                    onChange={(e) => props.onChange({vat:e.target.value as never })} 
                                />} />
                    <FormInput  size={{xs:12,md:3}}  label="SDI *" width={'100%'} 
                                render={<TextField  name="sdi" required value={state?.sdi}
                                                    onChange={(e) => props.onChange({sdi:e.target.value as never })} />}/>
                </Grid2>
            } 
            <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                <FormInput  size={{xs:12,md:4}} label={t('majeeko:labels.address')} width={'100%'} 
                            render={<TextField  name="address" value={state?.address} 
                                                onChange={(e) => props.onChange({address:e.target.value as never })} />} />
                <FormInput  size={{xs:4,md:3}}  label="City" width={'100%'} 
                            render={<TextField  name="city" value={state?.city} 
                                                onChange={(e) => props.onChange({city:e.target.value as never })} />}/>
                <FormInput  size={{xs:2,md:1}}  label="Province" width={'100%'} 
                            render={<TextField  name="province" type="text" value={state?.province} 
                                                onChange={(e) => props.onChange({province:e.target.value as never })}   />}/>
                <FormInput  size={{xs:2,md:1.5}} label="Zip" width={'100%'}
                            render={<TextField  name="zip" value={state?.zip}  
                                                onChange={(e) => props.onChange({zip:e.target.value as never })} />}/>
                <FormInput  size={{xs:4,md:2.5}} label="Country" width={'100%'} 
                            render={<TextField  name="country" value={state?.country}
                                                onChange={(e) => props.onChange({country:e.target.value as never })}   />}/>
            </Grid2>
            <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                <FormInput  size={{xs:12,md:3}} label="phone" width={'100%'} 
                            render={<TextField  name="phone" value={state?.phone}  
                                                onChange={(e) => props.onChange({phone:e.target.value as never })} />}/>
                <FormInput  size={{xs:12,md:3}} label="email" width={'100%'} 
                            render={<TextField  name="email" type="email" value={state?.email} 
                                                onChange={(e) => props.onChange({email:e.target.value as never })} />}/>
                {type === 'business' && <FormInput  size={{xs:12,md:3}} label="pec" width={'100%'} 
                                                    render={<TextField  name="pec" type="email" value={state?.pec}
                                                                        onChange={(e) => props.onChange({pec:e.target.value as never })}   />}/> }
            </Grid2>
        </Box>
    )
}
export default StepDataBilling;