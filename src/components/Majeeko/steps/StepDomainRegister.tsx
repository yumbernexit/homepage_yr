import { Box,  Grid2, TextField } from '@mui/material';
import * as React from 'react';
import FormInput from '../../commons/Form/FormInput';
import { TFormMajeekoType } from '../../../types/majeeko.type';
import FormInputRadioGroup from '../../commons/Form/FormInputRadioGroup';
import { useTranslation } from 'react-i18next';
import { commonGrid } from '../../../styles/common';

const StepDomainRegister:React.FC = () => {
    const {t} = useTranslation();
    const [type, setType] = React.useState<TFormMajeekoType>('customer')

    const handleSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            service:{value: string},
            name: {value:string},
            lastName:{value:string},
            businessName:{value:string},
            vat:{value:string}
        }
        if(target.service.value === 'business'){
            console.log({
                service: target.service.value,
                businessName:target.businessName.value,
                vat:target.vat.value
            })
        }else{
            console.log({
                service: target.service.value,
                name: target.name.value as never ?? null,
                lastName:target.lastName.value as never ?? null
            })
        }
    }


    return (
        <Box component={'form'} onSubmit={handleSubmit as never} sx={{p :1}}>
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
                <FormInput label={t('majeeko:labels.firstName')} width={'100%'} render={<TextField name="name" required />} />
                <FormInput label={t('majeeko:labels.lastName')} width={'100%'} render={<TextField name="lastName" required  />}/>
                <FormInput label={t('majeeko:labels.ssn')}width={'100%'} render={<TextField name="ssn" required />} />
            </Grid2>
            }
            { type === 'business' && 
                <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                    <FormInput size={{xs:12,md:5}} label="Bussines Name *" width={'100%'} render={<TextField name="businessName" />} />
                    <FormInput size={{xs:12,md:3}} label="vat *" width={'100%'} render={<TextField name="vat" required />} />
                    <FormInput size={{xs:12,md:3}} label="SDI *" width={'100%'} render={<TextField name="sdi" required />}/>
                </Grid2>
            } 
            <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                <FormInput size={{xs:12,md:4}} label={t('majeeko:labels.address')} width={'100%'} render={<TextField name="address" />} />
                <FormInput size={{xs:4,md:3}}label="City" width={'100%'} render={<TextField name="city"  />}/>
                <FormInput size={{xs:2,md:1}} label="Province" width={'100%'} render={<TextField name="province" type="text"   />}/>
                <FormInput size={{xs:2,md:1.5}} label="Zip" width={'100%'} render={<TextField name="zip"  />}/>
                <FormInput size={{xs:4,md:2.5}} label="Country" width={'100%'} render={<TextField name="country"  />}/>
            </Grid2>
            <Grid2 container mt={commonGrid.mt} spacing={commonGrid.spacing} sx={{px:2, py:1}}>
                <FormInput size={{xs:12,md:3}} label="phone" width={'100%'} render={<TextField name="phone"  />}/>
                <FormInput size={{xs:12,md:3}} label="email" width={'100%'} render={<TextField name="email" type="email"  />}/>
                {type === 'business' && <FormInput size={{xs:12,md:3}} label="pec" width={'100%'} render={<TextField name="pec" type="email"  />}/> }
            </Grid2>
        </Box>
    )
}
export default StepDomainRegister